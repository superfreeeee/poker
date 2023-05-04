const DEFAULT_NAMESPACE = 'poker';

export const createLogger = (namespace = DEFAULT_NAMESPACE) => {
  const prefix = `[${namespace}]`;
  return {
    log: (...args: unknown[]) => console.log(prefix, ...args),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    error: (...args: unknown[]) => console.error(prefix, ...args),
  };
};

export const logger = createLogger();
