const liveReload = require('livereload');
const handler = require('serve-handler');
const http = require('http');

const serveHandlerConfig = {
  public: require('path').resolve(__dirname, 'public'),
};
const serverConfig = {
  port: 3000,
};
const liveReloadConfig = {
  port: 35729,
};

startLiveReload(liveReloadConfig);
startStaticServer(serverConfig, serveHandlerConfig);

function startLiveReload(config) {
  const liveReloadServer = liveReload.createServer(config);
  liveReloadServer.watch(__dirname + '/public');
  console.log(`LiveReload server running at ${config.port}`);
}

function startStaticServer(serverConfig, serveHandlerConfig) {
  const server = http.createServer((request, response) => {
    return handler(request, response, serveHandlerConfig);
  });
  const port = serverConfig.port || 3000;

  server.listen(port, () => {
    console.log(`Static server running at http://localhost:${port}`);
  });
}
