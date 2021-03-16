<template>
  <section class="px-4 py-4">
    <div class="px-4 py-6 rounded-2xl text-white">
      <span class="flex flex-wrap"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class=""
          width="24"
          height="24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>
        <h1 class="mx-2">Total Tabungan</h1></span
      >
      <h1 class="text-4xl font-semibold">
        {{ format(TabunganState.amountDeposit, "RP") }}
      </h1>
    </div>
    <h1 class="text-white">Transaksi</h1>
    <no-data
      v-if="TabunganState.tabungans.length < 1"
      :title="'Belum ada apapun'"
      :text="'karena kamu belum mulai menabung apapun yuk mulai nabung..'"
      :button="'Mulai nabung'"
      :link="'/deposit'"
    />
    <div v-else class="pb-20">
      <card-transaction
        v-for="(item, index) in TabunganState.tabungans"
        :key="index"
        :tabungan="item"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";

import { useTabungan } from "../../data/TabunganState";
import { useCurrency } from "../../common/Currency";

import CardTransaction from "../../components/CardTransaction.vue";
import NoData from "../../components/NoData.vue";

export default defineComponent({
  components: {
    CardTransaction,
    NoData,
  },
  setup() {
    const { getAllDeposit } = useTabungan();
    onMounted(() => {
      getAllDeposit();
    });
    return {
      ...useTabungan(),
      ...useCurrency(),
    };
  },
});
</script>
