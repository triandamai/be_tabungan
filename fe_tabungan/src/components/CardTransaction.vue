<template>
  <div
    class="flex px-2 py-4 rounded-lg my-2 border-1 bg-opacity-10 bg-green-400 border-green-300"
  >
    <div
      class="rounded-full p-4 bg-opacity-30"
      :class="
        props.tabungan.accepted
          ? 'bg-green-500 text-green-200'
          : 'bg-yellow-500 text-yellow-200'
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </svg>
    </div>
    <div class="mx-2">
      <a
        @click="toDetail"
        class="font-medium"
        :class="props.tabungan.accepted ? ' text-green-600' : 'text-yellow-600'"
      >
        {{ format(props.tabungan.nominal, "Rp") }}
      </a>
      <p class="text-white">{{ props.tabungan.description }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useCurrency } from "../common/Currency";
export default defineComponent({
  props: {
    tabungan: {
      type: Object,
    },
  },
  setup(props) {
    const router = useRouter();
    function toDetail() {
      router.push({ path: `/detail/${props.tabungan?._id}` });
    }
    return {
      props,
      ...useCurrency(),
      toDetail,
    };
  },
});
</script>
