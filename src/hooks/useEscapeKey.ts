import { useEffect } from 'react';

// Closes a pop-up when the visitor presses Esc. Call it before any early
// "if (!isOpen) return null" so React sees the same hooks on every render.
export function useEscapeKey(active: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onClose]);
}
