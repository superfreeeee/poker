import { useEffect, useState } from 'react';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ELocalStorageKey, getItem, setItem } from '../common/localStorage';
import { DEBUG_ALL, debugOptionsSubject } from '../common/commonLogger';

export interface DebugOption {
  namespace: string;
  show: boolean;
}

const WRAPPED_NAMESPACE_REGEXP = /\\\[(.*)\\\]/;

const deserializeOptions = (options: string): string[] => {
  if (!options) return [];
  return options
    .split(',')
    .map((option) =>
      WRAPPED_NAMESPACE_REGEXP.test(option)
        ? option.match(WRAPPED_NAMESPACE_REGEXP)?.[1] ?? ''
        : option,
    )
    .filter((option) => !!option);
};

const serializeOptions = (options: string[]): string => {
  return options.map((option) => (option === DEBUG_ALL ? option : `\\[${option}\\]`)).join(',');
};

/**
 * Showed logger namespaces
 */
const debugShowListSubject = new BehaviorSubject(
  deserializeOptions(getItem(ELocalStorageKey.Debug, true) ?? ''),
);

// sync with localStorage
debugShowListSubject.subscribe((showList) => {
  setItem(ELocalStorageKey.Debug, serializeOptions(showList), true);
  return showList;
});

/**
 * Toggle debug option
 * @param namespace
 */
export const toggleDebugOption = (namespace: string) => {
  const oldShowList = debugShowListSubject.value;
  debugShowListSubject.next(
    oldShowList.includes(namespace)
      ? oldShowList.filter((space) => space !== namespace)
      : [...oldShowList, namespace],
  );
};

const debugOptions = combineLatest([debugOptionsSubject, debugShowListSubject]).pipe(
  map(([options, showList]) => {
    return options
      .sort((n1, n2) => (n1 < n2 ? -1 : 1))
      .map((option): DebugOption => ({ namespace: option, show: showList.includes(option) }));
  }),
);

export const useDebugOptions = () => {
  const [options, setOptions] = useState<DebugOption[]>([]);

  useEffect(() => {
    const subscription = debugOptions.subscribe((nextOptions) => {
      setOptions(nextOptions);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return options;
};
