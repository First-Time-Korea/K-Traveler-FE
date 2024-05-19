<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { getArticles } from "@/api/board";
import BoardListItem from "@/components/board/item/BoardListItem.vue";

const router = useRouter();
const store = useMemberStore();

onMounted(() => {
  tryGetArticles();
});

const tryGetArticles = () => {
  getArticles(param.value, ({ data }) => {
    articles.value = data.articles;
    currentPage.value = data.currentPage;
    totalPage.value = data.totalPageCount;
  });
};

const articles = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const param = ref({
  pgno: currentPage.value,
  key: "tag",
  word: "",
});

const isWritedWord = computed(() => {
  return param.value.word.length !== 0;
});

const buttonBasicStyle =
  "relative flex-1 align-middle select-none font-sans font-medium text-center uppercase transition-all w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100 shadow-none";

const buttonAbledStyle = "bg-first-300 text-white";

const buttonStyle = computed(() => {
  return isWritedWord.value
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const goBoardWrite = () => {
  if (store.isLogin) {
    router.push({ name: "board-write" });
  } else {
    router.push({ name: "user-login" });
  }
};
</script>

<template>
  <div class="mt-10">
    <!-- 검색창 -->
    <div class="flex justify-center space-x-4">
      <div class="relative h-10 flex-3 min-w-[60px]">
        <select
          class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          v-model="param.key"
        >
          <option value="tag">tag</option>
          <option value="username">username</option>
        </select>
      </div>
      <div class="relative flex-6 min-w-[360px] h-10">
        <input
          class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
          placeholder="USERNAME"
          v-model="param.word"
        />
      </div>
      <button :class="buttonStyle" type="button" @click="tryGetArticles">
        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
      </button>
    </div>

    <!-- 여행 후기 리스트 -->
    <div class="masonry-layout p-10">
      <BoardListItem v-for="article in articles" :key="article.articleId" :article="article" />
    </div>
  </div>

  <!-- 여행 후기 작성 버튼 -->
  <button
    class="fixed bottom-6 right-6 bg-third-300 rounded-full text-white p-3.5 shadow-md shadow-gray-900/20 hover:bg-third-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
    @click="goBoardWrite"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </button>
</template>

<style>
.masonry-layout {
  gap: 1rem;
}

@media (min-width: 600px) {
  .masonry-layout {
    column-count: 2;
  }
}

@media (min-width: 750px) {
  .masonry-layout {
    column-count: 4;
  }
}

@media (min-width: 900px) {
  .masonry-layout {
    column-count: 6;
  }
}
</style>
