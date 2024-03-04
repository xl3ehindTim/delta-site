const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: path.join( __dirname, 'inc/assets/js/index.js' ),
	plugins: [
		...defaultConfig.plugins,
		new RtlCssPlugin( {
			filename: '[name]-rtl.css',
		} ),
	],
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Compiles Sass to CSS
					'sass-loader',
					// PostCSS
					'postcss-loader',
				],
			},
			{
				test: /\.css$/i,
				use: [
					// Translates CSS into CommonJS
					'css-loader',
					// PostCSS
					'postcss-loader',
				],
			},
		],
	},
};
