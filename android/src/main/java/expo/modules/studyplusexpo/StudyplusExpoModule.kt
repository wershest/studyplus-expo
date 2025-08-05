package expo.modules.studyplusexpo

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.Log
import jp.studyplus.android.sdk.Studyplus
import jp.studyplus.android.sdk.StudyplusError
import jp.studyplus.android.sdk.PostCallback
import jp.studyplus.android.sdk.record.StudyRecord
import jp.studyplus.android.sdk.record.StudyRecordAmountTotal
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.events.EventEmitter

class StudyplusExpoModule : Module() {
  private val REQUEST_CODE_AUTH = 112
  private var studyplus: Studyplus? = null
  private var authPromise: Promise? = null
  
  override fun definition() = ModuleDefinition {
    Name("StudyplusExpoModule")

    OnCreate {}

    OnActivityResult { _, (requestCode, resultCode, data) ->
      handleActivityResult(requestCode, resultCode, data)
    }    

    Function("setup") { consumerKey: String, consumerSecret: String ->
      val context = appContext.reactContext ?: return@Function

      studyplus = Studyplus(
        context = context,
        consumerKey = consumerKey,
        consumerSecret = consumerSecret
      )
    }

    AsyncFunction("startAuth") { promise: Promise ->
      val activity = appContext.currentActivity
      if (activity == null) {
        promise.reject("NO_ACTIVITY", "No current activity", null)        
      } else {
        try {
          authPromise = promise
          studyplus?.startAuth(activity, REQUEST_CODE_AUTH)
        } catch (e: Exception) {
          promise.reject("AUTH_ERROR", e.message ?: "Failed to start auth", null)
        }
      }
    }
    
    // (promise:Promise) is a special last parameter injected by Expo to let you handle async results.
    AsyncFunction("postStudyRecord") { duration: Int, amount: Int, comment: String, promise: Promise ->
      val record = StudyRecord(
        duration = duration,
        amount = StudyRecordAmountTotal(amount),
        comment = comment
      )

      studyplus?.postRecord(record, object : PostCallback {
        override fun onSuccess() {
          promise.resolve("posted")
        }

        override fun onFailure(e: StudyplusError) {
          val message = errorToMessage(e)
          promise.reject("STUDYPLUS_ERROR", message, null)          
        }
      })
    }

    Function("isAuthenticated") {
      return@Function studyplus?.isAuthenticated() ?: false
    }
  }

  private fun handleActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
    if (requestCode != REQUEST_CODE_AUTH) return

    if (resultCode == Activity.RESULT_OK && intent != null) {
      studyplus?.setAuthResult(intent)
      authPromise?.resolve("authenticated")
    } else {
      authPromise?.reject("AUTH_FAILED", "User canceled or failed to authenticate", null)
    }
  }

  private fun errorToMessage(error: StudyplusError): String = when (error) {
    is StudyplusError.IOException -> "I/O error: ${error.e.localizedMessage ?: "Unknown IO error"}"
    StudyplusError.BadRequest -> "Bad request"
    StudyplusError.LoginRequired -> "Login required"
    StudyplusError.ServerError -> "Server error"
    StudyplusError.Unknown -> "Unknown error"
  }
}
