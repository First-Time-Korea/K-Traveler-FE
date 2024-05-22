<script setup>
import { computed, ref, onMounted } from "vue";

import PageNavigationButtonItem from "@/components/myPage/item/PageNavigationButtonItem.vue";

const props = defineProps({
  currentPage: Number,
  totalPageCount: Number,
});

const emit = defineEmits(["changeCurrentPageEvent"]);

const pageSize = 10;

const start = computed(() => {
  return parseInt((props.currentPage - 1) / pageSize) * pageSize + 1;
});

const end = computed(() => {
  let end = parseInt((props.currentPage - 1) / pageSize) * pageSize + pageSize;
  return props.totalPageCount < end ? props.totalPageCount : end;
});

const makeButtons = (start, end) => {
  let buttons = [];

  for (let i = start; i <= end; i++) {
    buttons.push({
      value: i,
      isClicked: props.currentPage === i,
    });
  }

  return buttons;
};

const isDisabledPreButton = computed(() => {
  return props.currentPage <= pageSize;
});

const goPre = () => {
  emit("changeCurrentPageEvent", props.current - 1);

  scrollToTop();
};

const isDisabledNextButton = computed(() => {
  return parseInt((props.totalPageCount - 1) / pageSize) * pageSize < props.currentPage;
});

const goNext = () => {
  emit("changeCurrentPageEvent", props.current + 1);

  scrollToTop();
};

const handleClickEvnent = (pageNo) => {
  emit("changeCurrentPageEvent", pageNo);

  scrollToTop();
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <div class="flex items-center gap-4">
    <button
      class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      :disabled="isDisabledPreButton"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        ></path>
      </svg>
      Previous
    </button>
    <div class="flex items-center gap-2">
      <PageNavigationButtonItem
        v-for="button in makeButtons(start, end)"
        :key="button.value"
        :value="button.value"
        :isClicked="button.isClicked"
        @click-event="handleClickEvnent"
      />
    </div>
    <button
      class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      :disabled="isDisabledNextButton"
    >
      Next
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        ></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.card-width {
  width: 60%;
}
</style>
