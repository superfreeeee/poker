import { lazyComponentFactory } from '../../common/lazyUtils';

export const LazyBuyIn = lazyComponentFactory(
  () =>
    import(
      /* webpackChunkName: "page-buyin" */
      './index'
    ),
  'default',
);
