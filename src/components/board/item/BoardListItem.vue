<script setup>
import { ref } from "vue";

const { VITE_VUE_API_URL } = import.meta.env;

const props = defineProps({
  article: Object,
});

const article = ref(props.article);

const imgSrc = ref(`${VITE_VUE_API_URL}/article/img/${article.value.img.src}`);
</script>

<template>
  <div class="masonry-item">
    <img
      class="masonry-item w-full rounded-lg object-cover object-center"
      :src="imgSrc"
      :alt="article.img.fileName"
    />
  </div>
</template>

<style>
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
</style>
