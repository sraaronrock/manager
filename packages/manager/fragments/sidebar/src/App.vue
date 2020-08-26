<template>
  <nav role="navigation" class="oui-sidebar">
    <div class="oui-sidebar-menu">
      <Order :baseUrl="baseUrl" :universe="universe"></Order>
      <Items :items="config.items"></Items>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Items from './components/items/Items.vue';
import Order from './components/order/Order.vue';
import { Sidebar } from './model/Sidebar';

export default Vue.extend({
  name: 'App',
  components: {
    Items,
    Order,
  },
  props: {
    universe: String,
    items: Array,
    config: Sidebar,
    baseUrl: String,
  },
});
</script>
