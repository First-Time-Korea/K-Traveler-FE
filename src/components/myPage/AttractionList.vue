<script setup>
import ProfileItem from "@/components/myPage/item/ProfileItem.vue";
import PlanAndAttractionNav from "@/components/myPage/item/PlanAndAttractionNav.vue";
import AtttractionListItem from "@/components/myPage/item/AttractionListItem.vue";
</script>

<template>
  <div class="flex justify-center flex-col items-center mt-16 mb-20">
    <ProfileItem />
    <PlanAndAttractionNav class="mt-20" menu="attraction" />
    <div class="mt-6 w-[65%] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <AtttractionListItem />
      <AtttractionListItem />
      <AtttractionListItem />
      <AtttractionListItem />
      <AtttractionListItem />
      <AtttractionListItem />
      <AtttractionListItem />
      <AtttractionListItem />
    </div>
  </div>
</template>

<style></style>
