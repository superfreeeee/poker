/* eslint-disable no-console */
import debug from 'debug';

const DEFAULT_NAMESPACE = 'poker';

interface Logger {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

export const createLogger = (namespace = DEFAULT_NAMESPACE): Logger => {
  const prefix = `[${namespace}]`;

  return {
    log: debug(prefix),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    error: (...args: unknown[]) => console.error(prefix, ...args),
  };
};

export const logger = createLogger();
