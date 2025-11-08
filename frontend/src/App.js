import React from 'react';
import Canvas from './components/Canvas/Canvas';
import { Toaster } from './components/ui/sonner';
import './App.css';

export default function App() {
  return (
    <>
      <Canvas roomId="default" />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--ui-bg)',
            color: 'var(--slate-900)',
            border: '1px solid var(--slate-300)',
          },
        }}
      />
    </>
  );
}
