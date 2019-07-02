module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'extends': 'airbnb',
	'parser': 'babel-eslint',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'react/jsx-uses-react':2,
		'react/jsx-uses-vars':2,
		'react/react-in-jsx-scope':2,
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'react/jsx-indent': [
			'error',
			'tab'
		],
		'react/jsx-indent-props': [
			'error',
			'tab'
		],
		'no-tabs': 'off', // 禁止缩进错误
		'no-restricted-syntax': 0,
		'guard-for-in': 0,
		// 允许在 .js 和 .jsx 文件中使用 jsx
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
		// 不区分是否是 无状态组件
		'react/prefer-stateless-function': 0
	}
};