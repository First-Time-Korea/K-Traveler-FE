<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board";

const router = useRouter();
const store = useBoardStore();

const { VITE_VUE_API_URL } = import.meta.env;

const props = defineProps({
  article: Object,
});

const a = ref(props.article);

const imgSrc = ref(`${VITE_VUE_API_URL}/article/img/${a.value.img.src}`);

const { article } = storeToRefs(store);
const goArticleDetail = () => {
  router.push({ name: "board-detail", params: { articleid: a.value.articleId } });
  article.value = a.value;
};
</script>

<template>
  <div class="masonry-item hover:cursor-pointer" @click="goArticleDetail">
    <img
      class="masonry-item w-full rounded-lg object-cover object-center"
      :src="imgSrc"
      :alt="a.img.fileName"
    />
  </div>
</template>

<style>
.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}
</style>
