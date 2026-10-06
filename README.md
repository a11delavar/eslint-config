# `@a11d/eslint-config`

A shared ESLint configuration for TypeScript and Lit projects: ESLint's and typescript-eslint's recommended rules, a selection of type-aware rules, Lit and HTML template checks, and formatting through ESLint Stylistic.

## Installation

```bash
npm install --save-dev @a11d/eslint-config eslint typescript
```

It requires ESLint 10 and brings its plugins itself, so a project lists no other ESLint plugins for it.

## Usage

```js
// eslint.config.mjs
import configs from '@a11d/eslint-config'

export default configs
```

Extend the array to add ignores or rules of your own:

```js
import { defineConfig } from 'eslint/config'
import configs from '@a11d/eslint-config'

export default defineConfig([
	...configs,
	{ ignores: ['test-temp'] },
])
```

Lint from the project's root, where `tsconfigRootDir` points.

## What it checks

- **JavaScript and TypeScript:** `@eslint/js` and `typescript-eslint` recommended, with `any`, namespaces and `this` aliases allowed, `import { type X }` enforced and `public` modifiers disallowed.
- **Type-aware rules** on TypeScript files, such as `await-thenable`, `no-misused-promises` for promises used as conditions, and `no-unnecessary-type-assertion`. Every linted TypeScript file must therefore belong to a `tsconfig.json` that the TypeScript project service finds from the file's directory. Only root-level `*.config.ts` files are covered by a default project.
- **Lit templates** through `eslint-plugin-lit`, and the HTML inside `html` templates through `@html-eslint`.
- **Formatting** through `@stylistic`: tabs, single quotes, no semicolons, `1tbs` braces, trailing commas in multi-line literals, and a final newline in every file. Almost all of it is fixed by `eslint --fix`.
- **Ignored:** `node_modules`, `dist`, `coverage` and `.claude`.

## License

MIT