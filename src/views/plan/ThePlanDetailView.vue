<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPlanDetail, deletePlan } from "@/api/plan";

import PlanDetail from "@/components/plan/PlanDetail.vue";
import PDtatilMap from "@/components/plan/PDetailMap.vue";

const route = useRoute();
const router = useRouter();
const planDetailRef = ref(null);

const isLoading = ref(true); // 데이터 로딩 상태를 추적하는 변수

const planId = ref(route.params.planId);
const planTitle = ref();
const travelPlans = ref({});
const selectedDate = ref();

const buttonStyle =
  "bg-first-300 text-white fixed bottom-10 inset-x-0 mx-auto w-64 h-10 align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

onMounted(async () => {
  try {
    await loadPlanDetails(planId.value); // 비동기 데이터 로드
    isLoading.value = false; // 데이터 로드 완료
    // selectedDate.value = dateRange.startDate;
    //시작 날짜는 start date로 세팅
  } catch (error) {
    console.error("데이터 로딩 중 오류 발생:", error);
    isLoading.value = false; // 에러 발생 시에도 로딩 상태 업데이트
  }
});

const dateRange = computed(() => {
  const dates = Object.keys(travelPlans.value);
  if (dates.length === 0) return { startDate: null, endDate: null };
  const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));
  return {
    startDate: sortedDates[0],
    endDate: sortedDates[sortedDates.length - 1],
  };
});

const loadPlanDetails = async (id) => {
  return getPlanDetail(
    id,
    ({ data }) => {
      planId.value = data.data.planId;
      planTitle.value = data.data.planTitle;
      travelPlans.value = data.data.attractions;
      selectedDate.value = Object.keys(data.data.attractions)[0]; // 첫 번째 날짜를 초기값으로 설정
    },
    (error) => console.log(error)
  );
};

const saveInChild = () => {
  if (planDetailRef.value) {
    planDetailRef.value.finalSave();
  } else {
    console.error("자식 컴포넌트의 참조가 없습니다.");
  }
};

const formatDateString = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  })
    .format(date)
    .replace(/\. /g, ".");
};

const handleDateChange = (newDate) => {
  selectedDate.value = newDate;
};

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete it?')) { // 삭제 확인 대화상자
    goDeletePlan(); // 사용자가 '확인'을 누르면 삭제 실행
  }
};

const goDeletePlan = () => {
  deletePlan(planId.value,
    ({ data }) => {
      if (data.status === "success") {
        console.log("삭제 성공");
        router.replace({ name: "main" });
      }
    }, (error) => {
      console.log(error);
    })
  console.log("The plan has been deleted."); // 실제 삭제 로직으로 교체 필요
};


</script>

<template>
  <!-- 앞서 선택한 정보 -->

  <div v-if="isLoading">Loading...</div>

  <!-- 로딩이 완료되면 자식 컴포넌트 렌더링 -->
  <div v-else>
    <div class="ms-10">
      <h1 class="text-xl font-bold">{{ planTitle }}</h1>
      <h2 class="text-md text- mt-2">
        {{ formatDateString(dateRange.startDate) }} ~ {{ formatDateString(dateRange.endDate) }}
      </h2>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="flex justify-center">
      <div class="flex-1 flex justify-between">
        <PlanDetail @dateChanged="handleDateChange" :plan-title="planTitle" :travel-plans="travelPlans"
          :selected-date="selectedDate" :date-range="dateRange" ref="planDetailRef" class="w-full">
        </PlanDetail>
      </div>
      <div class="flex-1 flex justify-center">
        <PDtatilMap :plan-title="planTitle" :travel-plans="travelPlans" :selected-date="selectedDate"
          :date-range="dateRange" class="w-full">
        </PDtatilMap>
        <button @click="confirmDelete" class="absolute top-0 right-0 mt-5 mr-10">
          <img src="@/assets/img/delete-icon.png" alt="Delete" class="w-8 h-8"> <!-- 이미지 경로와 크기는 예시입니다 -->
        </button>
      </div>
    </div>

    <button @click="saveInChild" :class="buttonStyle" type="button">SAVE</button>
  </div>
</template>

<style scoped></style>
