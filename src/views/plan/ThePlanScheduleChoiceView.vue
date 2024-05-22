<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia"
import { usePlanStore } from "@/stores/plan.js";
import { useScreens } from 'vue-screen-utils';

const planStore = usePlanStore();
const router = useRouter();
const buttonStyle = "fixed bottom-10 inset-x-0 mx-auto w-64 h-10 align-middle select-none font-bold text-center bg-second-300 uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-second-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"

const { updateSchedule } = planStore;
const { mapCurrent } = useScreens();
const calendarStyle = ref(mapCurrent({
    xl: { width: '800px', height: '400px' },
    lg: { width: '700px', height: '350' },
    md: { width: '600px', height: '300' },
    sm: { width: '500px', height: '250' },
    xs: { width: '400px', height: '200' }
}, { width: '100%' }));
const columns = mapCurrent({ xl: 2 }, 1);

const date = ref(null);
const dateSelectionCount = ref(0);

const datesRange = reactive({
    start: new Date(),
    end: new Date(),
})

const attrs = ref([
    {
        key: 'selectedRange',
        highlight: true,
        dates: {
            start: datesRange.start,
            end: datesRange.end
        },
    }
]);

onMounted(() => {
    datesRange.start = new Date();
    datesRange.end = new Date();
    dateSelectionCount.value = 0;  // 클릭 카운터 리셋
})

watch(() => date.value, (newDate) => {
    console.log(dateSelectionCount.value);
    if (!newDate) return;
    if (dateSelectionCount.value == 0) {
        datesRange.start = newDate;
        datesRange.end = newDate;
        dateSelectionCount.value++;
    } else if (dateSelectionCount.value == 1) {
        if (newDate < datesRange.start) {
            datesRange.end = datesRange.start;
            datesRange.start = newDate;
        } else {
            datesRange.end = newDate;
        }
        dateSelectionCount.value++;
        attrs.value = [
            {
                key: 'selectedRange',
                highlight: 'gray',
                dates: {
                    start: datesRange.start,
                    end: datesRange.end
                },
            }
        ]
    }
});

const resetDates = () => {
    datesRange.start = null;
    datesRange.end = null;
    date.value = null;  // 날짜 선택기의 모델을 null로 설정
    dateSelectionCount.value = 0;  // 클릭 카운터 리셋
    attrs.value = [];  // 하이라이트를 제거
};

const goNext = () => {
    updateSchedule({
        start: datesRange.start,
        end: datesRange.end,
    });
    router.push({ name: "choice-attraction" })
}
</script>

<template>
    <div class="flex flex-col items-center jusify-center mt-36">
        <h4 class="text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">How long is your trip?</h4>
        <h5 class="mt-3 ">Please enter your local travel period</h5>
        <h5 class="">(Date of Arrival to your destination, Date of Departure to your
            destination).</h5>
        <h5 class="">Please make your trip up to 10 days</h5>
        <div class="flex flex-col">
            <button class="mt-5 ml-auto italic mr-10 text-first-700" @click="resetDates">Reset</button>
            <VDatePicker class="calendar mt-5" v-model="date" mode="date" :attributes="attrs" transparent borderless
                locale="en" :columns="columns" :style="calendarStyle" />
        </div>
    </div>
    <div class="flex justify-center ">
        <button :class="buttonStyle" type="button" @click="goNext()">
            NEXT
        </button>
    </div>
</template>

<style scoped>
.calendar-container {
    position: relative;
    width: 100%;
    /* Adjust based on your layout needs */
    max-width: 800px;
    /* This should match the max-width of your calendar for alignment */
}

.reset-button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 14px;
    color: #333;
    border-radius: 10%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.calendar {
    width: 100%;
}
</style>