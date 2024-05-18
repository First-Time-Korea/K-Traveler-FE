<script setup>
import { ref } from "vue";

const props = defineProps({
  article: Object,
});

const article = ref(props.article);
</script>

<template>
  <div class="masonry-item">
    <img
      class="masonry-item w-full rounded-lg object-cover object-center"
      :src="article.img.src"
      :alt="article.img.name"
    />
  </div>
</template>

<style>
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
</style>
