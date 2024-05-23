<script setup>
import { onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";

const store = useMemberStore();

const userId = ref();

onMounted(() => {
  if (store.userInfo !== null) {
    userId.value = store.userInfo.id;
  } else {
    userId.value = "USERID";
  }
});

import defaultImg from "@/assets/img/profile.jpg";

</script>

<template>
  <div class="flex justify-center flex-col items-center">
    <img :src=defaultImg alt="avatar"
      class="relative inline-block h-[110px] w-[110px] !rounded-full object-cover object-center" />
    <h4 class="mt-6 block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-inherit">
      {{ userId }}
    </h4>
    <button
      class="mt-2 px-4 py-2 font-sans text-xs font-bold text-center text-first-300 uppercase align-middle transition-all rounded-lg select-none hover:bg-first-400/10 active:bg-first-400/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      Modify My Information
    </button>
  </div>
</template>

<style></style>
