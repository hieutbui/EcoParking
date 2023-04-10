import { useAppSelector } from 'app/shared/utils';

export function useCurrentLanguage() {
  const language = useAppSelector(state => state.app.language);

  return language;
}
