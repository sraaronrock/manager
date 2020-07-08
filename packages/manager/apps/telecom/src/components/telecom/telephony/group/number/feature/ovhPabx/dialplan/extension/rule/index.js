import angular from 'angular';

import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import uiRouter from '@uirouter/angularjs';
import angularTranslate from 'angular-translate';
import 'ovh-ui-angular';

import dialplanExtensionRuleEdit from './edit';
import extensionRule from './dialplan-extension-rule.component';

const moduleName = 'ovhTelecomGroupNumberExtensionRule';

angular
  .module(moduleName, [
    ngTranslateAsyncLoader,
    uiRouter,
    angularTranslate,
    'oui',
    dialplanExtensionRuleEdit,
  ])
  .component('telephonyNumberOvhPabxDialplanExtensionRule', extensionRule);

export default moduleName;
