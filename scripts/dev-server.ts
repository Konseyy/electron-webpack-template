import electronPath from 'electron';
import type { ChildProcess } from 'child_process';
import { spawn } from 'child_process';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../src/renderer/webpack.config';
import mainConfig from '../src/main/webpack.config';
import preloadConfig from '../src/preload/webpack.config';
import { webpack } from 'webpack';
import { resolve } from 'path';
import fs from 'fs';

let serverInstance: WebpackDevServer | undefined;

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(
  {
    client: {
      logging: 'info',
      overlay: true,
    },
    hot: true,
    magicHtml: true,
    liveReload: false,
    onListening: server => {
      console.info(`Webpack devServer listening on http://localhost:${server.options.port}`);
      process.env.DEV_SERVER_URL = `http://localhost:${server.options.port}`;
      serverInstance = server;
      fs.watch(resolve(__dirname, '../src/renderer/index.html'), () => {
        server.sendMessage(server.webSocketServer!.clients, 'content-changed');
      });
      // server.watchFiles(resolve(__dirname, '../src/renderer/index.html'));
    },
  },
  compiler
);

server.startCallback(() => {
  let electronApp: ChildProcess | null = null;
  /**
   * Setup watcher for `main` package
   * On file changed it totally re-launch electron app.
   */
  const mainCompiler = webpack(mainConfig);
  mainCompiler.watch({}, () => {
    /** Kill electron if process already exist */
    if (electronApp !== null) {
      electronApp.removeListener('exit', process.exit);
      electronApp.kill('SIGINT');
      electronApp = null;
    }

    /** Spawn new electron process */
    electronApp = spawn(String(electronPath), ['src/main/dist/index.js'], {
      stdio: 'inherit',
    });

    /** Stops the watch script when the application has been quit */
    electronApp.addListener('exit', process.exit);
  });

  /**
   * Setup watcher for `preload` package
   * On file changed it reload web page.
   * Required to access the web socket of the page. By sending the `full-reload` command to the socket, it reloads the web page.
   */
  const preloadCompiler = webpack(preloadConfig);
  preloadCompiler.watch({}, () => {
    serverInstance!.sendMessage(serverInstance!.webSocketServer!.clients, 'content-changed');
  });
});
