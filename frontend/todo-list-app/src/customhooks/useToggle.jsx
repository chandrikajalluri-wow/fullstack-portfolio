import { useState, useCallback } from 'react';

export function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState((prev) => !prev), []);
  return [state, toggle];
}
