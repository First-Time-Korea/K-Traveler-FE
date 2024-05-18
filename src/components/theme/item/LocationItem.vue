<script setup>
import { ref } from "vue";

const props = defineProps({
  location: Object,
});

const img = ref(props.location.img);

const isShowned = ref(false);

const showOverlay = () => {
  isShowned.value = true;
};

const unshowOverlay = () => {
  isShowned.value = false;
};
</script>

<template>
  <div class="relative" @mouseenter="showOverlay" @mouseleave="unshowOverlay">
    <img
      class="object-cover object-center w-full h-40 max-w-full rounded-lg"
      :src="img.src"
      :alt="img.alt"
    />
    <div
      class="duration-200 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white object-cover object-center w-full h-40 max-w-full rounded-lg block"
      v-show="isShowned"
    >
      <p class="text-xl font-bold">{{ img.alt }}</p>
    </div>
  </div>
</template>

<style scoped></style>
