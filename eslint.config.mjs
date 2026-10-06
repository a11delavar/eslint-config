import js from '@eslint/js'
import html from '@html-eslint/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import lit from 'eslint-plugin-lit'
import { cwd } from 'node:process'
import tseslint from 'typescript-eslint'

const style = stylistic.configs.customize({ indent: 'tab', quotes: 'single', semi: false, braceStyle: '1tbs', jsx: false })

export default defineConfig([
	globalIgnores(['**/node_modules', '**/dist', '**/coverage', '**/.claude']),
	{
		name: '@a11d/eslint-config',
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			lit.configs['flat/recommended'],
			style,
		],
		plugins: {
			'@html-eslint': html,
		},
		settings: {
			html: {
				templateLiterals: {
					tags: ['^html$'],
					comments: ['^\\s*html\\s*$'],
				},
			},
		},
		rules: {
			'eqeqeq': 'error',
			'max-lines': ['warn', { max: 1000, skipComments: true, skipBlankLines: true }],
			'no-case-declarations': 'off',
			'no-console': 'error',
			'no-duplicate-imports': 'error',
			'no-eval': 'error',
			'no-prototype-builtins': 'off',
			'no-return-await': 'error',
			'no-self-assign': 'off',
			'no-useless-escape': 'off',
			'require-await': 'error',

			'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description', 'minimumDescriptionLength': 10 }],
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports', disallowTypeAnnotations: false }],
			'@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'no-public' }],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',

			// Template literals hold HTML and CSS, whose indentation the `@html-eslint` rules check instead.
			'@stylistic/indent': ['error', 'tab', { SwitchCase: 1, ignoredNodes: ['TemplateLiteral *'] }],
			'@stylistic/arrow-parens': ['error', 'as-needed'],
			'@stylistic/generator-star-spacing': ['error', { before: true, after: false }],
			'@stylistic/lines-between-class-members': 'off',
			'@stylistic/max-statements-per-line': 'off',
			'@stylistic/multiline-ternary': 'off',
			'@stylistic/no-mixed-operators': 'off',
			'@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after', '?': 'ignore', ':': 'ignore' } }],
			'@stylistic/quote-props': 'off',

			...html.configs['flat/recommended'].rules,
			'@html-eslint/attrs-newline': 'off',
			'@html-eslint/indent': ['error', 'tab'],
			'@html-eslint/quotes': 'off',
			'@html-eslint/require-img-alt': 'off',
			'@html-eslint/require-lang': 'off',
		},
	},
	{
		name: '@a11d/eslint-config/type-checked',
		files: ['**/*.{ts,mts,cts}'],
		languageOptions: {
			parserOptions: {
				// Every other file linted has to belong to a tsconfig.json the project service finds from the file's directory.
				projectService: { allowDefaultProject: ['*.config.ts'] },
				tsconfigRootDir: cwd(),
			},
		},
		rules: {
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/no-array-delete': 'error',
			'@typescript-eslint/no-for-in-array': 'error',
			'@typescript-eslint/no-implied-eval': 'error',
			'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
			'@typescript-eslint/only-throw-error': 'error',
			'@typescript-eslint/prefer-promise-reject-errors': 'error',
		},
	},
])
