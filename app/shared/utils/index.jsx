import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'app/types';
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';
import { ScaleToastParams } from 'app/types/toast';
import { ScaleToastRef } from '../components/ScaleToast';
import { AppLoadingRef } from '../components/AppLoading';
import { AppLoadingParams } from 'app/types/indicator';
import { AlertDialogParams } from 'app/types/dialog';
import { AlertDialogRef } from '../components/AlertDialog';

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

  /**
   * @author hieubt
   * @param {ScaleToastParams} params
   */
  toast(params) {
    ScaleToastRef.current.show(params);
  },

  /**
   * @author hieubt
   * @param {AppLoadingParams} params
   */
  showLoading(params) {
    AppLoadingRef.current.show(params);
  },

  /**
   * @author hieubt
   */
  hideLoading() {
    AppLoadingRef.current.hide();
  },

  /**
   * @author hieubt
   * @param {AlertDialogParams} params
   */
  showDialog(params) {
    AlertDialogRef.current.show(params);
  },

  /**
   * @author hieubt
   */
  hideDialog() {
    AlertDialogRef.current.hide();
  },
};
