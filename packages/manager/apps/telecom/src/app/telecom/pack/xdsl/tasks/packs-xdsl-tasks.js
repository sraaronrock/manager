angular
  .module('managerApp')
  .config(($stateProvider) => {
    $stateProvider.state('telecom.packs.pack.xdsl.line.tasks', {
      url: '/tasks',
      views: {
        'xdslView@telecom.packs.pack.xdsl.line': {
          templateUrl: 'app/telecom/pack/xdsl/tasks/pack-xdsl-tasks.html',
          controller: 'XdslTasksCtrl',
          controllerAs: '$ctrl',
        },
      },
      resolve: {
        breadcrumb: /* @ngInject */ ($translate) =>
          $translate.instant('xdsl_tasks_list'),
      },
    });
  })
  .run(/* @ngTranslationsInject:json ./translations */);
