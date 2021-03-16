<template>
  <section class="h-full w-full px-8 py-20">
    <div
      class="flex lg:flex-row flex-col items-center"
      style="font-family: 'Poppins', sans-serif"
    >
      <!-- Left Column -->
      <div
        class="w-full lg:w-1/2 text-center justify-center flex lg:mb-0 mb-12"
      >
        <img
          id="hero-content-3-3"
          src="http://api.elements.buildwithangga.com/storage/files/2/assets/Content/Content3/Content-3-1.png"
          alt=""
        />
      </div>
      <!-- Right Column -->
      <div
        class="lg:w-1/2 w-full flex flex-col lg:items-start items-center lg:text-left text-center"
      >
        <h2
          class="md:text-4xl text-3xl text-white font-semibold mb-10 tracking-tight"
        >
          Data Diri
        </h2>
        <ul>
          <li class="mb-8">
            <h4
              class="font-medium text-2xl text-white mb-5 flex lg:flex-row flex-col items-center lg:justify-start justify-center"
            >
              {{ UserState.profil.name }}
            </h4>

            <p
              class="text-base leading-7 tracking-wide inline-block sm:hidden caption-content-3-3"
            >
              Tau nggak ? nama kamu keren loh<br />
              Nama kamu berarti suatu doa yang baik.
            </p>
          </li>
          <li class="mb-8">
            <h4
              class="font-medium text-2xl text-white mb-5 flex lg:flex-row flex-col items-center lg:justify-start justify-center"
            >
              {{ UserState.profil.email }}
            </h4>

            <p
              class="text-base leading-7 tracking-wide inline-block sm:hidden caption-content-3-3"
            >
              Email kamu bisa menghubungkan kita berdua :-)
            </p>
          </li>
        </ul>
        <button
          @click="signOut"
          class="mb-6 btn-fill-content-3-3 px-10 py-4 text-base text-white font-semibold rounded-xl cursor-pointer focus:outline-none tracking-wide"
        >
          Keluar
        </button>
        <p
          class="mb-6 text-base leading-7 tracking-wide inline-block sm:hidden caption-content-3-3"
        >
          {{ UserState.profil.uid }}
        </p>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { auth } from "../../services/FirebaseServices";
import { useRouter } from "vue-router";
import { useUser } from "../../data/UserState";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { getProfil, UserState } = useUser();
    onMounted(() => {
      getProfil();
    });
    function signOut() {
      auth.signOut().finally(() => {
        router.replace({ path: "/login" });
      });
    }
    return {
      signOut,
      UserState,
    };
  },
});
</script>
