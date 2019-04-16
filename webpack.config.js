const examplePages = {};

function findExamplePages(startPath, filter) {
	if (!fs.existsSync(startPath)) {
		return;
	}

	const files = fs.readdirSync(startPath);

	files.forEach((file) => {
		const filename = path.join(startPath, file);
		const stat = fs.lstatSync(filename);

		if (stat.isDirectory()) {
			findExamplePages(filename, filter);
		} else if (filename.indexOf(filter) >= 0) {
			const shortName = filename.replace('examples/', '').replace('/script.ts', '');

			examplePages[shortName] = `./${filename}`;
		}
	});
}

findExamplePages('./examples', 'script.ts');

const development = {
	entry: examplePages,
	devtool: 'cheap-module-eval-source-map',
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vendor',
					filename: '[name]/dist/vendor.js',
					chunks: 'all',
				},
			},
		},
	},
	output: {
		path: path.resolve(__dirname, 'examples'),
		filename: '[name]/dist/bundle.js',
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name]/dist/styles.css' }),
		new StringReplacePlugin(),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'lib/prebid.min.js'), to: 'vendor/dist/prebid.min.js' },
		]),
	],
	resolve: {
		alias: {
			[pkg.name]: path.join(__dirname, 'src/ad-engine'),
			'@wikia/ad-bidders': path.join(__dirname, 'src/ad-bidders'),
			'@wikia/ad-products': path.join(__dirname, 'src/ad-products'),
			'@wikia/ad-services': path.join(__dirname, 'src/ad-services'),
		},
	},
};
