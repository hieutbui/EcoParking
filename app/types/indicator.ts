export interface AppLoading {
  show: (params: AppLoadingParams) => void;
  hide: () => void;
}

export interface AppLoadingParams {
  message: string;
}
