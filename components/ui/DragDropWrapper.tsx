"use client";

import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

// Create wrapper components to work around React 19 compatibility issues
const StrictModeDroppable = ({
  children,
  ...props
}: React.ComponentProps<typeof Droppable>) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    // Use a short delay to ensure initial client-only render
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

// Patch the internal react-dom imports from react-beautiful-dnd
// Credit: https://github.com/hello-pangea/dnd/issues/30
const patchReactBeautifulDnd = () => {
  try {
    // Dynamic import to avoid SSR issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const reactDnd = require("react-beautiful-dnd");

    if (reactDnd.default && reactDnd.default.__patched) return;

    const target = reactDnd.default || reactDnd;
    const originalGetRootElement =
      target.DragDropContext.prototype.getRootElement;

    target.DragDropContext.prototype.getRootElement = function () {
      const result = originalGetRootElement.call(this);

      // Force using createRoot API
      if (!result) {
        // The component isn't mounted yet or already unmounted
        return result;
      }

      // Patch the ReactDOM.findDOMNode function
      if (result && !result._reactInternals && result._reactRootContainer) {
        const domNode = result;
        Object.defineProperty(result, "_reactInternals", {
          get: function () {
            return {
              stateNode: domNode,
            };
          },
          configurable: true,
        });
      }

      return result;
    };

    // Mark as patched
    if (reactDnd.default) {
      reactDnd.default.__patched = true;
    }
  } catch (error) {
    console.warn("Failed to patch react-beautiful-dnd:", error);
  }
};

// Create a patching component that will run once on client side
const BeautifulDndPatcher = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    patchReactBeautifulDnd();
  }, []);

  return <>{children}</>;
};

// Create a wrapped DragDropContext that applies the patch
const PatchedDragDropContext = ({
  children,
  ...props
}: React.ComponentProps<typeof DragDropContext>) => {
  return (
    <BeautifulDndPatcher>
      <DragDropContext {...props}>{children}</DragDropContext>
    </BeautifulDndPatcher>
  );
};

export {
  PatchedDragDropContext as DragDropContext,
  Draggable,
  StrictModeDroppable as Droppable,
};

// Re-export types properly
export type {
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
};
