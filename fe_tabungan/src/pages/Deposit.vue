<template>
  <section
    class="h-full w-full border-box transition-all duration-500 linear"
    style="background-color: #232130"
  >
    <div style="font-family: 'Poppins', sans-serif">
      <div class="flex flex-col items-center h-full lg:flex-row">
        <div class="relative hidden lg:block h-full width-left-empty-3-6">
          <img
            class="absolute object-fill centered-empty-3-6"
            src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-6.png"
            alt=""
          />
        </div>
        <div
          class="flex w-full h-full px-8 width-right-empty-3-6 sm:px-16 py-32 lg:mx-0 mx-auto items-left justify-left"
          style="background-color: #211f2d"
        >
          <div
            class="w-full sm:w-7/12 md:w-8/12 lg:w-9/12 xl:w-7/12 mx-auto lg:mx-0"
          >
            <div class="items-center justify-center lg:hidden flex">
              <img
                src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-6.png"
                alt=""
              />
            </div>
            <h3 class="text-3xl font-semibold mb-3" style="color: #d8d7df">
              Yuk yuk nabung
            </h3>
            <p class="leading-7 text-sm" style="color: #737182">
              Diisi dlu ya form dibawah<br />
              dan jangan lupa transfer dulu ke rekening.
            </p>
            <form class="mt-6" @submit.prevent="sendDeposit">
              <div class="mb-7">
                <label class="block text-lg font-medium" style="color: #d8d7df"
                  >Nominal</label
                >
                <div
                  class="flex w-full px-5 py-4 mt-3 text-base font-light rounded-xl input-empty-3-6"
                >
                  <svg
                    class="mr-4 icon-empty-3-6"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 5C3.34315 5 2 6.34315 2 8V16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8C22 6.34315 20.6569 5 19 5H5ZM5.49607 7.13174C5.01655 6.85773 4.40569 7.02433 4.13168 7.50385C3.85767 7.98337 4.02427 8.59422 4.50379 8.86823L11.5038 12.8682C11.8112 13.0439 12.1886 13.0439 12.4961 12.8682L19.4961 8.86823C19.9756 8.59422 20.1422 7.98337 19.8682 7.50385C19.5942 7.02433 18.9833 6.85773 18.5038 7.13174L11.9999 10.8482L5.49607 7.13174Z"
                      fill="#4E4B62"
                    />
                  </svg>
                  <input
                    type="number"
                    v-model="TabunganState.formtabungan.nominal"
                    placeholder="Rp 10.000.00"
                    class="w-full focus:outline-none text-base font-light"
                    autocomplete
                    required
                    style="background-color: #252332"
                  />
                </div>
              </div>
              <div class="mb-7">
                <label class="block text-lg font-medium" style="color: #d8d7df"
                  >Keterangan</label
                >
                <div
                  class="flex w-full px-5 py-4 mt-3 text-base font-light rounded-xl input-empty-3-6"
                >
                  <svg
                    class="mr-4 icon-empty-3-6"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                      fill="#4E4B62"
                    />
                  </svg>
                  <input
                    type="text"
                    v-model="TabunganState.formtabungan.description"
                    placeholder="Buat masa depan"
                    class="w-full focus:outline-none text-base font-light"
                    autocomplete
                    required
                    style="background-color: #252332"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-lg font-medium" style="color: #d8d7df"
                  >Struk</label
                >
                <div
                  class="flex items-center w-full px-5 py-4 mt-3 text-base font-light rounded-xl input-empty-3-6"
                >
                  <div>
                    <svg
                      class="mr-4 icon-empty-3-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"
                        fill="#4E4B62"
                      />
                      <path
                        fill="#4E4B62"
                        fill-rule="evenodd"
                        d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>

                  <label
                    for="file"
                    class="font-light text-sm text-gray-500 truncate min-w-2/3"
                    >{{ TabunganState.formtabungan.filename }}
                  </label>
                  <input
                    type="file"
                    id="file"
                    @change="onImagePicked"
                    class="inputFile"
                    placeholder="Pilih gambar"
                    required
                    style="background-color: #252332"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn-fill-empty-3-6 block w-full px-4 py-3 mt-9 font-medium text-xl text-white transition duration-500 ease-in-out transform rounded-xl hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
              >
                Simpan
              </button>
            </form>
            <button
              @click="gotoHome()"
              class="block border-gray-500 border-1 w-full px-4 py-3 mt-9 font-medium text-xl text-white transition duration-500 ease-in-out transform rounded-xl hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
            >
              Ga Jadi Ah
            </button>

            <p class="mt-8 text-center text-sm" style="color: #737182">
              Masih bingung ?
              <a
                href="https://api.whatsapp.com/send?phone=6281226809435"
                class="font-medium hover:underline"
                style="color: #2ec49c"
                >Tanya pembuatnya</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <base-dialog
      :show="isLoading()"
      :dissmisable="false"
      @onDismis="hideLoading()"
      ><dialog-loading
    /></base-dialog>
    <base-dialog
      :show="isDialogResult()"
      :dissmisable="true"
      @onDismis="dismiss()"
    >
      <dialog-result
        v-if="isDialogSuccess()"
        :title="'Yeeey...'"
        :message="' Bagus! kamu berhasil nabung nih,mau nabung lagi ?'"
        :positive="'Oke nabung lagi'"
        :negative="'Engga Besok lagi'"
        @onPositive="dismiss()"
        @onNegative="gotoHome()"
        ><div>
          <icon-success /></div
      ></dialog-result>
      <dialog-result
        v-else
        :title="'Yaah..'"
        :message="'Gagal simpan tabugan nih..Hal kaya gini normal sih bisanya si server lagi cape..'"
        :positive="'Oke Coba lagi'"
        :negative="'Yaudah kembali'"
        @onPositive="dismiss()"
        @onNegative="gotoHome()"
        ><div>
          <icon-failed /></div
      ></dialog-result>
    </base-dialog>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useTabungan } from "../data/TabunganState";

import BaseDialog from "../components/DialogBase.vue";
import DialogResult from "../components/DialogResult.vue";
import IconSuccess from "../components/icon/Transfer.vue";
import IconFailed from "../components/icon/NotFound.vue";
import DialogLoading from "../components/DialogLoading.vue";
export default defineComponent({
  components: {
    BaseDialog,
    DialogResult,
    DialogLoading,
    IconSuccess,
    IconFailed,
  },
  setup() {
    return {
      ...useTabungan(),
    };
  },
});
</script>
<style scoped>
.inputFile {
  opacity: 0;
}
</style>
