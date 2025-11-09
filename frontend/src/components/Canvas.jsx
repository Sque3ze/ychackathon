import React, { useRef, useMemo, useEffect } from 'react';
import { Tldraw } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import { createShapeId } from '@tldraw/editor';
import 'tldraw/tldraw.css';

export default function Canvas() {
  // Use tldraw's built-in demo sync
  const store = useSyncDemo({
    roomId: 'default',
  });

  // Store editor instance
  const editorRef = useRef(null);

  // Handle editor mount
  const handleMount = (editor) => {
    editorRef.current = editor;
    
    // Add listener to prevent resizing of groups with noResize meta flag
    editor.sideEffects.registerBeforeChangeHandler('shape', (prev, next) => {
      // Check if this is a group with noResize flag
      if (next.type === 'group' && next.meta?.noResize) {
        // If size changed, revert to previous size
        // Groups don't have w/h props directly, so we check if any child transformations happened
        // For groups, we just prevent the resize by returning the previous state
        // But allow position changes
        if (prev && (prev.x !== next.x || prev.y !== next.y)) {
          // Allow movement
          return next;
        }
        // For any other changes, keep the previous state to prevent resize
        if (prev && prev.rotation === next.rotation) {
          return { ...next, x: prev.x || next.x, y: prev.y || next.y };
        }
      }
      return next;
    });
  };

  // Helper function to auto-frame handwriting strokes
  const autoFrameHandwriting = (editor) => {
    if (!editor) return;

    // Get selected shape IDs
    const selectedIds = editor.getSelectedShapeIds();
    if (selectedIds.length === 0) return;

    // Filter to handwriting shapes (draw strokes that aren't closed)
    const handwritingIds = [];
    const handwritingShapes = [];
    for (const id of selectedIds) {
      const shape = editor.getShape(id);
      if (!shape) continue;
      
      // Check if it's a draw shape that's not closed
      if (shape.type === 'draw' && !shape.props.isClosed) {
        handwritingIds.push(id);
        handwritingShapes.push(shape);
      }
    }

    if (handwritingIds.length === 0) return;

    // Get bounds of selected handwriting shapes
    const bounds = editor.getShapePageBounds(handwritingIds[0]);
    if (!bounds) return;

    // Calculate bounding box for all selected shapes
    let minX = bounds.x;
    let minY = bounds.y;
    let maxX = bounds.x + bounds.w;
    let maxY = bounds.y + bounds.h;

    for (let i = 1; i < handwritingIds.length; i++) {
      const shapeBounds = editor.getShapePageBounds(handwritingIds[i]);
      if (!shapeBounds) continue;
      
      minX = Math.min(minX, shapeBounds.x);
      minY = Math.min(minY, shapeBounds.y);
      maxX = Math.max(maxX, shapeBounds.x + shapeBounds.w);
      maxY = Math.max(maxY, shapeBounds.y + shapeBounds.h);
    }

    // Add padding
    const padding = 20;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;

    const frameWidth = maxX - minX;
    const frameHeight = maxY - minY;

    // Wrap all operations in editor.run for proper history/sync
    editor.run(() => {
      // Create frame shape
      const frameId = createShapeId();
      editor.createShape({
        id: frameId,
        type: 'frame',
        x: minX,
        y: minY,
        props: {
          w: frameWidth,
          h: frameHeight,
          name: 'Handwriting Frame',
        },
      });

      // Send frame to back so it appears behind the strokes
      editor.sendToBack([frameId]);

      // Reparent handwriting strokes into the frame
      editor.reparentShapes(handwritingIds, frameId);

      // Group the frame and all strokes (tldraw auto-selects the group)
      const groupId = editor.groupShapes([frameId, ...handwritingIds]);

      // Lock the group shape to prevent resizing (only allow moving)
      if (groupId) {
        editor.updateShape({
          id: groupId,
          type: 'group',
          meta: {
            noResize: true,
          },
        });
      }

      // Note: No need to manually select - tldraw automatically selects the group after groupShapes()
    });
  };

  // Define custom overrides for keyboard shortcuts and component behavior
  const overrides = useMemo(() => ({
    actions(editor, actions) {
      return {
        ...actions,
        'auto-frame-handwriting': {
          id: 'auto-frame-handwriting',
          label: 'Frame Handwriting',
          kbd: 's',
          onSelect() {
            autoFrameHandwriting(editor);
          },
        },
      };
    },
  }), []);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw 
        store={store} 
        onMount={handleMount}
        overrides={overrides}
      />
    </div>
  );
}
