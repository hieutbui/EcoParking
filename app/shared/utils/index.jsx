import React from 'react';
import { useSelector } from 'react-redux';

/**
 * @description hook to app's reducers state. convenient for typescripts
 * @template T
 * @param {(state: StoreState)=>T} selector
 * @returns {T}
 */
export function useAppSelector(selector) {
  return useSelector(selector);
}
