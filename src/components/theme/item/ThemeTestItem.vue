<script setup>
import RoundedCheckbox from "@/components/theme/item/RoundedCheckbox.vue";

const props = defineProps({
  text: Object,
});
</script>

<template>
  <div class="mb-20 container text-center">
    <h4
      class="block mb-3 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-inherit text-blue-gray-700"
    >
      {{ text }}
    </h4>
    <div class="flex justify-center">
      <RoundedCheckbox color="first" size="lg" />
      <RoundedCheckbox color="first" size="md" />
      <RoundedCheckbox color="first" size="sm" />
      <RoundedCheckbox color="second" size="xsm" />
      <RoundedCheckbox color="third" size="sm" />
      <RoundedCheckbox color="third" size="md" />
      <RoundedCheckbox color="third" size="lg" />
    </div>
  </div>
</template>

<style scoped></style>
