<template>
  <section class="h-full w-full px-8 py-20 bg-gray-900">
    <no-data
      v-show="noData"
      class="min-h-screen"
      :title="'Uuups'"
      :text="'Gagal mengambil detail \n coba nanti agi ya..'"
      :button="'Okedeh'"
    />
    <div
      v-show="!noData"
      class="flex lg:flex-row flex-col items-center min-h-screen"
      style="font-family: 'Poppins', sans-serif"
    >
      <!-- Left Column -->
      <div
        class="w-full lg:w-1/2 text-center justify-center flex lg:mb-0 mb-12"
      >
        <img class="rounded-lg" :src="tabungan.receipt" alt="" />
      </div>
      <!-- Right Column -->
      <div
        class="lg:w-1/2 w-full flex flex-col lg:items-start items-center lg:text-left text-center"
      >
        <h2
          class="md:text-4xl text-3xl text-white font-semibold mb-10 tracking-tight"
        >
          Tabungan
        </h2>
        <ul>
          <li class="mb-8">
            <h4
              class="font-medium text-2xl text-white mb-5 flex lg:flex-row flex-col items-center lg:justify-start justify-center"
            >
              {{ format(tabungan.nominal, "Rp") }}
            </h4>
            <p
              class="text-base leading-7 tracking-wide sm:inline-block hidden caption-content-3-3"
            >
              We have provided highly experienced mentors<br />
              for several years.
            </p>
          </li>
        </ul>
        <button
          v-show="
            tabungan.sender != UserState.profil.uid &&
            tabungan.accepted.length < 1
          "
          @click="verifikasiDeposit"
          class="mb-6 btn-fill-content-3-3 px-10 py-4 text-base text-white font-semibold rounded-xl cursor-pointer focus:outline-none tracking-wide"
        >
          Terima
        </button>
        <router-link
          to="/main/dashboard"
          class="mb-6 px-10 py-4 text-base text-white font-semibold rounded-xl cursor-pointer focus:outline-none tracking-wide"
        >
          Kembali
        </router-link>
        <p
          class="mb-6 text-base leading-7 tracking-wide inline-block sm:hidden caption-content-3-3"
        >
          {{ route.params.id }}
        </p>
      </div>
    </div>
    <!-- Dialog -->
    <base-dialog :show="isLoading()" :dissmisable="false"
      ><dialog-loading
    /></base-dialog>
    <base-dialog
      :show="isDialogResult()"
      :dissmisable="true"
      @onDismis="dismiss()"
    >
      <dialog-result
        v-if="!isDialogSuccess()"
        :title="'Yaah..'"
        :message="'Gagal verifikasi nih..Hal kaya gini normal sih bisanya si server lagi cape..'"
        :positive="'Oke Coba lagi'"
        :negative="'Yaudah kembali'"
        @onNegative="gotoHome()"
        ><div>
          <icon-failed /></div
      ></dialog-result>
      <dialog-result
        v-else
        :title="'Yuhuuu..'"
        :message="'Selamat! kamu berhasil menabung yuk tingkatkan lagi'"
        :positive="'Oke Coba lagi'"
        :negative="'Yaudah kembali'"
        @onNegative="gotoHome()"
        ><div>
          <icon-success /></div
      ></dialog-result>
    </base-dialog>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUser } from "../data/UserState";

import { useTabungan, ITabungan } from "../data/TabunganState";
import { useCurrency } from "../common/Currency";

import BaseDialog from "../components/DialogBase.vue";
import DialogResult from "../components/DialogResult.vue";
import IconFailed from "../components/icon/NotFound.vue";
import IconSuccess from "../components/icon/Transfer.vue";
import DialogLoading from "../components/DialogLoading.vue";
import NoData from "../components/NoData.vue";

export default defineComponent({
  components: {
    BaseDialog,
    DialogLoading,
    DialogResult,
    IconFailed,
    IconSuccess,
    NoData,
  },
  setup() {
    const route = useRoute();
    const { getProfil, UserState } = useUser();
    const { getDepositById, acceptDeposit } = useTabungan();
    const tabungan = ref<ITabungan>({
      sender: "",
      nominal: "",
      receipt: "",
      receiptname: "",
      accepted: "",
      description: "",
      tabungantype: "deposit",
      created: 0,
      updated: 0,
    });
    const noData = ref(false);
    function verifikasiDeposit() {
      acceptDeposit(UserState.profil.uid, tabungan.value._id);
    }
    onMounted(() => {
      getProfil();
      getDepositById().then((data: any) => {
        if (data) {
          noData.value = false;
          tabungan.value = data[0];
        } else {
          noData.value = true;
        }
        console.log(tabungan.value.sender != UserState.profil.uid);
        console.log(tabungan.value.accepted == "");
      });
    });

    return {
      UserState,
      route,
      verifikasiDeposit,
      ...useTabungan(),
      ...useCurrency(),
      tabungan,
      noData,
    };
  },
});
</script>
