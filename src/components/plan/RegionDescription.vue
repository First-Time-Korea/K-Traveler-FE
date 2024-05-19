<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { usePlanStore } from "@/stores/plan.js";

const { clickedRegion } = storeToRefs(usePlanStore());
</script>

<template>

    <div class="relative w-10/12 bg-second-50 h-auto flex flex-col overflow-hidden rounded-sm text-gray-700 shadow-md">
        <div class="overflow-hidden">
            <img v-if="clickedRegion.sidoImage" :src="clickedRegion.sidoImage" alt="Region Image"
                class="w-full h-64 object-cover" />
            <img v-else src="@/assets/img/southsouth.jpg" alt="Default Image" class="w-full h-64 object-cover">
        </div>
        <div class="p-6">
            <h4 class="text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">
                {{ clickedRegion.sidoName }}
            </h4>
        </div>
        <div class="flex items-center justify-between p-6">
            <p class="h-52 scroll overflow-y-auto text-base leading-relaxed">
                {{ clickedRegion.sidoDescription }}
            </p>
        </div>
    </div>
</template>

<style></style>
