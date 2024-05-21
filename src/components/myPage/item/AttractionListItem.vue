<script setup>
import { ref } from "vue";

const isShowned = ref(false);

const showOverlay = () => {
  isShowned.value = true;
};

const unshowOverlay = () => {
  isShowned.value = false;
};
</script>

<template>
  <div
    class="hover:cursor-pointer hover:shadow-xl hover:shadow-gray-800/30 transition duration-300 rounded-xl relative"
    @mouseenter="showOverlay"
    @mouseleave="unshowOverlay"
  >
    <img
      class="object-cover object-center w-full h-56 max-w-full rounded-xl"
      src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
      alt="nature image"
    />
    <div
      class="duration-200 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white object-cover object-center w-full h-56 max-w-full rounded-xl block"
      v-show="isShowned"
    >
      <p class="text-xl font-bold">attraction name</p>
    </div>
  </div>
</template>

<style scoped></style>
