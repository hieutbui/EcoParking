/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    /* resolver options */
    sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx', 'd.ts', 'd.tsx'],
  },
};
