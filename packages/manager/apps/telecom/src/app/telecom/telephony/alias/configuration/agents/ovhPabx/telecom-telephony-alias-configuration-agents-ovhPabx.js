angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.alias.details.configuration.agents.ovhPabx',
    {
      url: '/ovhPabx',
      views: {
        'aliasView@telecom.telephony.billingAccount.alias.details': {
          templateUrl:
            'app/telecom/telephony/alias/configuration/agents/ovhPabx/telecom-telephony-alias-configuration-agents-ovhPabx.html',
          controller: 'TelecomTelephonyAliasConfigurationAgentsOvhPabxCtrl',
          controllerAs: 'AgentsOvhPabxCtrl',
        },
      },
      translations: { value: ['..'], format: 'json' },
    },
  );
});
