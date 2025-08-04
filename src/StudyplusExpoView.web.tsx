import * as React from 'react';

import { StudyplusExpoViewProps } from './StudyplusExpo.types';

export default function StudyplusExpoView(props: StudyplusExpoViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
