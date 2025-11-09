import React, { useEffect, useState } from 'react';
import { Tldraw, DefaultToolbar, TldrawUiMenuItem, useEditor } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import PromptInput from './PromptInput';
import { PdfUploadButton } from './PdfUploadButton';
import { PdfViewer } from './PdfViewer';
import 'tldraw/tldraw.css';

const FOCUS_EVENT_NAME = 'focus-prompt-input';

function CustomUI() {
  return (
    <>
      <PromptInput focusEventName={FOCUS_EVENT_NAME} />
    </>
  );
}

const components = {
  Toolbar: () => {
    return (
      <div style={{ position: 'fixed', top: 8, left: '50%', transform: 'translateX(-50%)' }}>
        <DefaultToolbar />
      </div>
    );
  },
  InFrontOfTheCanvas: CustomUI,
};

export default function Canvas() {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // Use tldraw's built-in demo sync
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

  const handleUploadSuccess = (documentData) => {
    console.log('PDF uploaded successfully:', documentData);
    setUploadedDocuments(prev => [...prev, documentData]);
  };

  const handleClosePdf = (documentId) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.document_id !== documentId));
  };

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {/* Upload button overlay */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <PdfUploadButton onUploadSuccess={handleUploadSuccess} />
        {uploadedDocuments.length > 0 && (
          <div style={{
            padding: '8px 12px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '12px',
            fontWeight: '500',
            color: '#64748B'
          }} data-testid="pdf-counter">
            {uploadedDocuments.length} PDF{uploadedDocuments.length !== 1 ? 's' : ''} uploaded
          </div>
        )}
      </div>
      
      {/* tldraw canvas */}
      <Tldraw 
        store={store}
        components={components}
      />

      {/* Render uploaded PDFs */}
      {uploadedDocuments.map((doc, index) => (
        <PdfViewer
          key={doc.document_id}
          documentUrl={doc.public_url}
          documentId={doc.document_id}
          position={{ x: 100 + (index * 50), y: 100 + (index * 50) }}
          onClose={() => handleClosePdf(doc.document_id)}
        />
      ))}
    </div>
  );
}
