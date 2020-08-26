<template>
  <a class="oui-button oui-button_primary" :href="discoverUrl">{{ $t('sidebar_discover') }}</a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Order',
  props: {
    baseUrl: String,
    universe: String,
  },
  computed: {
    discoverUrl() {
      return `${this.baseUrl}/#/catalog?universe=${this.universe}`;
    },
  },
});
</script>
