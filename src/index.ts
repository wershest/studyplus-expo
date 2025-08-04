// Reexport the native module. On web, it will be resolved to StudyplusExpoModule.web.ts
// and on native platforms to StudyplusExpoModule.ts
import StudyplusExpo from "./StudyplusExpoModule";

export function setup(consumerKey: string, consumerSecret: string) {
  StudyplusExpo.setup(consumerKey, consumerSecret);
}
export function isAuthenticated(): Promise<boolean> {
  return StudyplusExpo.isAuthenticated();
}
export function startAuth(): Promise<string> {
  return StudyplusExpo.startAuth();
}
export function postStudyRecord(
  duration: number,
  amount: number,
  comment: string
): Promise<string> {
  return StudyplusExpo.postStudyRecord(duration, amount, comment);
}
