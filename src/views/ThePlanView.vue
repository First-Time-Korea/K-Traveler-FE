<script setup>
import { computed } from "vue";
import ThePlanRegionChoiceView from "@/views/plan/ThePlanRegionChoiceView.vue";
import { usePlanStore } from "@/stores/plan.js";
import { storeToRefs } from "pinia";

const { clickedRegion } = storeToRefs(usePlanStore());

// 버튼의 기본 스타일
const buttonBasicStyle = "fixed bottom-0 left-0 right-0 mx-auto font-sans font-bold uppercase text-center text-xs py-3 px-6 shadow-md transition-all block w-full";

// 활성화 스타일
const buttonEnabledStyle = "bg-first-900 text-white hover:bg-first-700 focus:opacity-85 active:opacity-85";

// 비활성화 스타일
const buttonDisabledStyle = "bg-first-900 text-gray-300 cursor-not-allowed";

// 버튼 스타일을 계산하여 적용
const buttonStyle = computed(() => {
    return clickedRegion.value.sidoName !== ""
        ? `${buttonBasicStyle} ${buttonEnabledStyle}`
        : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});
</script>

<template>
    <div class="relative">
        <ThePlanRegionChoiceView class="mt-20"></ThePlanRegionChoiceView>
        <!-- 버튼에 동적 클래스 바인딩 -->
        <button :class="buttonStyle" type="button">
            NEXT
        </button>
    </div>
</template>

<style scoped>
/* 여기에 필요한 추가 스타일을 적용 */
</style>
