<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { getArticle } from "@/api/board";
import CommentListItem from "@/components/board/item/CommentListItem.vue";
import "@/assets/css/common.css";

const route = useRoute();
const router = useRouter();

const store = useBoardStore();

const { VITE_VUE_API_URL } = import.meta.env;

const article = ref({
  id: "",
  memberId: "",
  content: "",
  time: "",
  hit: 0,
  img: {
    src: "",
    name: "",
  },
});

const comments = ref();

const imgSrc = ref();

onMounted(() => {
  tryGetArticle();
});

const tryGetArticle = () => {
  getArticle(
    route.params.articleid,
    ({ data }) => {
      article.value.id = data.article.id;
      article.value.memberId = data.article.memberId;
      article.value.content = data.article.content;
      if (data.article.createdTime === data.article.modifiedTime) {
        article.value.time = data.article.createdTime;
      } else {
        article.value.time = `${data.article.modifiedTime} (modified)`;
      }
      article.value.hit = data.article.hit;
      article.value.img.src = `${data.article.file.saveFolder}/${data.article.file.saveFile}`;
      let index = data.article.file.originFile.indexOf(".");

      if (index !== -1) {
        article.value.img.name = data.article.file.originFile.slice(0, index);
      } else {
        article.value.img.name = data.article.file.originFile;
      }

      imgSrc.value = `${VITE_VUE_API_URL}/article/img/${article.value.img.src}`;

      comments.value = data.article.comments;
    },
    (error) => {
      console.log(error);
      alert("여행 후기 조회하기 실패...");
    }
  );
};

const leftBody = ref(null);
const isShowedCommentList = ref(false);
const commentListHeight = computed(() => {
  if (leftBody.value === null) {
    return;
  } else {
    let result = (leftBody.value.clientHeight / 100) * 90;
    isShowedCommentList.value = true;
    return result;
  }
});
const commentListStyle = computed(() => {
  return {
    height: `${commentListHeight.value}px`,
  };
});

const goModify = () => {
  router.push({ name: "board-modify", params: { articleid: article.id } });
};
</script>

<template>
  <div class="flex justify-center">
    <div
      class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl card-width min-h-[200px]"
    >
      <div class="flex flex-row p-2">
        <!-- 여행 후기 자세한 정보 -->
        <div class="flex-1 m-4" ref="leftBody">
          <img
            class="w-full rounded-lg object-cover object-center"
            :src="imgSrc"
            :alt="article.img.fileName"
          />
          <div class="flex mt-5">
            <h6
              class="mr-2 flex-none w-3/10 block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-inherit"
            >
              {{ article.memberId }}
            </h6>
            <p
              class="flex-auto w-7/10 block font-sans text-sm antialiased font-normal leading-relaxed text-inherit"
            >
              {{ article.content }}
            </p>
          </div>
          <div class="text-right mt-4">
            <p class="block font-sans text-xs antialiased font-light leading-normal text-inherit">
              {{ article.time }}
            </p>
          </div>

          <!-- 수정 & 삭제 버튼 -->
          <div class="flex justify-end mt-4">
            <button
              class="mr-1 flex justify-center items-center relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-8 max-h-[40px] rounded-lg text-xs text-blue-500 hover:bg-blue-700/10 active:bg-blue-700/20"
              type="button"
              @click="goModify"
            >
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              class="flex justify-center items-center relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-8 max-h-[40px] rounded-lg text-xs text-red-500 hover:bg-red-700/10 active:bg-red-700/20"
              type="button"
              @click="goBack"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 여행 후기 댓글 -->
        <div class="flex-1 m-4 flex flex-col justify-between">
          <!-- 댓글 리스트 -->
          <div
            class="overflow-y-auto scroll"
            :style="commentListStyle"
            v-show="isShowedCommentList"
          >
            <CommentListItem v-for="comment in comments" :key="comment.id" />
          </div>

          <div>
            <div class="relative ml-4 mr-2 h-10">
              <div
                class="hover:cursor-pointer absolute grid w-5 h-5 place-items-center top-2/4 right-3 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
                  />
                </svg>
              </div>
              <input
                class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-width {
  width: 60%;
}
</style>
