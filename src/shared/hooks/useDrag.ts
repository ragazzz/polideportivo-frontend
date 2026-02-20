import { useRef, useState } from "react"

type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export function useDrag(bounds: Bounds) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const didDrag = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const DRAG_THRESHOLD = 5;

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function onMouseDown(e: React.MouseEvent) {
    isPointerDown.current = true;
    didDrag.current = false;

    startPos.current = { x: e.clientX, y: e.clientY };
    lastPos.current = { x: e.clientX, y: e.clientY };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isPointerDown.current) return;

    const dxTotal = e.clientX - startPos.current.x;
    const dyTotal = e.clientY - startPos.current.y;

    if ( !didDrag.current && (Math.abs(dxTotal) > DRAG_THRESHOLD || Math.abs(dyTotal) > DRAG_THRESHOLD) ) {
      didDrag.current = true;
    }
    
    if (!didDrag.current) return;
    
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    setPosition((prev) => ({
      x: clamp(prev.x + dx, bounds.minX, bounds.maxX),
      y: clamp(prev.y + dy, bounds.minY, bounds.maxY),
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  }

  function onMouseUp() {
    isPointerDown.current = false;
  }

  return {
    x: position.x,
    y: position.y,
    didDrag,
    bind: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
    },
  };
}