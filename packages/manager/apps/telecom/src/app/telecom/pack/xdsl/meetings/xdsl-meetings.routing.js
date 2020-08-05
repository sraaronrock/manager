export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.xdsl-meetings', {
    url: '/xdsl/:serviceName/meetings',
    views: {
      'telecomView@telecom': 'packXdslMeetings',
    },
    resolve: {
      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().serviceName,
    },
  });
};
