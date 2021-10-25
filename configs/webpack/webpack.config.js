const {
  HashedModuleIdsPlugin,
  ProvidePlugin,
  ContextReplacementPlugin,
} = require('webpack');
const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DartSASS = require('sass');
const fibers = require('fibers');
const DoIUse = require('doiuse');
const StylelintPlugin = require('stylelint-webpack-plugin');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const Autoprefixer = require('autoprefixer');
const PostCSSPresetEnv = require('postcss-preset-env');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const PATHS = {
  src_absolute: path.resolve(__dirname, '../../app/src/'),
  dist_absolute: path.resolve(__dirname, '../../app/dist/'),
};

const redefinitionLevels = [
  'layouts',
  'components/library.blocks',
  'components/common.blocks',
];
const componentGroups = ['basic', 'containers', 'primitives', 'specific'];

const sharedAliases = {
  '@layouts': path.resolve(PATHS.src_absolute, './layouts/'),
  '@library.blocks': path.resolve(
    PATHS.src_absolute,
    './components/library.blocks/'
  ),
  '@common.blocks': path.resolve(
    PATHS.src_absolute,
    './components/common.blocks/'
  ),
  '@themes': path.resolve(PATHS.src_absolute, './themes/'),
  '@assets': path.resolve(PATHS.src_absolute, './assets/'),
  '@pages': path.resolve(PATHS.src_absolute, './pages/'),
  '@shared': path.resolve(PATHS.src_absolute, './shared/'),
};

/**
 * Useful tool for creating name of files with hash
 * @param { string } name - what should be before hash
 * @param { string } ext - extension of output bundle files such as js/webp/png
 * @returns { string } - hashed name in production mode and nohashed in another case
 */
const hashedFileName = (name, ext) =>
  isDev ? `${name}.${ext}` : `${name}.[hash].${ext}`;

/**
 * loop pages folder and create stuff depending on names of pages.
 */
class ResultOfTemplatesProcessing {
  constructor() {
    const foldersOfPages = fs.readdirSync(
      path.resolve(PATHS.src_absolute, './pages/')
    );

    // get all pug templates from each page folder
    const namesOfTemplates = [].concat(
      ...foldersOfPages.map((folder) =>
        fs
          .readdirSync(
            `${path.resolve(PATHS.src_absolute, './pages/')}\\${folder}\\`
          )
          .filter((filename) => filename.endsWith(`.pug`))
      )
    );

    this.entries = {};
    this.HTMLWebpackPlugins = [];
    namesOfTemplates.forEach((nameOfTemplate) => {
      const shortNameOfTemplate = nameOfTemplate.replace(/\.pug/, '');

      this.entries[shortNameOfTemplate] = [
        '@babel/polyfill',
        './shared/global/global.decl.ts',
        `./pages/${shortNameOfTemplate}/${shortNameOfTemplate}.ts`,
        './themes/main/index.scss',
      ];

      this.HTMLWebpackPlugins.push(
        new HTMLWebpackPlugin({
          template: `!!pug-loader!app/src/pages/${shortNameOfTemplate}/${nameOfTemplate}`,
          filename: `./${shortNameOfTemplate}.html`,

          // see ~@layouts/basic/main-layout/main-layout.pug
          inject: false,
          chunks: [shortNameOfTemplate],
        })
      );
    });
  }
}
const resultOfTemplatesProcessing = new ResultOfTemplatesProcessing();

/**
 * HTMLWebpackPlugin - create html of pages with plug in scripts.
 * MiniCssExtractPlugin - extract css into separate files.
 * ProvidePlugin - Automatically load modules instead of having to import or require them everywhere.
 * StylelintPlugin - uses stylelint that helps you avoid errors and enforce conventions in your styles
 * CopyWebpackPlugin - copy ico files
 * ImageMinimizerPlugin - Plugin and Loader for webpack to optimize (compress) all images. Make sure ImageMinimizerPlugin place after any plugins that add images or other assets which you want to optimized.
 * CircularDependencyPlugin - scan bundles to alert about circular dependencies.
 * DuplicatesPlugin - scan bundles to alert about duplicate resources from node_modules.
 * UnusedFilesWebpackPlugin - scan bundles to alert about UnusedFiles.
 * HashedModuleIdsPlugin - replace webpack number links to character links.
 * ContextReplacementPlugin - exclude unused locales from moment.js
 * CleanWebpackPlugin - clean dist folder before each use.
 */
