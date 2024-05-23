<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { VITE_VUE_API_URL } = import.meta.env;

const router = useRouter();

const props = defineProps({
  plan: Object,
});

const plan = ref({
  id: 0,
  title: "",
  period: "",
  img: {
    src: "",
    alt: "",
  },
});

onMounted(() => {
  plan.value.id = props.plan.id;
  plan.value.title = props.plan.title;
  plan.value.period =
    props.plan.startDate.substring(0, 10).replace(/-/g, ".") +
    " ~ " +
    props.plan.endDate.substring(0, 10).replace(/-/g, ".");
  plan.value.img.src = `${VITE_VUE_API_URL}/plan/img/${props.plan.file.saveFolder}/${props.plan.file.saveFile}`;
  let index = props.plan.file.originFile.indexOf(".");
  plan.value.img.alt = `${props.plan.file.originFile.substring(0, index)}`;
});

const goPlanDetail = () => {
  router.push({ name: "plan-detail", params: { planId: plan.value.id } });
};
</script>

<template>
  <figure
    class="relative w-full h-56 hover:cursor-pointer hover:shadow-xl hover:shadow-gray-800/30 transition duration-300 rounded-xl"
    @click="goPlanDetail"
  >
    <div class="w-full h-full rounded-xl overflow-hidden">
      <img
        class="transition-transform duration-300 transform hover:scale-105 object-cover object-center w-full h-full rounded-xl"
        :src="plan.img.src"
        :alt="plan.img.alt"
      />
    </div>
    <figcaption
      class="absolute bottom-4 left-1/2 flex w-[calc(100%-2rem)] -translate-x-1/2 justify-between rounded-xl border border-white bg-white/75 py-2 px-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
    >
      <div class="overflow">
        <h5
          class="block font-sans text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
        >
          {{ plan.title }}
        </h5>
        <p
          class="block mt-2.5 font-sans text-xs antialiased font-normal leading-relaxed text-gray-700"
        >
          {{ plan.period }}
        </p>
      </div>
    </figcaption>
  </figure>
</template>

<style></style>
