import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlanStore = defineStore("planStore", () => {
  const clickedRegion = ref({
    sidoCode: "",
    sidoName: "",
    sidoDescription: "",
  });

  const schedule = ref({
    start: null,
    end: null,
  });

  // 여행 장소를 관리할 상태
  const places = ref({
    // 찜한 관광지 (key:날짜.toISOString, value:관광지[])
  });

  const clickedDate = ref();

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

  const addPlace = (dateString, attraction) => {
    const updatedPlaces = { ...places.value };
    if (!updatedPlaces[dateString]) {
      updatedPlaces[dateString] = [];
    }
    updatedPlaces[dateString].push(attraction);
    places.value = updatedPlaces;
    checkCanProceed();
  };

  const deletePlace = (dateString, attraction) => {
    const deletedPlaces = places.value[dateString].filter(
      (attr) => attr.contentId != attraction.contentId
    );
    places.value[dateString] = deletedPlaces;
    console.log("여행지 삭제", places);
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
    deletePlace,
    clickedDate,
  };
});
