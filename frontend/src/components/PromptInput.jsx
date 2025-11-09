import React, { useState, useRef, useEffect } from 'react';
import { track, useEditor } from 'tldraw';
import { createTextResponseShape } from '../utils/textShapeManager';

const isMac = () => {
  return typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
};

export const PromptInput = ({ focusEventName }) => {
  const editor = useEditor();
  const [isFocused, setIsFocused] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const showMacKeybinds = isMac();
  const inputRef = useRef(null);
  
  // Check canvas state once on mount
  useEffect(() => {
    const checkCanvasState = () => {
      setIsCanvasEmpty(editor.getCurrentPageShapes().length === 0);
    };
    checkCanvasState();
  }, [editor]);

  useEffect(() => {
    const handleFocusEvent = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        setIsFocused(true);
      }
    };

    window.addEventListener(focusEventName, handleFocusEvent);
    return () => {
      window.removeEventListener(focusEventName, handleFocusEvent);
    };
  }, [focusEventName]);

  const onInputSubmit = async (promptText) => {
    setPrompt('');
    try {
      await createTextResponseShape(editor, {
        searchQuery: promptText,
        width: 600,
        height: 300,
        centerCamera: true,
        animationDuration: 200,
      });
    } catch (error) {
      console.error('Failed to create text response shape:', error);
    }
  };

  return (
    <form
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 20px',
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        fontSize: '16px',
        transition: 'all 0.3s ease-in-out',
        gap: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        minHeight: '60px',
        width: isFocused ? '50%' : '400px',
        top: isCanvasEmpty ? '50%' : 'auto',
        bottom: isCanvasEmpty ? 'auto' : '16px',
        marginTop: isCanvasEmpty ? '-30px' : '0',
        background: '#FFFFFF',
        color: '#111827',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onInputSubmit(prompt);
        setIsFocused(false);
        if (inputRef.current) inputRef.current.blur();
      }}
    >
      <input
        name="prompt-input"
        ref={inputRef}
        type="text"
        placeholder="Ask anything..."
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'inherit',
          fontSize: 'inherit',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {isFocused ? (
        <button
          type="submit"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            background: '#3B82F6',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          ↑
        </button>
      ) : (
        <span style={{ fontSize: '12px', opacity: 0.3 }}>
          {showMacKeybinds ? '⌘ + K' : 'Ctrl + K'}
        </span>
      )}
    </form>
  );
});