angular.module('UserAccount').service('UserAccount.services.emails', [
  'constants',
  'OvhHttp',
  function UserAccountEmailsService(constants, OvhHttp) {
    const cache = {
      models: 'UNIVERS_MODULE_OTRS_MODELS',
      me: 'UNIVERS_MODULE_OTRS_ME',
      emails: 'UNIVERS_MODULE_OTRS_EMAILS',
    };

    this.getModels = function getModels() {
      return OvhHttp.get('/me.json', {
        rootPath: 'apiv6',
        cache: cache.models,
      });
    };

    this.getMe = function getMe() {
      return OvhHttp.get('/me', { rootPath: 'apiv6', cache: cache.me });
    };

    this.getEmails = function getEmails(opts) {
      return OvhHttp.get('/me/notification/email/history', {
        rootPath: 'apiv6',
        cache: cache.emails,
        clearAllCache: opts.forceRefresh,
      });
    };

    this.getEmail = function getEmail(emailId) {
      return OvhHttp.get('/me/notification/email/history/{emailId}', {
        rootPath: 'apiv6',
        urlParams: {
          emailId,
        },
      });
    };
  },
]);
