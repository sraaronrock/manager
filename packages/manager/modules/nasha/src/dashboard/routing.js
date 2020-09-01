import template from './template.html';
import nashaOrderCompleteTemplate from '../order/template.html';
import nashaAddTemplate from '../add/nasha-add.html';
import nashaUnavailableTemplate from '../add/nasha-unavailable.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('nasha.dashboard', {
      url: '/:nashaId',
      redirectTo: 'nasha.dashboard.nasha-partitions',
      template,
      controller: 'NashaCtrl',
      controllerAs: 'NashaCtrl',
      translations: {
        value: ['../common'],
        format: 'json',
      },
      resolve: {
        nashaId: /* @ngInject */ ($transition$) =>
          $transition$.params().nashaId,
        breadcrumb: /* @ngInject */ (nashaId) => nashaId,
      },
    })
    .state('nasha.nasha-order-complete', {
      url: '/order/complete',
      template: nashaOrderCompleteTemplate,
      controller: 'NashaOrderCompleteCtrl',
      controllerAs: 'NashaOrderCompleteCtrl',
      translations: {
        value: ['order', '..'],
        format: 'json',
      },
      params: {
        orderUrl: null,
      },
      resolve: {
        hideBreadcrumb: /* @ngInject */ () => true,
      },
    })
    .state('nasha.nasha-add', {
      url: '/new',
      template: nashaAddTemplate,
      controller: 'NashaAddCtrl',
      controllerAs: 'NashaAddCtrl',
      translations: {
        value: ['add', '..'],
        format: 'json',
      },
      resolve: {
        hideBreadcrumb: /* @ngInject */ () => true,
      },
    })
    .state('nasha.nasha-unavailable', {
      url: '/unavailable',
      template: nashaUnavailableTemplate,
      controller: 'NashaUnavailableCtrl',
      controllerAs: '$ctrl',
      translations: {
        value: ['add', '..'],
        format: 'json',
      },
      resolve: {
        hideBreadcrumb: /* @ngInject */ () => true,
      },
    });
};