const webpackPlugins = () => {
  const plugins = [
    ...resultOfTemplatesProcessing.HTMLWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: hashedFileName(
        isDev ? 'styles/[name]/[name]' : 'styles/[id]/style',
        'css'
      ),
      ignoreOrder: true,
    }),

    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    // copy ico
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(PATHS.src_absolute, './assets/ico/'),
          to: path.resolve(PATHS.dist_absolute, './assets/ico/'),
        },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(new StylelintPlugin({}));
  }

  plugins.push(
    // eslint-disable-next-line lines-around-comment
    // images are converted to WEBP
    new ImageMinimizerPlugin({
      // Enable file caching and set path to cache directory
      cache: './app/cache/webpack__ImageMinimizerPlugin',

      filename: '[path][name].webp',
      include: /pictures/,
      minimizerOptions: {
        // Lossless optimization with custom option
        plugins: [
          [
            'imagemin-webp',
            {
              /*
               * preset: default //default, photo, picture, drawing, icon and text
               * lossless: true,
               */
              // pre compression with lossless mode on
              nearLossless: 0,
            },
          ],
        ],
      },
    }),

    // original images will compressed lossless
    new ImageMinimizerPlugin({
      // Enable file caching and set path to cache directory
      cache: './app/cache/webpack__ImageMinimizerPlugin',
      include: /pictures/,
      minimizerOptions: {
        // Lossless optimization with custom option
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    })
  );

  if (process.env.MEASURE === 'true') {
    // writes data in stats.json as plain text, shouldn't be in dev mod)
    plugins.push(new DuplicatesPlugin());
  }

  plugins.push(
    new CircularDependencyPlugin(),
    new UnusedFilesWebpackPlugin({
      patterns: ['**/*.scss', '**/*.ts'],
      globOptions: {
        ignore: ['node_modules/**/*', 'shared/**/*', '**/*.d.ts'],
      },
    }),
    new HashedModuleIdsPlugin({
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 8,
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /es-us|ru/),
    new CleanWebpackPlugin()
  );

  return plugins;
};

/**
 * Loaders contraction for templates.
 * @param { string[] } includedFilesExtensions - extensions for including into bundles from components' resources; example: ["scss", "ts"].
 */
const templatesLoaders = (
  includedFilesExtensions = ['css', 'js', 'scss', 'ts']
) => {
  const bemDeclLevels = [];
  redefinitionLevels.forEach((level) => {
    componentGroups.forEach((group) => {
      bemDeclLevels.push(`app/src/${level}/${group}/`);
    });
  });

  return [
    {
      // Adds files of BEM entities to bundle (adds require statements)
      loader: 'bemdecl-to-fs-loader',
      options: {
        levels: bemDeclLevels,
        extensions: includedFilesExtensions,
      },
    },
    {
      // convert HTML to bem DECL format
      loader: 'html2bemdecl-loader',
    },
    {
      // convert template function to html
      loader: '../../configs/webpack/loaders/pug-loader.ts',
    },
    {
      // convert pug to template function
      loader: 'pug-loader',
    },
  ];
};

/**
 * Loaders contraction that loads autoprefixed css with converting modern CSS into something most browsers can understand.
 * DoIUse - alerts for unsupported css features, depending on browserslist.
 * PostcssFlexbugsFixes - fix some flex bugs in old browsers.
 * @param { object } extra_loader - loader with options for css preprocessor.
 * @returns { object[] }
 */
const cssLoaders = (extraLoader) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,

        // if hmr does not work, this is a forceful method.
        reloadAll: true,

        // dist/styles/[name]/style.css -> dist/
        publicPath: './../../',
      },
    },
    {
      loader: 'css-loader',
      options: {
        url: (url) => {
          const isResized =
            url.includes('-320.') ||
            url.includes('-640.') ||
            url.includes('-960.') ||
            url.includes('-1920.');

          // Don't handle resized ` and .webp` urls
          if (isResized || url.includes('.webp')) {
            return false;
          }

          return true;
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            DoIUse({}),
            PostcssFlexbugsFixes(),
            Autoprefixer(),
            PostCSSPresetEnv(),
          ],
        },
      },
    },
  ];

  if (extraLoader) {
    loaders.push(extraLoader);
  }

  return loaders;
};

