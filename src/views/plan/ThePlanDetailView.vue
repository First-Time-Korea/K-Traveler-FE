<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import PlanDetail from "@/components/plan/PlanDetail.vue";
import PDtatilMap from "@/components/plan/PDetailMap.vue";
import { updateMemo } from "@/api/plan.js"; // import updateMemo function

import { storeToRefs } from "pinia";
import { usePlanDetailStore } from "@/stores/planDetail.js";
const route = useRoute();
const router = useRouter();
const planId = ref(route.params.planId);
const planDetailStore = usePlanDetailStore();
const { planTitle,
    travelPlans,
    selectedDate, dateRange } = storeToRefs(planDetailStore);

onMounted(() => {
    planDetailStore.loadPlanDetails(planId.value);
})

onUnmounted(() => {
    planDetailStore.clearData();
})

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
    <div class="ms-5">
        <h1 class="text-xl font-bold">{{ planTitle }}</h1>
        <h2 class="text-md text- mt-2"> {{ formatDateString(dateRange.startDate) }} ~ {{
            formatDateString(dateRange.endDate) }}</h2>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="flex justify-center ">
        <div class="flex-1 flex justify-between">
            <PlanDetail class="w-full"></PlanDetail>
        </div>
        <div class="flex-1 flex justify-center ">
            <PDtatilMap class="w-full">
            </PDtatilMap>
        </div>
    </div>

</template>

<style scoped></style>