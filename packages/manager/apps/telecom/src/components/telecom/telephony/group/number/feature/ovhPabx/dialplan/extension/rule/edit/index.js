import angular from 'angular';

import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import uiRouter from '@uirouter/angularjs';
import angularTranslate from 'angular-translate';
import 'ovh-ui-angular';

import dialplanExtensionRuleEdit from './diaplan-extension-rule-edit.component';

const moduleName = 'ovhTelecomGroupNumberExtensionRuleEdit';

angular
  .module(moduleName, [
    ngTranslateAsyncLoader,
    uiRouter,
    angularTranslate,
    'oui',
  ])
  .component('dialplanExtensionRuleEdit', dialplanExtensionRuleEdit);

export default moduleName;
