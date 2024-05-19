<script setup>
import BoardFormItem from "@/components/board/item/BoardFormItem.vue";
</script>

<template>
  <div>
    <!-- 뒤로 가기 버튼 -->
    <button
      class="mt-6 ml-6 flex justify-center items-center relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-8 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
      type="button"
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
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </button>

    <div class="mt-4 mb-20">
      <BoardFormItem />
    </div>
  </div>
</template>

<style></style>
