<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAttracionStore } from "@/stores/attraction";

const { VITE_VUE_API_URL } = import.meta.env;

const router = useRouter();
const store = useAttracionStore();

const props = defineProps({
  attraction: Object,
});

const isShowned = ref(false);

const showOverlay = () => {
  isShowned.value = true;
};

const unshowOverlay = () => {
  isShowned.value = false;
};

const attraction = ref({
  bookmarkId: "",
  contentId: "",
  title: "",
  img: {
    src: "",
    alt: "",
  },
});

onMounted(() => {
  attraction.value.bookmarkId = props.attraction.bookmarkId;
  attraction.value.contentId = props.attraction.contentId;
  attraction.value.title = props.attraction.title;

  if (props.attraction.firstImage !== "" && props.attraction.firstImage !== null) {
    attraction.value.img.src = props.attraction.firstImage;
  } else if (props.attraction.firstImage2 !== "" && props.attraction.firstImage2 !== null) {
    attraction.value.img.src = props.attraction.firstImage2;
  } else {
    attraction.value.img.src = "/src/assets/img/no-image.jpg";
  }

  attraction.value.alt = props.attraction.title;
});

const { selectedContentId } = storeToRefs(store);
const goRecommendedAttraction = () => {
  selectedContentId.value = attraction.value.contentId;

  router.push({ name: "attraction" });
};
</script>

<template>
  <div class="hover:cursor-pointer hover:shadow-xl hover:shadow-gray-800/30 transition duration-300 rounded-xl relative"
    @mouseenter="showOverlay" @mouseleave="unshowOverlay" @click="goRecommendedAttraction">
    <img class="object-cover object-center w-full h-56 max-w-full rounded-xl" :src="attraction.img.src"
      :alt="attraction.img.alt" />
    <div
      class="duration-200 absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white object-cover object-center w-full h-56 max-w-full rounded-xl block"
      v-show="isShowned">
      <p class="text-xl font-bold">{{ attraction.title }}</p>
    </div>
  </div>
</template>

<style scoped></style>