/**
 * loads js using babel
 * @param { string } extraPreset - name of loader for js preprocessor
 * @returns { string[] }
 */
const jsLoaders = (extraPreset) => {
  const babelOptions = {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    cacheDirectory: './app/cache/webpack__babel',
  };

  if (extraPreset) {
    babelOptions.presets.push(extraPreset);
  }

  return [
    {
      loader: 'babel-loader',
      options: babelOptions,
    },
  ];
};

/**
 * loads assets using file-loader
 * @param { object } extra_loader - loader with options
 * @returns { object[] }
 */
const assetsLoaders = (extraLoader) => {
  const loaders = [
    {
      loader: 'file-loader',
      options: {
        name: '[path]/[name].[ext]',
      },
    },
  ];

  if (extraLoader) {
    loaders.push(extraLoader);
  }

  return loaders;
};

/**
 * Some useful optimizations for bundles by webpack optimization property
 */
const optimization = () => {
  const config = {
    // extract manifest from all entries
    runtimeChunk: { name: 'manifest' },

    // split common imports into separate files
    splitChunks: {
      // == 'initial' && 'async'
      chunks: 'all',
      minChunks: 1,
      cacheGroups: {
        global: {
          test: /.*\\shared\\global\\.*/,
          priority: 6,
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,

          // The optimization will prefer the cache group with a higher priority
          priority: 5,

          // always create chunks (ignore: minSize, maxAsyncRequests, ... )
          enforce: true,
        },
        lib: {
          test: /.*\\library.blocks\\.*/,
          priority: 4,
          enforce: true,
        },
        common: {
          test: /.*\\common.blocks\\.*/,
          priority: 3,
          enforce: true,
        },
        themes: {
          test: /.*\\themes\\.*/,
          priority: 2,
          enforce: true,
        },
        css: {
          test: /\.css$/,
          minChunks: 2,
          priority: 1,
          enforce: true,
        },
        js: {
          test: /\.js$/,
          minChunks: 2,
          priority: 1,
          enforce: true,
        },
      },
    },
  };

  if (isProd) {
    // minify css and js
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

/*
 * measures speed of each plugin in bundling
 * writes data in stats.json as plain text, shouldn't be in dev mod
 */
const smp = new SpeedMeasurePlugin({
  disable: process.env.MEASURE === 'false',
});
module.exports = smp.wrap({
  // The base directory, an absolute path, for resolving entry points and loaders
  context: PATHS.src_absolute,
  mode: 'development',

  // Declarations of used files in bundles
  entry: resultOfTemplatesProcessing.entries,

  // Where to put bundles for every entry point
  output: {
    filename: hashedFileName(
      isDev ? 'bundles/[name]/[name]' : 'bundles/[id]/script',
      'js'
    ),
    path: PATHS.dist_absolute,
  },
  resolve: {
    // You can use it while using import in css and js
    alias: sharedAliases,
    extensions: ['.js', '.json', '.ts'],
  },
  plugins: webpackPlugins(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: templatesLoaders(),
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders({
          loader: 'sass-loader',
          options: {
            // Prefer `dart-sass` instead `node-sass`
            implementation: DartSASS,

            /* compilation faster with fiber on */
            sassOptions: {
              fiber: fibers,
            },
          },
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: assetsLoaders(),
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        use: assetsLoaders(),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript'),
      },
    ],
  },

  // show readable file names during development process
  devtool: isDev ? 'source-map' : '',
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,

    // watch html
    watchContentBase: true,
  },
});
