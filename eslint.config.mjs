import typescriptEslint from '@typescript-eslint/eslint-plugin'
import lit from 'eslint-plugin-lit'
// import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [
	{
		ignores: ['**/node_modules', '**/dist', '**/coverage'],
	},
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:lit/recommended',
	),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'@stylistic/ts': stylisticTs,
			lit,
		},

		languageOptions: {
			// globals: {
			// 	...globals.browser,
			// },
			parser: tsParser,
		},

		rules: {
			'lit/no-missing-import': 'off',
			'@stylistic/ts/type-annotation-spacing': ['warn', {
				before: false,
				after: true,

				overrides: {
					arrow: {
						before: true,
						after: true,
					},
				},
			}],

			'@typescript-eslint/explicit-member-accessibility': ['warn', {
				accessibility: 'no-public',
			}],

			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
			'no-prototype-builtins': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',

			'@stylistic/ts/member-delimiter-style': ['error', {
				multiline: {
					delimiter: 'none',
				},

				singleline: {
					delimiter: 'comma',
				},
			}],

			'@typescript-eslint/ban-ts-comment': ['error', {
				'ts-ignore': 'allow-with-description',
				minimumDescriptionLength: 10,
			}],

			'@typescript-eslint/explicit-module-boundary-types': 'off',

			indent: ['error', 'tab', {
				SwitchCase: 1,
				ignoredNodes: ['TemplateLiteral *'],
			}],

			'no-trailing-spaces': 'error',
			'eol-last': ['error', 'never'],
			semi: ['error', 'never'],
			quotes: ['error', 'single'],
			'no-unused-vars': 'off',
			'no-case-declarations': 'off',
			'no-self-assign': 'off',
			'no-useless-escape': 'off',

			'brace-style': ['error', '1tbs', {
				allowSingleLine: true,
			}],

			'keyword-spacing': ['error', {
				before: true,
				after: true,
			}],

			'no-console': 'error',
			'space-before-blocks': 'error',
			'space-infix-ops': 'error',

			'comma-spacing': ['error', {
				before: false,
				after: true,
			}],

			'key-spacing': ['error', {
				beforeColon: false,
				afterColon: true,
			}],

			'no-eval': 'error',
			eqeqeq: 'error',
			'no-return-await': 'error',
			'require-await': 'error',
			'template-curly-spacing': ['error', 'never'],
			'object-curly-spacing': ['error', 'always'],

			'max-lines': ['warn', {
				max: 1000,
				skipComments: true,
				skipBlankLines: true,
			}],
		},
	}
]