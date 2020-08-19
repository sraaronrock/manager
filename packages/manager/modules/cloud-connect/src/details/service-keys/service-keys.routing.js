export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('cloud-connect.details.service-keys', {
    url: '/service-keys',
    component: 'cloudConnectDetailsServiceKeys',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      serviceKeys: /* @ngInject */ (cloudConnectService, cloudConnect) =>
        cloudConnectService.loadServiceKeys(cloudConnect),
      goToRegenerateServiceKeyPage: /* @ngInject */ ($state) => (
        serviceKeyId,
      ) =>
        $state.go('cloud-connect.details.service-keys.regenerate-service-key', {
          serviceKeyId,
        }),
      goToServiceKeysPage: /* @ngInject */ (
        $state,
        CucControllerHelper,
        CucCloudMessage,
        cloudConnectId,
      ) => (message = false, type = 'success', reload = false) => {
        const state = 'cloud-connect.details.service-keys';
        const promise = $state.go(
          state,
          {
            ovhCloudConnectId: cloudConnectId,
          },
          {
            reload,
          },
        );
        if (message) {
          promise.then(() => CucCloudMessage[type](message, state));
          CucControllerHelper.scrollPageToTop();
        }
        return promise;
      },
    },
  });
};
