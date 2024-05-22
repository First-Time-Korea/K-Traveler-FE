<script setup>
import Fuse from 'fuse.js'; //검색을 위한 라이브러리

import { onMounted, ref, computed, watch } from 'vue';
import { getAttractionBySidoCode, getBookmarkedAttraction } from "@/api/plan.js";
import { getRegions } from "@/api/plan.js";
import { storeToRefs } from "pinia";
import { usePlanStore } from "@/stores/plan.js";
import { useMemberStore } from "@/stores/member"
const planStore = usePlanStore();
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const { clickedRegion, schedule, clickedDate } = storeToRefs(planStore);
const { addPlace, deletePlace } = planStore;

const fuseOptions = {
    keys: ['title'],
    includeScore: true,
    threshold: 0.2
};
const fuseIndex = ref(new Fuse([], fuseOptions));

const currentTab = ref('selected regions');  // 기본적으로 선택된 탭 설정
const tabs = ['selected regions', 'bookmarked', 'other regions'];  // 탭 목록
const otherRegions = ref([]); //다른 지역 종류 (셀렉트박스)

const keyword = ref();//키워드로 검색
const bookmarkedAttractions = ref([]); //북마크된 attraction
const attracionBySidoCode = ref([]); //시도코드로 조회한 attraction
const otherRegionAttraction = ref([]); //다른 지역 attraction

const filteredAttractionsToShow = ref([]); //키워드로 검색 후 필터링 된 목록(실제 조회)

const selectedDate = ref(); //현재 선택 중인 날짜
const travelPlans = ref({
}); //찜한 관광지 (key:날짜.toISOString, value:관광지)
const filteredPlans = ref(); //선택한 날짜에 해당하는, 선택한 관광지 담은 목록

const dateRange = computed(() => {
    const dates = [];
    let currentDate = new Date(schedule.value.start);
    while (currentDate <= schedule.value.end) {
        dates.push(new Date(currentDate).toISOString());
        currentDate.setDate(currentDate.getDate() + 1);
    }
    selectedDate.value = dates[dates.length - 1] //초기 날짜 설정 TODO: 리펙토링 할 때 피니아 객체랑 통합시키기..^^
    clickedDate.value = dates[dates.length - 1]; //피니아에서도 초기 값 설정
    return dates;
})

function changeTab(tab) { //탭 변경
    currentTab.value = tab;
}

function changeDate(date) { //날짜 변경
    selectedDate.value = date;
    clickedDate.value = date;
}

function addToPlan(dateString, attraction) {
    if (travelPlans.value[dateString] !== undefined) {
        const attractionContentId = attraction.contentId;
        //배열을 돌면서 같은 contentId가 하나라도 있는지 확인 (중복 방지)
        if (travelPlans.value[dateString].some(attraction => attraction.contentId === attractionContentId)) {
            return;
        }
    }
    const updatedPlans = { ...travelPlans.value };
    if (!updatedPlans[dateString]) {
        updatedPlans[dateString] = [];
    }
    updatedPlans[dateString].push(attraction);
    travelPlans.value = updatedPlans;

    addPlace(dateString, attraction); //pinia에 추가
}

function deleteAtPlan(dateString, attrraction) {
    const deletedPlans = travelPlans.value[dateString].filter(attr => attr.contentId != attrraction.contentId);
    travelPlans.value[dateString] = deletedPlans;

    deletePlace(dateString, attrraction);
}

function isInPlan(date, contentId) {
    if (!travelPlans.value[date]) return false;
    return travelPlans.value[date].some(attraction => attraction.contentId === contentId);
}

onMounted(() => {
    const sidoCode = clickedRegion.value.sidoCode;
    const gugunCode = clickedRegion.value.gugunCode;
    getAttractionBySidoCode((sidoCode) //조회 1: 선택한 지역의 관광지
        , ({ data }) => {
            attracionBySidoCode.value = data.data;
            //첫 조회는 선택한 지역의 관광지로 보여준다.
            console.log("attracionBySidoCode", attracionBySidoCode.value)
            filteredAttractionsToShow.value = attracionBySidoCode.value; //첫 조회는 선택한 지역의 관광지로 보여준다.

        }
        , (error) => console.log(error))
    const memberId = userInfo.value.id;
    getBookmarkedAttraction((memberId) //조회 2: 회원이 북마크 한 관광지 
        , ({ data }) => {
            bookmarkedAttractions.value = data.data;
            console.log(bookmarkedAttractions.value);
        }
        , (error) => console.log(error));

    getRegions(({ data }) => {
        otherRegions.value = data.data;
        console.log(regions.value); //선택할 수 있는 다른 지역 목록 세팅(셀렉트 박스)
    }, (error) => console.log(error))
})

const selectedRegion = ref(''); // 선택된 지역 코드 초기화

function onSelectChange() {
    const sidoCode = selectedRegion.value;
    getAttractionBySidoCode(sidoCode, ({ data }) => {
        otherRegionAttraction.value = data.data;
        filteredAttractionsToShow.value = data.data;
        console.log("새 지역 조회", otherRegionAttraction.value);
    }, (error) => {
        console.error(error);
    });
}

//함수의 호출이 완전히 멈춘 뒤 일정 시간이 지난 뒤에 실행시키기 위해
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}

