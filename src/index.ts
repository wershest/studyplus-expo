// Reexport the native module. On web, it will be resolved to StudyplusExpoModule.web.ts
// and on native platforms to StudyplusExpoModule.ts
import StudyplusExpoModule from "./StudyplusExpoModule";

export default class StudyplusExpo {
  static setup(consumerKey: string, consumerSecret: string) {
    StudyplusExpoModule.setup(consumerKey, consumerSecret);
  }
  static isAuthenticated(): Promise<boolean> {
    return StudyplusExpoModule.isAuthenticated();
  }
  static startAuth(): Promise<string> {
    return StudyplusExpoModule.startAuth();
  }
  static postStudyRecord(
    duration: number,
    amount: number,
    comment: string
  ): Promise<string> {
    return StudyplusExpoModule.postStudyRecord(duration, amount, comment);
  }
}
