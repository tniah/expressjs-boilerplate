import app from "./ app";


const URL = process.env.PUBLIC_URL || 'http://localhost';
const PORT = Number(process.env.PUBLIC_PORT) || 8082;
let server;

const bootstrap = async () => {
  server = await app.listen(PORT, () => {
    console.log(`Server started at ${URL}:${PORT}`);
  });
};

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed...');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(`An unexpected occurred when start server: ${error.stack}`);
  exitHandler();
};

bootstrap().catch((error) => {
  unexpectedErrorHandler(error);
});

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});