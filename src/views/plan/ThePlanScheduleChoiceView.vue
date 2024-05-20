<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia"
import { usePlanStore } from "@/stores/plan.js";
import { useScreens } from 'vue-screen-utils';

const planStore = usePlanStore();
const router = useRouter();
const buttonStyle = "fixed bottom-10 inset-x-0 mx-auto w-64 h-10 align-middle select-none font-sans font-bold text-center bg-second-300 uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-second-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"

const { updateSchedule } = planStore;
const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
const columns = mapCurrent({ lg: 2 }, 1);

const date = ref(new Date());
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

watch(() => date.value, (newDate) => {
    if (newDate < datesRange.start || new Date(datesRange.start.getTime()) === new Date(datesRange.end).getTime()) {
        datesRange.start = newDate;
        datesRange.end = Math.max(new Date(datesRange.end.getTime()), new Date(newDate.getTime()));
    } else {
        datesRange.end = newDate;
    }

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
}, { immediate: true });


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
        <h5 class="mt-3 font-mono">Please enter your local travel period</h5>
        <h5 class="font-mono">(Date of Arrival to your destination, Date of Departure to your
            destination).</h5>
        <h5 class="font-mono">Please make your trip up to 10 days</h5>
        <VDatePicker class=" mt-10" v-model="date" mode="date" :attributes="attrs" transparent borderless locale="en"
            :columns="columns" />
    </div>
    <div class="flex justify-center ">
        <button :class="buttonStyle" type="button" @click="goNext()">
            NEXT
        </button>
    </div>
</template>

<style scoped></style>