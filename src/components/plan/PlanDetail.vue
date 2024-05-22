<script setup>
import { onMounted, ref, computed, watch, onUnmounted } from 'vue';
import { storeToRefs } from "pinia";
import { usePlanDetailStore } from "@/stores/planDetail.js";
import { updateMemo } from "@/api/plan";

const planDetailStore = usePlanDetailStore();
const { planTitle,
    travelPlans,
    selectedDate, dateRange } = storeToRefs(planDetailStore);

function changeDate(date) { //날짜 변경
    selectedDate.value = date;
}

const updatedMemos = ref({});

function openModal(attraction, index) {
    currentMemo.value = attraction.memoText;
    currentAttractionIndex.value = index;
    isModalVisible.value = true;
}

const togleModal = () => {
    isModalVisible.value = !isModalVisible.value;
}

function saveMemo() {
    console.log(currentAttractionIndex.value);
    if (currentAttractionIndex.value !== null) {
        travelPlans.value[selectedDate.value][currentAttractionIndex.value].memoText = currentMemo.value;
    }
    console.log(travelPlans.value[selectedDate.value][currentAttractionIndex.value]);
    console.log(currentMemo);
    isModalVisible.value = false;

    const paaId = travelPlans.value[selectedDate.value][currentAttractionIndex.value].paaId;
    updatedMemos.value[paaId] = currentMemo.value;
}


function finalSave() {
    console.log(updatedMemos);
    const memosArray = Object.keys(updatedMemos.value).map(key => ({
        planAndAttractionId: parseInt(key),
        text: updatedMemos.value[key]
    }));

    // console.log("updatedMemos[key]", updatedMemos[key]);

    const requestData = { memos: memosArray };
    console.log("requestData", requestData);
    updateMemo(requestData,
        (response) => {
            console.log("Memo updated successfully:", response);
        },
        (error) => {
            console.error("Error updating memo:", error);
        }
    );
}

//날짜 변경
watch(() => selectedDate.value, (newDate) => {
});

const isModalVisible = ref(false);
const currentMemo = ref('');
const currentAttractionIndex = ref(null);

import defaultImg from '@/assets/img/southsouth.jpg'; // 이미지 경로를 import 문으로 불러옴

</script>

<template>
    <div class="flex justify-center me-10 ms-5 mt-5 w-full">
        <!-- 날짜 선택 -->
        <div class="flex flex-col px-4 pt-1 w-1/4 divide-y divide-gray-800"> <!-- w-1/4 클래스 추가 --> <button
                v-for="date in dateRange" :key="date" @click=" changeDate(date)"
                class="mt-2 select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                :class="{
                    'select-none rounded-lg border border-second-900 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none': true,
                    'bg-second-900 text-white': selectedDate === date
                }" type="button">
                {{ new Date(date).toLocaleDateString('en-US', { month: 'long', day: '2-digit' }) }}
            </button>
        </div>

        <div class="scrollable-container custom-scroll w-3/4  ">
            <div class=" flex bg-white mb-2 p-2 rounded-lg relative hover:shadow-lg transition-shadow"
                v-for="(attraction, index) in travelPlans[selectedDate]" :key="index">
                <div class="w-32 h-24 overflow-hidden">
                    <img :src="attraction.firstImage || defaultImg" alt="Attraction Image"
                        class="w-auto h-full object-cover object-center rounded-md">
                </div>
                <div class="flex-grow p-2 w-48 h-24 bg-white rounded-md  overflow-hidden">
                    <h5 class="text-md font-semibold">{{ attraction.contentTitle }}</h5>
                    <p class="text-sm text-gray-600 overflow-y-auto">{{ attraction.addr1 }}</p>
                    <p class="text-sm text-gray-600 mt-1" @click="openModal(attraction, index)">{{ attraction.memoText
                        ||
                        'No Memo' }}</p>
                </div>
            </div>
        </div>
    </div>

    <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="togleModal">
        <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
            <div class="relative w-full min-w-[200px] h-12 mb-4">
                <input id="title" v-model="currentMemo"
                    class="peer w-full h-full bg-transparent text-first-gray-700  font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-first-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-md border-first-gray-200 focus:border-first-500"
                    placeholder=" " />
                <label
                    class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-first-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:transition-all after:content[' '] after:block after:flex-grow after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:transition-all text-first-gray-400 peer-focus:text-first-500 before:border-first-gray-200 peer-focus:before:border-first-500 after:border-first-gray-200 peer-focus:after:border-first-500">
                    Please enter memo
                </label>
            </div>
            <div class="flex justify-center">
                <button type="button" @click="saveMemo">
                    SAVE
                </button>
            </div>
        </div>
    </div>

    <button @click="finalSave">버튼버튼</button>

    <!-- <div class="flex justify-center mt-4">
        <button type="button" @click="finalSave" class="px-4 py-2 bg-green-500 text-white rounded-md">최종 저장</button>
    </div> -->
</template>
<style scoped>
.selected-container {
    width: 100%;
    max-width: 768px;
    height: 700px;
    background-color: white;
    overflow-y: auto;
    position: relative;
}

.scrollable-container {
    width: 100%;
    max-width: 768px;
    /* 높이 */
    height: 669px;
    background-color: white;
    overflow-y: auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    position: relative;
}
</style>
