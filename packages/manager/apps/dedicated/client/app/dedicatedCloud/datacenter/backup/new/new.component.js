import controller from './new.controller';
import template from './new.html';

export default {
  bindings: {
    backup: '<',
    backupConditionsUrl: '@',
    backupOffers: '<',
    backupOffersUnderProcess: '<',
    backupTariffUrl: '@',
    currentUser: '<',
    datacenterId: '<',
    defaultPaymentMethod: '<',
    enabledBackupOffer: '<',
    goToBackup: '<',
    productId: '<',
    operationsUrl: '<',
    scrollToTop: '<',
  },
  controller,
  template,
};