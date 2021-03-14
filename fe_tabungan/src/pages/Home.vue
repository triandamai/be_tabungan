<template>
  <main class="bg-gray-200 bg-gray-900 h-full min-h-screen">
    <router-view />
    <bottom-navigation />
  </main>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";

import { useTabungan } from "../data/TabunganState";

import BottomNavigation from "../components/BottomNavigation.vue";

export default defineComponent({
  components: {
    BottomNavigation,
  },
  setup() {
    const { TabunganState, getAllDeposit, getCountDeposit } = useTabungan();
    onBeforeMount(() => {
      getCountDeposit().then(() => {
        // console.log(TabunganState.amountDeposit);
      });
      getAllDeposit().then(() => {
        //console.log(TabunganState.amountDeposit);
      });
    });
  },
});
</script>
