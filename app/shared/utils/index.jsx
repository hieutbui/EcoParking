import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'app/types';
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';

/**
 * @author hieubt
 * @description hook to app's reducers state. convenient for typescripts
 * @template T
 * @param {(state: StoreState)=>T} selector
 * @returns {T}
 */
export function useAppSelector(selector) {
  const state = useSelector(selector);

  return state;
}

export default {
  /**
   * @author hieubt
   * @param {string} str
   * @returns {string}
   */
  hashSHS256(str) {
    str = _.toString(str);
    return sha256(str).toString();
  },
};
