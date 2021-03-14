<template>
  <section class="px-4">
    <div>
      <button
        class="bg-green-500 text-white items-center border-0 py-3 px-4 focus:outline-none rounded-lg font-medium text-base mt-6 lg:mt-0 mr-2"
      >
        Nabung
      </button>
      <button
        class="bg-gray-400 text-white items-center border-0 py-3 px-4 focus:outline-none rounded-lg font-medium text-base mt-6 lg:mt-0"
      >
        Butuh
      </button>
    </div>
    <h1 class="text-lg text-white my-4">Transaksi</h1>
    <div>
      <card-transaction
        v-for="(item, index) in TabunganState.tabungans"
        :tabungan="item"
        :key="index"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useTabungan } from "../../data/TabunganState";
import CardTransaction from "../../components/CardTransaction.vue";

export default defineComponent({
  components: {
    CardTransaction,
  },
  setup() {
    return {
      ...useTabungan(),
    };
  },
});
</script>
