import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlanStore = defineStore("planStore", () => {
  const clickedRegion = ref({
    sidoCode: "",
    sidoName: "",
    gugunName: "",
    sidoDescription: "",
  });

  const schedule = ref({
    start: null,
    end: null,
  });

  // 여행 장소를 관리할 상태
  const places = ref([]);

  // 다음 단계로 진행할 수 있는지 확인하는 상태
  const canGoNext = ref(false);

  const updateClickedRegion = (region) => {
    clickedRegion.value = region;
    checkCanProceed();
  };

  const updateSchedule = (newSchedule) => {
    schedule.value = newSchedule;
    checkCanProceed();
  };

  const addPlace = (place) => {
    places.value.push(place);
    checkCanProceed();
  };

  const checkCanProceed = () => {
    //TODO: 유효성 검증
    // canGoNext.value =
    //   clickedRegion.value.sidoName !== "" &&
    //   schedule.value.date !== "" &&
    //   places.value.length > 0;
  };

  const submitAllData = () => {
    const fullData = {
      region: clickedRegion.value,
      schedule: schedule.value,
      places: places.value,
    };
    // 여기서 서버로 fullData 전송
    console.log("Submitting data to server:", fullData);
  };

  return {
    clickedRegion,
    schedule,
    places,
    canGoNext,
    updateClickedRegion,
    updateSchedule,
    addPlace,
    submitAllData,
  };
});
