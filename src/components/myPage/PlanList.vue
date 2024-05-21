<script setup>
import ProfileItem from "@/components/myPage/item/ProfileItem.vue";
import PlanAndAttractionNav from "@/components/myPage/item/PlanAndAttractionNav.vue";
import PlanListItem from "@/components/myPage/item/PlanListItem.vue";
</script>

<template>
  <div class="flex justify-center flex-col items-center">
    <ProfileItem />
    <PlanAndAttractionNav />
    <div class="w-[60%] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <PlanListItem />
      <PlanListItem />
      <PlanListItem />
      <PlanListItem />
      <PlanListItem />
      <PlanListItem />
      <PlanListItem />
      <PlanListItem />
    </div>
  </div>
</template>

<style></style>
