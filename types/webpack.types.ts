import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export interface WebpackConfiguration extends Configuration {
  devServer?: DevServerConfiguration;
}

type CLIValues = boolean | string;

type EnvValues = Record<string, CLIValues | Record<string, Env>>;

interface Env extends EnvValues {}

type Argv = Record<string, CLIValues>;

export interface WebpackConfigurationGenerator {
  (env?: Env, argv?: Argv): Configuration | Promise<Configuration>;
}
