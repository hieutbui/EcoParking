import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'app/types';

/**
 * @description hook to app's reducers state. convenient for typescripts
 * @template T
 * @param {(state: StoreState)=>T} selector
 * @returns {T}
 */
export function useAppSelector(selector) {
  const state = useAppSelector(selector);

  return state;
}
