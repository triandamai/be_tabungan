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
        <slot
          ><Transfer class="sm:w-auto w-5/6 mb-2.5 object-cover object-center"
        /></slot>

        <div class="text-center w-full">
          <slot name="title"
            ><h1 class="text-3xl text-white mb-3 font-semibold tracking-wide">
              {{ props.title }}
            </h1></slot
          >

          <p
            class="lg-hide-empty-3-2 mb-12 text-base tracking-wide leading-7"
            style="color: #504f5e"
          >
            {{ props.message }}
          </p>
          <div class="flex justify-center">
            <button
              @click="onButtonClicked('onPositive')"
              class="btn-empty-3-2 inline-flex font-semibold text-white text-lg leading-7 py-4 px-8 rounded-xl focus:outline-none hover:shadow-lg"
            >
              {{ props.positive }}
            </button>
          </div>
          <div class="flex justify-center">
            <button
              @click="onButtonClicked('onNegative')"
              class="text-green-200 btn-empty-3-2 inline-flex font-semiboldtext-lg leading-7 py-4 px-8 rounded-xl focus:outline-none hover:shadow-lg"
            >
              {{ props.negative }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Transfer from "./icon/Transfer.vue";
export default defineComponent({
  components: {
    Transfer,
  },
  props: {
    title: {
      type: String,
      default: "Judul",
    },
    message: { type: String, default: "Judul" },
    positive: { type: String, default: "Judul" },
    negative: { type: String, default: "Judul" },
  },
  emits: {
    onPositive: (payload: any) => {
      return payload;
    },
    onNegative: (payload: any) => {
      return payload;
    },
  },
  setup(props, { emit }) {
    function onButtonClicked(type: any) {
      emit(type, true);
    }
    return {
      onButtonClicked,
      props,
    };
  },
});
</script>
