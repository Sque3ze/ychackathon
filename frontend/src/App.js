import React, { useState } from 'react';
import Canvas from './components/Canvas';
import PromptInputWrapper from './components/PromptInputWrapper';
import './App.css';

export default function App() {
  const [editor, setEditor] = useState(null);

  return (
    <>
      <Canvas onEditorMount={setEditor} />
      {editor && <PromptInputWrapper editor={editor} />}
    </>
  );
}
