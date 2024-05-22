import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getPlanDetail } from "@/api/plan";

export const usePlanDetailStore = defineStore("planDetailStore", () => {
  const planId = ref(null);
  const planTitle = ref();
  const travelPlans = ref({});
  const selectedDate = ref();

  const loadPlanDetails = async (id) => {
    return getPlanDetail(
      id,
      ({ data }) => {
        console.log("디테일 함수 내부(store)!!!!!!!!!!!!!", data.data);
        planId.value = data.data.planId;
        planTitle.value = data.data.planTitle;
        travelPlans.value = data.data.attractions;
        selectedDate.value = Object.keys(data.data.attractions)[0]; // 첫 번째 날짜를 초기값으로 설정

        console.log(dateRange.value[0]);
        console.log("date", selectedDate.value);
        console.log("places", travelPlans.value);
        console.log("placese[date]", travelPlans.value[selectedDate.value]);

        console.log("");

        alert(selectedDate.value);
      },
      (error) => console.log(error)
    );
  };

  const clearData = () => {
    planId.value = null;
    planTitle.value = null;
    travelPlans.value = {};
    selectedDate.value = null;
  };

  const dateRange = computed(() => {
    const dates = Object.keys(travelPlans.value);
    console.log(dates);
    if (dates.length === 0) return { startDate: null, endDate: null };
    const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));
    return {
      startDate: sortedDates[0],
      endDate: sortedDates[sortedDates.length - 1],
    };
  });

  return {
    planId,
    planTitle,
    travelPlans,
    selectedDate,
    loadPlanDetails,
    dateRange,
    clearData,
  };
});
