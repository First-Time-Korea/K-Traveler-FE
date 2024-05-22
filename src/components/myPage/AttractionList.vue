<script setup>
import { onMounted, ref } from "vue";
import { getBookmarkedAttractionInfos } from "@/api/attraction";
import { useMemberStore } from "@/stores/member";

import ProfileItem from "@/components/myPage/item/ProfileItem.vue";
import PlanAndAttractionNav from "@/components/myPage/item/PlanAndAttractionNav.vue";
import AtttractionListItem from "@/components/myPage/item/AttractionListItem.vue";

const store = useMemberStore();

onMounted(() => {
  // 로그인한 경우
  if (store.userInfo !== null) {
    param.value.memberId = store.userInfo.id;
  }

  tryGetBookmarkedAttractionInfos();
});

const bookmarkedAttractionInfos = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const param = ref({
  memberId: "ssafy",
  pgno: currentPage.value,
});

const tryGetBookmarkedAttractionInfos = () => {
  getBookmarkedAttractionInfos(param.value, ({ data }) => {
    bookmarkedAttractionInfos.value = data.bookmarkedAttractionInfos;
    currentPage.value = data.currentPage;
    totalPage.value = data.totalPageCount;
  });
};
</script>

<template>
  <div class="flex justify-center flex-col items-center mt-16 mb-20">
    <ProfileItem />
    <PlanAndAttractionNav class="mt-20" menu="attraction" />
    <div class="mt-6 w-[65%] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <AtttractionListItem
        v-for="bookmarkedAttractionInfo in bookmarkedAttractionInfos"
        :key="bookmarkedAttractionInfo.bookmarkId"
        :attraction="bookmarkedAttractionInfo"
      />
    </div>
  </div>
</template>

<style></style>
