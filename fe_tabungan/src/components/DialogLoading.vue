<template>
  <section
    class="h-full w-full border-box lg:px-24 md:px-16 sm:px-8 px-8 sm:pt-5 pt-5 sm:pb-32 pb-20 transition-all duration-500 linear"
    style="
      background-image: linear-gradient(
        to bottom,
        rgba(31, 29, 43, 1),
        rgba(39, 37, 53, 1)
      );
    "
  >
    <div style="font-family: 'Poppins', sans-serif">
      <div class="container mx-auto flex items-center justify-center flex-col">
        <Image
          class="sm:w-auto w-5/6 mb-2.5 object-cover object-center animate-bounce"
        />

        <div class="text-center w-full">
          <h1 class="text-3xl text-white mb-3 font-semibold tracking-wide">
            Tunggu yaaa....
          </h1>

          <p
            class="lg-hide-empty-3-2 mb-12 text-base tracking-wide leading-7"
            style="color: #504f5e"
          >
            Lagi simpen data ke server nih..tunggu bentar
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Image from "./icon/Processing.vue";

export default defineComponent({
  components: {
    Image,
  },
  setup() {},
});
</script>
