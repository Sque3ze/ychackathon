import React, { useEffect, useState } from 'react';
import { Tldraw } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import PromptInput from './PromptInput';
import 'tldraw/tldraw.css';

const FOCUS_EVENT_NAME = 'focus-prompt-input';

export default function Canvas() {
  const [editor, setEditor] = useState(null);
  const store = useSyncDemo({
    roomId: 'default',
  });

  // Register Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.dispatchEvent(new Event(FOCUS_EVENT_NAME));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw 
        store={store}
        onMount={setEditor}
      />
      {editor && <PromptInput editor={editor} focusEventName={FOCUS_EVENT_NAME} />}
    </div>
  );
}
