<script setup>
import AttracionListVue from "@/components/plan/AttractionListVue.vue"
import PMap from "@/components/plan/PMap.vue"

import { usePlanStore } from "@/stores/plan.js";
import { useMemberStore } from "@/stores/member"
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const planStore = usePlanStore();
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const { clickedRegion, schedule } = storeToRefs(planStore);

const goNext = () => {
    // 모달 띄우기
    // router.push({ name: "choice-schedule" })
}

onMounted(() => {
    console.log("ThePlanAttractionCoiceView");
    console.log(schedule);
    console.log(clickedRegion);
    console.log(userInfo);
})

const buttonStyle = "fixed bottom-0 left-0 right-0 mx-auto font-sans font-bold uppercase text-center text-xs py-3 px-6 shadow-md transition-all block w-full bg-first-900 text-white hover:bg-first-700 focus:opacity-85 active:opacity-85"

</script>

<template>
    <div class="flex justify-center ">
        <div class="flex-1 flex justify-between">
            <AttracionListVue class="w-full">
            </AttracionListVue>
        </div>
        <div class="flex-1 flex justify-center ">
            <PMap class="w-full">
            </PMap>
        </div>
    </div>
    <button @click="goNext()" :class="buttonStyle" type="button">
        NEXT
    </button>
</template>

<style></style>