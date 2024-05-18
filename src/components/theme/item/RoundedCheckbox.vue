<script setup>
import { ref } from "vue";

const props = defineProps({
  index: Number,
  color: String,
  size: String,
  checked: Boolean,
});

const emit = defineEmits(["checkEvent"]);

const colors = {
  first: "border-first-300 checked:border-first-300 checked:bg-first-300",
  second: "border-second-500 checked:border-second-500 checked:bg-second-500",
  third: "border-third-300 checked:border-third-300 checked:bg-third-300",
};

const sizesOfInput = {
  xsm: "h-8 w-8 before:h-12 before:w-12",
  sm: "h-10 w-10 before:h-14 before:w-14",
  md: "h-12 w-12 before:h-16 before:w-16",
  lg: "h-14 w-14 before:h-18 before:w-18",
};

const sizesOfSvg = {
  xsm: "h-2.5 w-2.5",
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const inputBasicStyle =
  "before:content[''] peer relative cursor-pointer appearance-none rounded-full border-2 bg-white transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0";

const inputStyle = `${inputBasicStyle} ${colors[props.color]} ${sizesOfInput[props.size]}`;

const sizeOfSvg = `${sizesOfSvg[props.size]}`;

const check = () => {
  emit("checkEvent", props.index);
};
</script>

<template>
  <div class="inline-flex items-center">
    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="customStyle">
      <input type="checkbox" :class="inputStyle" @click="check" :checked="props.checked" />
      <span
        class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :class="sizeOfSvg"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    </label>
  </div>
</template>

<style scoped></style>
