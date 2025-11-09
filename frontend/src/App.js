import React, { useState } from 'react';
import Canvas from './components/Canvas';
import AIChatOverlay from './components/AIChatOverlay';
import './App.css';

export default function App() {
  const [editor, setEditor] = useState(null);

  return (
    <>
      <Canvas onEditorMount={setEditor} />
      {editor && <AIChatOverlay editor={editor} />}
    </>
  );
}
