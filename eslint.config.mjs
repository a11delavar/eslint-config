import typescriptEslint from '@typescript-eslint/eslint-plugin'
import lit from 'eslint-plugin-lit'
// import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import eslintHTML from '@html-eslint/eslint-plugin'
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
			'@stylistic/js': stylisticJs,
			'@stylistic/ts': stylisticTs,
			lit,
			'@html-eslint': eslintHTML,
		},

		languageOptions: {
			parser: tsParser,
		},

		rules: {
			'no-duplicate-imports': 'error',
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

			'@typescript-eslint/consistent-type-imports': ['error',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
					disallowTypeAnnotations: false
				}
			],

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

			'@stylistic/ts/indent': ['error', 'tab', {
				SwitchCase: 1,
				ignoredNodes: ['TemplateLiteral *'],
			}],

			'@stylistic/js/no-trailing-spaces': 'error',
			'@stylistic/js/eol-last': ['error', 'never'],
			'@stylistic/ts/semi': ['error', 'never'],
			'@stylistic/ts/quotes': ['error', 'single'],
			'no-unused-vars': 'off',
			'no-case-declarations': 'off',
			'no-self-assign': 'off',
			'no-useless-escape': 'off',

			'@stylistic/ts/brace-style': ['error', '1tbs', {
				allowSingleLine: true,
			}],

			'@stylistic/ts/keyword-spacing': ['error', {
				before: true,
				after: true,
			}],

			'no-console': 'error',
			'@stylistic/ts/space-before-blocks': 'error',
			'@stylistic/ts/space-infix-ops': 'error',

			'@stylistic/ts/comma-spacing': ['error', {
				before: false,
				after: true,
			}],

			'@stylistic/ts/key-spacing': ['error', {
				beforeColon: false,
				afterColon: true,
			}],

			'no-eval': 'error',
			eqeqeq: 'error',
			'no-return-await': 'error',
			'require-await': 'error',
			'@stylistic/js/template-curly-spacing': ['error', 'never'],
			'@stylistic/ts/object-curly-spacing': ['error', 'always'],

			'max-lines': ['warn', {
				max: 1000,
				skipComments: true,
				skipBlankLines: true,
			}],

			...eslintHTML.configs['flat/recommended'].rules,
			'@html-eslint/indent': ['error', 'tab'],
			'@html-eslint/quotes': 'off',
			'@html-eslint/attrs-newline': 'off',
			'@html-eslint/require-img-alt': 'off',
			'@html-eslint/require-lang': 'off',
		},

		settings: {
			html: {
				templateLiterals: {
					// default options
					tags: ['^html$'],
					comments: ['^\\s*html\\s*$'],
				}
			}
		},
	}
]