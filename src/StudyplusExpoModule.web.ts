import { registerWebModule, NativeModule } from 'expo';

import { StudyplusExpoModuleEvents } from './StudyplusExpo.types';

class StudyplusExpoModule extends NativeModule<StudyplusExpoModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(StudyplusExpoModule, 'StudyplusExpoModule');
