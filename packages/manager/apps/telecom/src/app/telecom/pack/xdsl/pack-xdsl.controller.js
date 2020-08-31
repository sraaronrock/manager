import { PACK_XDSL } from './pack-xdsl.constant';

export default class PackXdslCtrl {
  /* @ngInject */
  constructor(
    $q,
    $state,
    $transitions,
    $translate,
    OvhApiPackXdsl,
    OvhApiXdsl,
    OvhApiXdslModem,
    smoothScroll,
    TucToast,
    TucToastError,
  ) {
    this.$q = $q;
    this.$state = $state;
    this.$transitions = $transitions;
    this.$translate = $translate;
    this.OvhApiXdsl = OvhApiXdsl;
    this.OvhApiPackXdsl = OvhApiPackXdsl;
    this.OvhApiXdslModem = OvhApiXdslModem;
    this.smoothScroll = smoothScroll;
    this.TucToast = TucToast;
    this.TucToastError = TucToastError;

    this.accessDescriptionSave = this.accessDescriptionSave.bind(this);
  }

  $onInit() {
    this.animTime = 1500;
    this.noModemStatus = 404;

    this.loading = {
      init: false,
    };

    this.content = {
      back: {},
    };

    this.loading.init = true;

    this.disabledModem = true;
    this.enableModemIfHaveOne();

    this.$transitions.onSuccess({}, (transition) => {
      this.updateUIForState(transition.to());
    });
    this.updateUIForState(this.$state.current);

    return this.$q
      .allSettled([
        this.getPackXdsl().then((pack) => {
          this.pack = pack;
        }),
        this.getXdsl().then((access) => {
          this.access = access;
        }),
      ])
      .finally(() => {
        this.loading.init = false;
      });
  }

  getPackXdsl() {
    return this.OvhApiPackXdsl.Aapi().get({
      packId: this.packName,
    }).$promise;
  }

  getXdsl() {
    return this.OvhApiXdsl.v6().get({
      xdslId: this.serviceName,
    }).$promise;
  }

  setAnim(className) {
    setTimeout(() => {
      this.content.back.class = className;
    }, this.animTime);
  }

  enableModemIfHaveOne() {
    return this.OvhApiXdslModem.v6()
      .get({ xdslId: this.serviceName })
      .$promise.then(() => {
        this.disabledModem = false;
      })
      .catch((err) => {
        if (err.status !== this.noModemStatus) {
          this.TucToastError(err);
          return this.$q.reject(err);
        }
        return err;
      });
  }

  updateUIForState(state) {
    if (this.packName === PACK_XDSL.sdsl) {
      if (
        state.name === 'telecom.packs.pack.xdsl' ||
        state.name === 'telecom.packs.pack.xdsl.modem' ||
        state.name === 'telecom.packs.pack.xdsl.tasks'
      ) {
        this.setAnim('anim');
        return;
      }
    }

    this.smoothScroll(document.body);

    switch (state.name) {
      case 'telecom.packs.pack.xdsl.modem.wifi':
      case 'telecom.packs.pack.xdsl.modem.dmz':
      case 'telecom.packs.pack.xdsl.access-notifications':
      case 'telecom.packs.pack.xdsl.access-diagnostic':
      case 'telecom.packs.pack.xdsl.access-migration':
      case 'telecom.packs.pack.xdsl.access-ip':
      case 'telecom.packs.pack.xdsl.access-deconsolidation':
      case 'telecom.packs.pack.xdsl.access-order':
      case 'telecom.packs.pack.xdsl.access-resiliation':
      case 'telecom.packs.pack.xdsl.missing-rio':
      case 'telecom.packs.pack.xdsl.line-diagnostic':
      case 'telecom.packs.pack.xdsl.modem.templates':
      case 'telecom.packs.pack.xdsl.access-modem-exchange':
        this.setAnim('invert-anim');
        this.content.back.state = '^';
        this.getXdsl().then((xdsl) => {
          this.content.status = xdsl.status;
          this.content.accessType = xdsl.accessType;
        });
        break;
      case 'telecom.packs.pack.xdsl.modem':
      case 'telecom.packs.pack.xdsl.tasks':
      case 'telecom.packs.pack.xdsl':
        this.setAnim('anim');
        this.content.back.state = 'telecom.packs.pack';
        this.getXdsl().then((xdsl) => {
          this.content.status = xdsl.status;
          this.content.accessType = xdsl.accessType;
        });
        break;
      default:
        this.setAnim('anim');
        this.content.back = {};
        break;
    }
  }

  isModemTabAvailable() {
    // Modem tab not available for SDSL access
    if (this.content.accessType !== PACK_XDSL.sdsl) {
      return PACK_XDSL.availableModemTabStatus.includes(this.content.status);
    }
    return false;
  }

  accessDescriptionSave(newAccessDescr) {
    this.loading.save = true;

    return this.OvhApiXdsl.v6()
      .put(
        {
          xdslId: this.serviceName,
        },
        {
          description: newAccessDescr,
        },
      )
      .$promise.then(() => {
        this.access.description = newAccessDescr;
      })
      .catch((error) => {
        this.TucToast.error(
          [
            this.instant('xdsl_rename_error', this.serviceName),
            error.data.message,
          ].join(' '),
        );
        return this.$q.reject(error);
      })
      .finally(() => {
        this.loading.save = false;
      });
  }
}
