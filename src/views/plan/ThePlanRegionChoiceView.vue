<script setup>
import RegionList from "@/components/plan/RegionList.vue"
import RegionDescription from "@/components/plan/RegionDescription.vue"

import { useRouter } from "vue-router";
import { usePlanStore } from "@/stores/plan.js";

const planStore = usePlanStore();
const router = useRouter();
const buttonStyle = "fixed bottom-0 left-0 right-0 mx-auto font-sans font-bold uppercase text-center text-xs py-3 px-6 shadow-md transition-all block w-full bg-first-900 text-white hover:bg-first-700 focus:opacity-85 active:opacity-85"

const { updateClickedRegion } = planStore;

const goNext = () => {
    router.push({ name: "choice-schedule" })
}

</script>

<template>
    <div class="flex justify-center ">
        <div class="flex-1 flex justify-center mt-5">
            <RegionList class="w-full"></RegionList>
        </div>
        <div class="flex-1 flex justify-center mt-5">
            <RegionDescription class="w-full"></RegionDescription>
        </div>
    </div>
    <button @click="goNext()" :class="buttonStyle" type="button">
        NEXT
    </button>
</template>

<style></style>