<template>
  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-300 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      name="fade"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "App",

  setup() {},
});
</script>
<style>
.input-empty-3-6 {
  border: 1px solid #292738;
  background-color: #252332;
  color: #d8d7df;
}
.input-empty-3-6:focus-within {
  border: 1px solid #2ec49c;
  color: #d8d7df;
}
.input-empty-3-6 input::placeholder {
  color: #4e4b62;
}
.input-empty-3-6:focus-within input::placeholder {
  color: #d8d7df;
  outline: none;
}
.input-empty-3-6:focus-within .icon-empty-3-6 path {
  transition: 0.3;
  fill: #2ec49c;
}
.input-empty-3-6 .icon-toggle-empty-3-6 path {
  transition: 0.3;
  fill: #2ec49c;
}
.centered-empty-3-6 {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.width-left-empty-3-6 {
  width: 0%;
}
.width-right-empty-3-6 {
  width: 100%;
}
.forgot-password-empty-3-6 {
  color: #737182;
  transition: 0.3s;
}
.forgot-password-empty-3-6:hover {
  color: #d8d7df;
}
.btn-fill-empty-3-6 {
  background-image: linear-gradient(
    rgba(91, 203, 173, 1),
    rgba(39, 194, 153, 1)
  );
}
.btn-fill-empty-3-6:hover {
  background-image: linear-gradient(#2ec49c, #2ec49c);
}
@media (min-width: 1024px) {
  .width-left-empty-3-6 {
    width: 48%;
  }
  .width-right-empty-3-6 {
    width: 52%;
  }
}
/*
*/
.circle-content-3-3 {
  background-color: #504cee;
}
.caption-content-3-3 {
  color: #999999;
}
.btn-fill-content-3-3 {
  background-color: #504cee;
  transition: 0.3s;
}
.btn-fill-content-3-3:hover {
  background-color: #7370ff;
  transition: 0.3s;
}

/**/
.btn-fill-1-1 {
  background-color: #0ec8f8;
  color: #ffffff;
}
.btn-fill-1-1:hover {
  background-color: #3ad8ff;
  color: #ffffff;
}
nav a.nav-1-1 {
  color: #092a33;
}
nav a.nav-1-1:hover {
  color: #2c3b3f;
  font-weight: 500;
}
#menu-toggle-1-1:checked + #menu-1-1,
#menu-toggle-1-1:checked + #menu-1-1 + #menu-1-1 {
  display: block;
}
</style>
