import { NativeModule, requireNativeModule } from "expo";

declare class StudyplusExpoModule extends NativeModule {
  setup(consumerKey: string, consumerSecret: string): void;

  // "authenticated"
  startAuth(): Promise<string>;

  isAuthenticated(): Promise<boolean>;

  // "posted"
  postStudyRecord(
    duration: number,
    amount: number,
    comment: string
  ): Promise<string>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<StudyplusExpoModule>("StudyplusExpoModule");
