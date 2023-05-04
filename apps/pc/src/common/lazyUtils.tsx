import React, { ComponentProps, Suspense } from 'react';

type DynamicImport<T> = () => Promise<T>;

const lazyComponent = <Module extends Record<string, any>, Key extends keyof Module>(
  loader: () => Promise<Module>,
  key: Key,
) => {
  return React.lazy(async () => {
    const mod = await loader();
    return { default: mod[key] };
  });
};

export const lazyComponentFactory = <Module extends Record<string, any>, Key extends keyof Module>(
  loader: DynamicImport<Module>,
  key: Key,
) => {
  const LazyComponent = lazyComponent(loader, key);

  // eslint-disable-next-line react/display-name
  return (props: ComponentProps<Module[Key]>) => {
    return (
      <Suspense>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};
