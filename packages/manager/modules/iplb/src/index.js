import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

import '@ovh-ux/ui-kit/dist/css/oui.css';

const moduleName = 'ovhManagerIplbLazyLoading';

angular.module(moduleName, ['ui.router', 'oc.lazyLoad']).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider
      .state('network', {
        url: '/network',
        template: `
                  <div data-ui-view="networkContainer"></div>
              `,
        abstract: true,
      })
      .state('network.iplb', {
        url: '/iplb',
        abstract: true,
        views: {
          networkContainer: {
            template: '<div data-ui-view="iplbContainer" class="iplb"></div>',
          },
        },
        translations: {
          value: ['../common', '.'],
          format: 'json',
        },
      })
      .state('network.iplb.detail.**', {
        url: '/:serviceName',
        lazyLoad: ($transition$) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

          return import('./dashboard/iplb.module').then((mod) =>
            $ocLazyLoad.inject(mod.default || mod),
          );
        },
      })
      .state('network.iplb.index.**', {
        url: '',
        lazyLoad: ($transition$) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

          return import('./iplb.module').then((mod) =>
            $ocLazyLoad.inject(mod.default || mod),
          );
        },
      });
  },
);
export default moduleName;
