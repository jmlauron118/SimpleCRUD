const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack
	webpack.Utils.addCopyRule('**/*.sqlite');
	webpack.Utils.addCopyRule('**/*.db');
	webpack.Utils.addCopyRule('**/*.sql');

	return webpack.resolveConfig();
};


