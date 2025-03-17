module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:@react-native/babel-preset',
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      ['react-native-reanimated/plugin'],
      ['react-native-paper/babel'],
      [
        'module-resolver',
        {
          alias: {
            src: './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@services': './src/services',
            '@utils': './src/utils',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
