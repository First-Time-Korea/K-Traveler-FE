<script setup>
import { ref } from "vue";
import { useBoardStore } from "@/stores/board";

const store = useBoardStore();

const { VITE_VUE_API_URL } = import.meta.env;

const article = ref(store.article);

const imgSrc = ref(`${VITE_VUE_API_URL}/article/img/${article.value.img.src}`);
</script>

<template>
  <div class="flex justify-center h-screen">
    <div
      class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
    >
      <div class="flex flex-row h-full">
        <!-- 여행 후기 자세한 정보 -->
        <div class="flex-1 m-4">
          <img
            class="w-full rounded-lg object-cover object-center"
            :src="imgSrc"
            :alt="article.img.fileName"
          />
          <div class="flex mt-5">
            <h6
              class="mr-2 flex-none w-3/10 block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-inherit"
            >
              사용자 이름
            </h6>
            <p
              class="flex-auto w-7/10 block font-sans text-sm antialiased font-normal leading-relaxed text-inherit"
            >
              Material Tailwind is an easy to use components library for Tailwind CSS and Material
              Design. It provides a simple way to customize your components, you can change the
              colors, fonts, breakpoints and everything you need.
            </p>
          </div>
          <div class="text-right mt-4">
            <p class="block font-sans text-xs antialiased font-light leading-normal text-inherit">
              2024.05.20
            </p>
          </div>

          <!-- 수정 & 삭제 버튼 -->
          <div class="flex justify-end mt-4">
            <button
              class="mr-1 flex justify-center items-center relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-8 max-h-[40px] rounded-lg text-xs text-blue-500 hover:bg-blue-700/10 active:bg-blue-700/20"
              type="button"
              @click="goBack"
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
      </div>
    </div>
  </div>
</template>

<style scoped></style>
