import { NativeModule, requireNativeModule } from 'expo';

import { StudyplusExpoModuleEvents } from './StudyplusExpo.types';

declare class StudyplusExpoModule extends NativeModule<StudyplusExpoModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<StudyplusExpoModule>('StudyplusExpo');
