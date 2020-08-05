angular
  .module('managerApp')
  .config(($stateProvider) => {
    $stateProvider.state('telecom.telephony.billingAccount.guides', {
      url: '/guides',
      views: {
        'groupInnerView@telecom.telephony.billingAccount': {
          templateUrl:
            'app/telecom/telephony/billingAccount/guides/telecom-telephony-guides.html',
          controller: 'TelecomTelephonyGuidesCtrl',
          controllerAs: '$ctrl',
        },
      },
      resolve: {
        breadcrumb: /* @ngInject */ ($translate) =>
          $translate.instant('telephony_guides_breadcrumb'),
      },
      translations: { value: ['../guides'], format: 'json' },
    });
  })
  .run(/* @ngTranslationsInject:json ./translations */);
