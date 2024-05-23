<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AttracionListVue from "@/components/plan/AttractionListVue.vue";
import PMap from "@/components/plan/PMap.vue";

import { createPlan } from "@/api/plan.js";
import { usePlanStore } from "@/stores/plan.js";
import { useMemberStore } from "@/stores/member";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const planStore = usePlanStore();
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const { clickedRegion, schedule, places } = storeToRefs(planStore);

const formattedStartDate = computed(() => formatDateString(schedule.value.start));
const formattedEndDate = computed(() => formatDateString(schedule.value.end));
const isModalVisible = ref(false);

const fileInput = ref(null); // 입력 받는 파일

const goNext = () => {
  // 모달 띄우기
  // router.push({ name: "choice-schedule" })
};

const togleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

onMounted(() => {
  console.log("ThePlanAttractionCoiceView");
  console.log(schedule);
  console.log(clickedRegion);
  console.log(userInfo);

  calculatePeriod();
});

const formatDateString = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  })
    .format(date)
    .replace(/\. /g, ".");
};

const savePlan = () => {
  const formData = new FormData();
  const attractionsPerDate = Object.entries(places.value).map(([date, attractions]) => {
    return {
      date: date,
      contentId: attractions.map((attraction) => attraction.contentId),
    };
  });
  let planRequest = {
    memberId: userInfo.value.id,
    title: document.getElementById("title").value,
    attractionsPerDate: attractionsPerDate,
  };

  const planRequestBlob = new Blob([JSON.stringify(planRequest)], { type: "application/json" }); //json을 파일 형태로 담는다. (multipart form data로 보내려고)
  formData.append("planRequest", planRequestBlob);

  if (fileInput.value.files[0]) {
    formData.append("file", fileInput.value.files[0]);
  }

  createPlan(
    formData,
    ({ data }) => {
      if (data.status === "fail") {
        alert("Save failed");
      } else {
        alert("Plan saved successfully");
        router.push({ name: "main" }); //성공하면 메인 화면으로
      }
    },
    (error) => console.log(error)
  );
};

const calculatePeriod = () => {
  const startTime = schedule.value.start.getTime();
  const endTime = schedule.value.end.getTime();

  const differenceOfTime = endTime - startTime;

  period.value = differenceOfTime / (1000 * 60 * 60 * 24) + 1;
};

const period = ref();
const canGoNext = ref(false);

watch(
  () => places.value,
  () => {
    if (places.value.length < period.value) {
      canGoNext.value = false;
    } else {
      let count = 0;
      for (const dateKey in places.value) {
        count++;

        if (places.value[dateKey].length == 0) {
          canGoNext.value = false;
          return;
        }
      }

      if (count === period.value) {
        canGoNext.value = true;
      }
    }
  },
  { deep: true }
);

const buttonBasicStyle =
  "fixed bottom-10 inset-x-0 mx-auto w-64 h-10 align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const buttonAbledStyle = "bg-first-300 text-white";

const buttonStyle = computed(() => {
  return canGoNext.value
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const planTitle = ref("");

const canSave = computed(() => {
  return planTitle.value !== "";
});
</script>

<template>
  <!-- 앞서 선택한 정보 -->
  <div class="ms-5">
    <h1 class="text-xl font-bold">{{ clickedRegion.sidoName }}</h1>
    <h2 class="text-md text- mt-2">{{ formattedStartDate }} - {{ formattedEndDate }}</h2>
  </div>

  <!-- 메인 컨텐츠 -->
  <div class="flex justify-center">
    <div class="flex-1 flex justify-between">
      <AttracionListVue class="w-full"> </AttracionListVue>
    </div>
    <div class="flex-1 flex justify-center">
      <PMap class="w-full"> </PMap>
    </div>
  </div>

  <!-- 다음 버튼 (누르면 모달 창이 뜬다.) -->
  <button @click="togleModal()" :class="buttonStyle" type="button">NEXT</button>

  <!-- 모달 -->
  <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self="togleModal">
    <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
      <div class="relative w-full min-w-[200px] h-12 mb-4">
        <input id="title"
          class="peer w-full h-full bg-transparent text-blue-gray-700 font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-blue-500"
          placeholder=" " v-model="planTitle" />
        <label
          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:transition-all after:content[' '] after:block after:flex-grow after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:transition-all text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
          Please enter a travel name
        </label>
      </div>
      <div class="relative w-full min-w-[200px] h-12 mb-4">
        <input type="file" ref="fileInput"
          class="peer w-full h-full bg-transparent text-blue-gray-700 font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-blue-500"
          placeholder=" " />
        <label
          class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs before:content[' '] before:block before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:transition-all after:content[' '] after:block after:flex-grow after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:transition-all text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">
          Please make a thumbnail
        </label>
      </div>
      <div class="flex justify-center">
        <button
          class="mt-2 px-4 py-2 font-sans text-xs font-bold text-center text-first-300 uppercase align-middle transition-all rounded-lg select-none hover:bg-first-400/10 active:bg-first-400/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:text-second-500"
          type="button" :disabled="!canSave" @click="savePlan">
          SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  /* 뷰포트에 상대적으로 위치 설정 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 다른 요소보다 상위에 위치하도록 z-index 설정 */
  z-index: 1000;
}

/* 모달 내용 설정 */
.modal-content {
  width: 340px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
