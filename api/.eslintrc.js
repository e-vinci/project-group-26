module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'no-use-before-define': ['error', 'nofunc'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['frontend'], // Spécifiez ici le chemin vers votre code source (remplacez 'src' par le chemin réel)
      },
    },
  },
  plugins: ['import'], // Ajoutez cette ligne pour activer le plugin
};

