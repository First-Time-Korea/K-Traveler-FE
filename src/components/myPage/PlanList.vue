<script setup>
import { onMounted, ref } from "vue";
import { getPlanInfos } from "@/api/plan";
import { useMemberStore } from "@/stores/member";

import ProfileItem from "@/components/myPage/item/ProfileItem.vue";
import PlanAndAttractionNav from "@/components/myPage/item/PlanAndAttractionNav.vue";
import PlanListItem from "@/components/myPage/item/PlanListItem.vue";

const store = useMemberStore();

onMounted(() => {
  // 로그인한 경우
  if (store.userInfo !== null) {
    param.value.memberId = store.userInfo.id;
  }

  tryGetPlanInfos();
});

const planInfos = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const param = ref({
  memberId: "ssafy",
  pgno: currentPage.value,
});

const tryGetPlanInfos = () => {
  getPlanInfos(param.value, ({ data }) => {
    planInfos.value = data.planInfos;
    currentPage.value = data.currentPage;
    totalPage.value = data.totalPageCount;
  });
};
</script>

<template>
  <div class="flex justify-center flex-col items-center mt-16 mb-20">
    <ProfileItem />
    <PlanAndAttractionNav class="mt-20" menu="plan" />
    <div class="mt-6 w-[65%] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <PlanListItem v-for="planInfo in planInfos" :key="planInfo.id" :plan="planInfo" />
    </div>
  </div>
</template>

<style></style>
