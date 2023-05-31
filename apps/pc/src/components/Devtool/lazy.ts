import { lazyComponentFactory } from '../../common/lazyUtils';

export const LazyDevTool = lazyComponentFactory(
  () =>
    import(
      /* webpackChunkName: "component-devtool" */
      '.'
    ),
  'default',
);