//탭 변경
watch(() => currentTab.value, (newTab) => {
    keyword.value = null;
    if (newTab === 'bookmarked') {
        filteredAttractionsToShow.value = bookmarkedAttractions.value;
    } else if (newTab === 'selected regions') {
        filteredAttractionsToShow.value = attracionBySidoCode.value;
    } else {
        filteredAttractionsToShow.value = [];
        //다른 지역 조회는 탭을 변경했다고 해서 당장 장소를 불러오지 않는다.
    }
})

//날짜 변경
watch(() => selectedDate.value, (newDate) => {
    filteredPlans.value = travelPlans.value[newDate] || [];
});

//보여줄 관광지의 후보 리스트
watch(filteredAttractionsToShow, (newAttractions) => {
    fuseIndex.value = new Fuse(newAttractions, fuseOptions);
});

//검색되어 보여줄 최종 리스트
//퍼지 검색: 완벽하게 일치하지 않는 문자열도 검색 결과로 반환할 수 있는 검색 기능
watch(() => keyword.value, debounce((newKeyword) => {
    if (newKeyword == null || !newKeyword.trim()) {
        filteredAttractionsToShow.value = filteredAttractionsToShow.value;
    } else {
        const results = fuseIndex.value.search(newKeyword);
        filteredAttractionsToShow.value = results.map(result => result.item);
    }
}, 300)); //유저가 입력할 시간 300ms 주는 것

</script>

<template>
    <div class="flex justify-center">
        <!-- 날짜 선택 -->
        <div class="flex flex-col px-4 pt-1 w-full divide-y divide-second-800">
            <button v-for="date in dateRange" :key="date" @click=" changeDate(date)"
                class="mt-2 select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                :class="{
                    'select-none rounded-lg border border-second-900 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none': true,
                    'bg-second-900 text-white': selectedDate === date
                }" type="button">
                {{ new Date(date).toLocaleDateString('en-US', { month: 'long', day: '2-digit' }) }}
            </button>
        </div>

        <!-- 상단 탭 -->
        <div class="flex flex-1 justify-center">
            <nav class="text-sm w-96">
                <div v-for="tab in tabs" :key="tab"
                    :class="{ 'border-b-2 border-first-500 text-first-500 font-semibold': currentTab === tab, 'text-gray-700 hover:text-black': currentTab !== tab }"
                    class="inline-block px-4 py-2 cursor-pointer" @click="changeTab(tab)">
                    {{ tab }}
                </div>
                <div class="relative w-full min-w-[200px] h-15 py-2">
                    <!-- 다른 지역 조회 할 때만 셀렉트 박스 등장.. 토글 -->
                    <select v-if="currentTab === 'other regions'" v-model="selectedRegion" @change="onSelectChange"
                        class="peer w-full h-full bg-transparent text-blue-gray-700 font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-lg border-blue-gray-200 focus:border-second-300">
                        <option disabled value="">Select a region</option>
                        <option v-for="(region, idx) in otherRegions" :key="idx" :value="region.sidoCode">
                            {{ region.sidoName }}
                        </option>
                    </select>
                    <input v-model="keyword"
                        class="peer w-full h-full bg-transparent text-blue-gray-700  font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-lg border-blue-gray-200 focus:border-second-300"
                        placeholder="Search attractions" />
                </div>
                <div class="scrollable-container custom-scroll ">
                    <div class=" flex bg-white border border-gray-300 mb-2 p-2 rounded-lg relative"
                        v-for="attraction in filteredAttractionsToShow" :key="attraction.id">
                        <div class="w-24 h-48 overflow-hidden">
                            <img :src="attraction.firstImage" alt="" class="w-auto h-full object-cover object-center">
                        </div>
                        <div class="flex-grow px-2 w-48 h-48 overflow-y-auto scroll">
                            <h5 class="text-md font-semibold">{{ attraction.title }}</h5>
                            <p class="text-sm text-gray-600 overflow-y-auto">{{ attraction.overView }}</p>
                        </div>
                        <button v-if="isInPlan(selectedDate, attraction.contentId)"
                            @click="addToPlan(selectedDate, attraction)"
                            class="bg-third-300 text-white p-2 rounded-md cursor-pointer absolute top-2 right-2">
                            <span class="text-xl">✓</span>
                        </button>
                        <button v-else @click="addToPlan(selectedDate, attraction)"
                            class="bg-second-300 text-white p-2 rounded-md cursor-pointer absolute top-2 right-2">
                            <span class="text-xl">+</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>

        <!-- 선택된 항목 리스트 -->
        <div class="flex-1 flex px-4">
            <div class="flex flex-col text-gray-700 bg-white w-96 rounded-xl overflow-y-auto">
                <div class="selected-container scroll">
                    <div v-if="travelPlans[selectedDate] && travelPlans[selectedDate].length > 0">
                        <div v-for="(attraction, index) in travelPlans[selectedDate]" :key="index">
                            <button class="p-2 rounded-full cursor-pointer absolute right-2"
                                @click="deleteAtPlan(selectedDate, attraction)">
                                <span class="text-xl">x</span>
                            </button>
                            <div class="m-3 p-3 bg-second-50 rounded-md">
                                <h5 class="text-sm font-semibold">{{ attraction.title }}</h5>
                                <p class="text-xs">{{ attraction.addr1 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.scrollable-container {
    width: 100%;
    max-width: 768px;
    /* 높이 */
    height: 600px;
    background-color: white;
    border-radius: 0.5rem;
    overflow-y: auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    position: relative;
}

.selected-container {
    width: 100%;
    max-width: 768px;
    height: 700px;
    background-color: white;
    border-radius: 0.5rem;
    overflow-y: auto;
    position: relative;
}
</style>
