<template>
  <section class="px-4">
    <div>
      <button
        @click="router.push({ path: '/deposit' })"
        class="mb-6 btn-fill-content-3-3 px-4 mr-3 py-3 text-base text-white font-semibold rounded-lg cursor-pointer focus:outline-none tracking-wide"
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
    <no-data
      v-if="TabunganState.tabungans.length < 1"
      :title="'Belum ada apapun'"
      :text="'karena kamu belum mulai menabung apapun yuk mulai nabung..'"
      :button="'Mulai nabung'"
      :link="'/deposit'"
    />
    <div v-else class="pb-30">
      <card-transaction
        v-for="(item, index) in TabunganState.tabungans"
        :key="index"
        :tabungan="item"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useTabungan } from "../../data/TabunganState";
import CardTransaction from "../../components/CardTransaction.vue";
import NoData from "../../components/NoData.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    CardTransaction,
    NoData,
  },
  setup() {
    const router = useRouter();
    const { getAllDeposit } = useTabungan();
    onMounted(() => {
      getAllDeposit();
    });
    return {
      ...useTabungan(),
      router,
    };
  },
});
</script>
