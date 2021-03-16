<template>
  <main class="bg-gray-900 h-full min-h-screen">
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="transition ease-linear duration-200 transform"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-linear duration-200 transform"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        name="fade"
      >
        <component :is="Component" />
      </transition>
    </router-view>
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
