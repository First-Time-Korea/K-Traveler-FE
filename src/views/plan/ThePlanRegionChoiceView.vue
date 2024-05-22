<script setup>
import RegionList from "@/components/plan/RegionList.vue";
import RegionDescription from "@/components/plan/RegionDescription.vue";

import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePlanStore } from "@/stores/plan.js";

const planStore = usePlanStore();
const router = useRouter();
const buttonBasicStyle =
  "fixed bottom-10 inset-x-0 mx-auto w-64 h-10 align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const buttonAbledStyle = "bg-first-300 text-white";

const buttonStyle = computed(() => {
  return canGoNext.value
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const { updateClickedRegion } = planStore;

const canGoNext = ref(false);
const handleClickRegionEvent = (clickedRegion) => {
  canGoNext.value = true;
  updateClickedRegion(clickedRegion);
};

const goNext = () => {
  router.push({ name: "choice-schedule" });
};
</script>

<template>
  <div class="flex justify-center">
    <div class="flex-1 flex justify-center mt-5">
      <RegionList class="w-full" @click-region-event="handleClickRegionEvent"></RegionList>
    </div>
    <div class="flex-1 flex justify-center mt-5">
      <RegionDescription class="w-full"></RegionDescription>
    </div>
  </div>
  <div class="flex justify-center">
    <button :class="buttonStyle" type="button" @click="goNext()">NEXT</button>
  </div>
</template>

<style></style>
