<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAttracionStore } from "@/stores/attraction";
import { useThemeTestStore } from "@/stores/themeTest";

const router = useRouter();

const attractionStore = useAttracionStore();
const themeStore = useThemeTestStore();

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

const { selectedSidoCode } = storeToRefs(attractionStore);
const { selectedThemeCode } = storeToRefs(attractionStore);
const goAttraction = () => {
  selectedSidoCode.value = props.location.code;
  selectedThemeCode.value = themeStore.maxThemeCode;

  router.push({ name: "attraction" });
};
</script>

<template>
  <div
    class="hover:cursor-pointer hover:shadow-xl hover:shadow-gray-800/30 transition duration-300 rounded-xl relative"
    @mouseenter="showOverlay"
    @mouseleave="unshowOverlay"
    @click="goAttraction"
  >
    <img
      class="object-cover object-center w-full h-44 max-w-full rounded-xl"
      :src="img.src"
      :alt="img.alt"
    />
    <div
      class="duration-200 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white object-cover object-center w-full h-44 max-w-full rounded-xl block"
      v-show="isShowned"
    >
      <p class="text-xl font-bold">{{ img.alt }}</p>
    </div>
  </div>
</template>

<style scoped></style>
