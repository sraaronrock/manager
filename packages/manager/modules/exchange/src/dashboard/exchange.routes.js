import camelCase from 'lodash/camelCase';
import set from 'lodash/set';

import template from './exchange.html';
import orderTemplate from '../order/order.html';

export default /* @ngInject */ ($stateProvider) => {
  const getNavigationInformations = (
    currentSectionInformation,
  ) => /* @ngInject */ (Navigator, $rootScope) => {
    set($rootScope, 'currentSectionInformation', currentSectionInformation);
    return Navigator.setNavigationInformation({
      leftMenuVisible: true,
      configurationSelected: true,
    });
  };

  $stateProvider.state('app.exchange', {
    url: '/configuration/exchange/:organization/:productId',
    resolve: {
      organization: /* @ngInject */ ($transition$) =>
        $transition$.params().organization,
      productId: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,
      exchange: /* @ngInject */ (Exchange, organization, productId) =>
        Exchange.getExchangeDetails(organization, productId),
    },
    redirectTo: (transition) =>
      transition
        .injector()
        .getAsync('exchange')
        .then(
          (exchange) => `app.microsoft.exchange.${camelCase(exchange.offer)}`,
        ),
  });

  $stateProvider.state('app.microsoft.exchange.dedicated', {
    url: '/configuration/exchange_dedicated/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations('exchange_dedicated'),
    },
  });

  $stateProvider.state('app.microsoft.exchange.dedicatedCluster', {
    url:
      '/configuration/exchange_dedicatedCluster/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations(
        'exchange_dedicatedCluster',
      ),
    },
  });

  $stateProvider.state('app.microsoft.exchange.hosted', {
    url: '/configuration/exchange_hosted/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations('exchange_hosted'),
    },
  });

  $stateProvider.state('app.microsoft.exchange.provider', {
    url: '/configuration/exchange_provider/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations('exchange_provider'),
    },
  });

  $stateProvider.state('app.microsoft.exchange.order', {
    url: '/configuration/exchange/order',
    template: orderTemplate,
    controller: 'ExchangeOrderCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    resolve: {
      navigationInformations: getNavigationInformations('exchange_order'),
    },
  });
};
