import net from 'node:net';

import { getE2EBaseUrl, getE2EPort } from './e2e-port';

function checkPortAvailability(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        resolve(false);
        return;
      }

      reject(error);
    });

    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port);
  });
}

async function main() {
  const port = getE2EPort();
  const baseUrl = getE2EBaseUrl(port);
  const isAvailable = await checkPortAvailability(port);

  if (!isAvailable) {
    console.error(
      `E2E port check failed: port ${port} is already in use.\n` +
        `Set a different E2E_PORT and retry, for example:\n` +
        `  E2E_PORT=3110 npm run test:e2e:dev\n` +
        `Expected Playwright baseURL for this run: ${baseUrl}`
    );
    process.exit(1);
  }

  console.warn(`E2E port check passed: ${baseUrl} is available.`);
}

main().catch((error) => {
  console.error('E2E port check failed with unexpected error:', error);
  process.exit(1);
});
