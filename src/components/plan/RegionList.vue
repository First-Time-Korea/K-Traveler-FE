<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { usePlanStore } from "@/stores/plan.js";
import { getRegions } from "@/api/plan.js";
const { updateClickedRegion } = usePlanStore();

const keyword = ref();
const regions = ref([]);
const filteredRegions = ref([]);
// const { clickedRegion } = storeToRefs(usePlanStore);

onMounted(() => {
    setRegions();
})

const setRegions = () => {
    getRegions(({ data }) => {
        regions.value = data.data;
        console.log(regions.value); //전체 지역
    }, (error) => console.log(error))
}

const handleRegionClick = (region) => {
    updateClickedRegion(region);
}

watch(() => keyword.value, (newKeyword) => {
    filteredRegions.value = regions.value.filter(region =>
        region.sidoName.toLowerCase().includes(newKeyword.toLowerCase()) ||
        region.gugunName.toLowerCase().includes(newKeyword.toLowerCase())
    ).slice(0, 10);
});

</script>

<template>
    <div class="flex flex-col items-center mt-10">
        <div class="relative h-11 w-3/4 min-w-[200px] mb-5">
            <input placeholder="Standard" v-model="keyword"
                class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
            <label
                class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Which part of Korea do you want to travel to?
            </label>
        </div>
        <!-- keyword가 포함된 항목만 출력한다. -->
        <div
            class="mb-1 relative flex flex-col shadow-md text-gray-700 bg-white border-solid w-3/4 rounded-xl bg-clip-border ">
            <nav class="flex min-w-[240px] flex-col gap-1 p-2  text-base font-normal text-blue-gray-700">
                <div role="button" v-for="(region, index) in filteredRegions" :key="index"
                    class="flex items-center w-full p-2.5 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    @click="handleRegionClick(region)">
                    {{ region.sidoName }} {{ region.gugunName }}
                </div>
            </nav>
        </div>
    </div>
</template>

<style></style>
