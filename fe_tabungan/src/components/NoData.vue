<template>
  <section
    class="h-full w-full border-box lg:px-24 md:px-16 sm:px-8 px-8 sm:pt-32 pt-20 sm:pb-32 pb-20 transition-all duration-500 linear"
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
        <img
          class="sm:w-auto w-5/6 mb-10 object-cover object-center"
          src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-4.png"
          alt=""
        />
        <div class="text-center w-full">
          <h1 class="text-3xl text-white mb-3 font-semibold tracking-wide">
            {{ props.title }}
          </h1>
          <p
            class="lg-show-empty-3-2 mb-12 text-base tracking-wide leading-7"
            style="color: #504f5e"
          >
            {{ props.text }}
          </p>

          <div class="flex justify-center">
            <router-link
              :to="props.link"
              class="btn-empty-3-2 inline-flex font-semibold text-white text-lg leading-7 py-4 px-8 rounded-xl focus:outline-none hover:shadow-lg"
            >
              {{ props.button }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: {
    onButton: (payload: any) => {
      return payload;
    },
  },
  props: {
    title: { type: String, default: "hai" },
    text: { type: String, default: "wllw" },
    button: { type: String, default: "Oke" },
    link: {
      type: String,
      default: "/main/dashboard",
    },
  },
  setup(props, { emit }) {
    function onButtonClicked() {
      emit("onButton", true);
    }
    return {
      props,
      onButtonClicked,
    };
  },
});
</script>
