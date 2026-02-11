const DEFAULT_E2E_PORT = 3100;

export function getE2EPort(): number {
  const rawPort = process.env.E2E_PORT ?? String(DEFAULT_E2E_PORT);
  const parsedPort = Number.parseInt(rawPort, 10);

  if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
    throw new Error(
      `Invalid E2E_PORT="${rawPort}". Use an integer between 1 and 65535.`
    );
  }

  return parsedPort;
}

export function getE2EBaseUrl(port = getE2EPort()): string {
  return `http://127.0.0.1:${port}`;
}
