import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";

export const usePlanStore = defineStore("planStore", () => {
  const canGoNext = ref(false);

  const clickedRegion = ref({
    sidoName: "No Choice",
    gugunName: "",
    sidoDescription: "",
  });

  const updateClickedRegion = (region) => {
    clickedRegion.value = region;
    canGoNext.value = true;
  };

  return {
    clickedRegion,
    updateClickedRegion,
    canGoNext,
  };
});
