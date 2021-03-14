<template>
  <section
    id="bottom-navigation"
    class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow py-4 rounded-md mb-1 mx-2"
  >
    <div id="tabs" class="flex justify-between">
      <router-link
        to="/main/dashboard"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        :class="isActive ? 'text-green-400' : 'text-gray-600'"
        v-slot="{ isActive }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="25"
          height="25"
          class="inline-block mb-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>

        <!-- <span class="tab tab-home block text-xs">Home</span> -->
      </router-link>
      <router-link
        to="/main/history"
        :class="isActive ? 'text-green-400' : 'text-gray-600'"
        v-slot="{ isActive }"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          class="inline-block mb-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <!-- <span class="tab tab-kategori block text-xs">History</span> -->
      </router-link>
      <router-link
        to="/main/profil"
        :class="isActive ? 'text-green-400' : 'text-gray-600'"
        v-slot="{ isActive }"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="25"
          height="25"
          class="inline-block mb-1"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <!-- <span class="tab tab-explore block text-xs">Profil</span> -->
      </router-link>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
