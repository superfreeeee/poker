/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, ComponentProps, Suspense } from 'react';

type DynamicImport<T> = () => Promise<T>;

/**
 * Wrap Component with React.lazy
 * @param loader
 * @param key
 * @returns
 */
const lazyComponent = <Module extends Record<string, any>, Key extends keyof Module>(
  loader: () => Promise<Module>,
  key: Key,
) => {
  return lazy(async () => {
    const mod = await loader();
    return { default: mod[key] };
  });
};

/**
 * Create lazy HOC for async component
 * @param loader
 * @param key
 * @returns
 */
export const lazyComponentFactory = <Module extends Record<string, any>, Key extends keyof Module>(
  loader: DynamicImport<Module>,
  key: Key,
) => {
  const LazyComponent = lazyComponent(loader, key);

  return (props: ComponentProps<Module[Key]>) => {
    return (
      <Suspense>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};
