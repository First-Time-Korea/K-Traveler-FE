<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia"
import { usePlanStore } from "@/stores/plan.js";
import { useScreens } from 'vue-screen-utils';

const planStore = usePlanStore();
const router = useRouter();
const buttonStyle = "fixed bottom-0 left-0 right-0 mx-auto font-sans font-bold uppercase text-center text-xs py-3 px-6 shadow-md transition-all block w-full bg-first-900 text-white hover:bg-first-700 focus:opacity-85 active:opacity-85"

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
    <button @click="goNext()" :class="buttonStyle" type="button">
        NEXT
    </button>
</template>

<style scoped></style>