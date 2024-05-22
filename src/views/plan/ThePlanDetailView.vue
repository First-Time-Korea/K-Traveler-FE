<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getPlanDetail, updateMemo } from "@/api/plan";

import PlanDetail from "@/components/plan/PlanDetail.vue";
import PDtatilMap from "@/components/plan/PDetailMap.vue";

const route = useRoute();
const router = useRouter();
const planDetailRef = ref(null);

const isLoading = ref(true);  // 데이터 로딩 상태를 추적하는 변수

const planId = ref(route.params.planId);
const planTitle = ref();
const travelPlans = ref({});
const selectedDate = ref();

onMounted(async () => {
    try {
        await loadPlanDetails(planId.value);  // 비동기 데이터 로드
        isLoading.value = false;  // 데이터 로드 완료
    } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
        isLoading.value = false;  // 에러 발생 시에도 로딩 상태 업데이트
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
}
)

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

const saveInChild = () => {
    if (planDetailRef.value) {
        planDetailRef.value.finalSave();
    } else {
        console.error('자식 컴포넌트의 참조가 없습니다.');
    }
};

const formatDateString = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short'
    }).format(date).replace(/\. /g, '.');
};

const buttonStyle = "fixed bottom-10 inset-x-0 mx-auto w-64 h-10 align-middle select-none font-bold text-center bg-second-300 uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-second-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"

</script>

<template>
    <!-- 앞서 선택한 정보 -->

    <div v-if="isLoading">
        Loading...
    </div>

    <!-- 로딩이 완료되면 자식 컴포넌트 렌더링 -->
    <div v-else>
        <div class="ms-5">
            <h1 class="text-xl font-bold">{{ planTitle }}</h1>
            <h2 class="text-md text- mt-2"> {{ formatDateString(dateRange.startDate) }} ~ {{
                formatDateString(dateRange.endDate) }}</h2>
        </div>

        <!-- 메인 컨텐츠 -->
        <div class="flex justify-center ">
            <div class="flex-1 flex justify-between">
                <PlanDetail :plan-title="planTitle" :travel-plans="travelPlans" :selected-date="selectedDate"
                    :date-range="dateRange" ref="planDetailRef" class="w-full"></PlanDetail>
            </div>
            <div class="flex-1 flex justify-center ">
                <PDtatilMap :plan-title="planTitle" :travel-plans="travelPlans" :selected-date="selectedDate"
                    :date-range="dateRange" class="w-full">
                </PDtatilMap>
            </div>
        </div>

        <!-- 다음 버튼 (누르면 모달 창이 뜬다.) -->
        <button @click="saveInChild" :class="buttonStyle" type="button">
            SAVE
        </button>
    </div>


</template>

<style scoped></style>