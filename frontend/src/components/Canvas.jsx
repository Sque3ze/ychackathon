import React, { useEffect } from 'react';
import { Tldraw } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import { TextResponseShapeUtil } from '../shapeUtils/TextResponseShapeUtil.jsx';
import 'tldraw/tldraw.css';

export default function Canvas({ onEditorMount }) {
  // Use tldraw's demo sync with custom shapes
  const store = useSyncDemo({
    roomId: 'default',
    shapeUtils: [TextResponseShapeUtil],
  });

  const handleMount = (editor) => {
    if (onEditorMount) {
      onEditorMount(editor);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw 
        store={store}
        shapeUtils={[TextResponseShapeUtil]}
        onMount={handleMount}
      />
    </div>
  );
}
