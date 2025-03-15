# GRASP Adventure

This is a project for the GRASP Adventure game. It is a game that is designed to
help teach the GRASP principles of object-oriented design.

## Getting Started

To get started, you will need to have Node.js installed. You can download it from
[the Node.js website](https://nodejs.org/).

Once you have Node.js installed, you can run the following commands to get started:

```bash
npm install
npm run dev
```

This will install the dependencies and start the development server. You can then
open your browser to [http://localhost:5173](http://localhost:5173) to see the game.

## Building the Game

To build the game, you can run the following command:

```bash
npm run build
```

This will create a `dist` folder with the built game. You can then serve this folder
with any static file server.

## Running Tests

To run the tests, you can run the following command:

```bash
npm test
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
