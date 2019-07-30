//This script file just runs production webpack config - webpack.config..prod.js

/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod'
import chalk from 'chalk';

/*Below line declares we are running node in production node. Not necessary for our setup. But we are creating it because
 This is important if we create dev specific configuration for babel in .babelrc file.
 Babel and other potentially libraries we may use look for thisenvironment variable to determine
 how they are build*/
process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production. This will take a moment...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) { //so a fatal error occurred. Stop here.
    console.log(chalk.red(err));
    return 1;
  }
  //The below code ensures errors, warnings and stats are displayed to the console
  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if(jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalk.green('Your app has been built for production and written to /dist!'));

  return 0;
});

