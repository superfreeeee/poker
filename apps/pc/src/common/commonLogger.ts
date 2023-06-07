/* eslint-disable no-console */
import debug from 'debug';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_NAMESPACE = 'poker';

interface Logger {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

export const DEBUG_ALL = '*';

export const debugOptionsSubject = new BehaviorSubject<string[]>([DEBUG_ALL]);

/**
 * Add new namespace when creating new logger
 * @param namespaces
 */
const addDebugOption = (...namespaces: string[]) => {
  if (namespaces.length > 0) {
    debugOptionsSubject.next([...debugOptionsSubject.value, ...namespaces]);
  }
};

export const createLogger = (namespace = DEFAULT_NAMESPACE): Logger => {
  addDebugOption(namespace);

  const prefix = `[${namespace}]`;

  return {
    log: debug(prefix),
    warn: (...args: unknown[]) => console.warn(prefix, ...args),
    error: (...args: unknown[]) => console.error(prefix, ...args),
  };
};

export const logger = createLogger();
