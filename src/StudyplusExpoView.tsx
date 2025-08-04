import { requireNativeView } from 'expo';
import * as React from 'react';

import { StudyplusExpoViewProps } from './StudyplusExpo.types';

const NativeView: React.ComponentType<StudyplusExpoViewProps> =
  requireNativeView('StudyplusExpo');

export default function StudyplusExpoView(props: StudyplusExpoViewProps) {
  return <NativeView {...props} />;
}
