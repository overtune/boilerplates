module.exports = {
	extends: 'airbnb-base',
	parserOptions: {
		ecmaVersion: 13,
	},
	env: {
		browser: true,
		node: true,
	},
	ignorePatterns: ['**/lib/*.js'],
	rules: {
		indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'import/extensions': [0],
		'no-tabs': 0,
	},
};
