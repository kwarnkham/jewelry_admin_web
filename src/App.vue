<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { itemRelatedApi } from "./mixins/itemRelatedApi";
export default {
  name: "App",
  mixins: [itemRelatedApi],
  created() {
    this.getItems();
    this.getFactor();
  }
};
</script>
