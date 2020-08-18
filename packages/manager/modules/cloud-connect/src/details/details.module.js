import angular from 'angular';

import component from './details.component';
import overview from './overview';
import routing from './details.routing';
import serviceKeys from './service-keys';
import tasks from './tasks';

const moduleName = 'ovhCloudConnectDetails';

angular
  .module(moduleName, [overview, serviceKeys, tasks])
  .config(routing)
  .component('cloudConnectDetails', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
