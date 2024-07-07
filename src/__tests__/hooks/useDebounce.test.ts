// src/hooks/useDebounce.test.tsx
import {renderHook, act} from '@testing-library/react';
import useDebounce from "../../hooks/useDebounce";

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should debounce the value', () => {
    const {result, rerender} = renderHook(({value, delay}) => useDebounce(value, delay), {
      initialProps: {value: 'initial', delay: 500},
    });

    // Initial value should be 'initial'
    expect(result.current).toBe('initial');

    // Update value and rerender
    rerender({value: 'changed', delay: 500});

    // Value should still be 'initial' due to debouncing
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should now be 'changed'
    expect(result.current).toBe('changed');
  });

  it('should update debounce delay', () => {
    const {result, rerender} = renderHook(({value, delay}) => useDebounce(value, delay), {
      initialProps: {value: 'initial', delay: 500},
    });

    // Initial value should be 'initial'
    expect(result.current).toBe('initial');

    // Update delay and rerender
    rerender({value: 'initial', delay: 1000});

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should still be 'initial' because delay was updated
    expect(result.current).toBe('initial');

    // Fast-forward time by 500ms more (total 1000ms)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should still be 'initial'
    expect(result.current).toBe('initial');

    // Update value and rerender
    rerender({value: 'changed', delay: 1000});

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should still be 'initial' due to new delay
    expect(result.current).toBe('initial');

    // Fast-forward time by 500ms more (total 1000ms)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should now be 'changed'
    expect(result.current).toBe('changed');
  });
});
