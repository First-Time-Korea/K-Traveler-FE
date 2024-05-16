<script setup>
const props = defineProps({
  color: String,
  size: Number,
});

const inputStyle = [
  "before:content['']",
  "peer",
  "relative",
  `h-${4 * props.size}`,
  `w-${4 * props.size}`,
  "cursor-pointer",
  "appearance-none",
  "rounded-full",
  "border",
  `border-${props.color}`,
  "bg-white",
  "transition-all",
  "before:absolute",
  "before:top-2/4",
  "before:left-2/4",
  "before:block",
  "before:h-6",
  "before:w-6",
  "before:-translate-y-2/4",
  "before:-translate-x-2/4",
  "before:rounded-full",
  "before:bg-blue-gray-500",
  "before:opacity-0",
  "before:transition-opacity",
  `checked:border-${props.color}`,
  `checked:bg-${props.color}`,
  "checked:before:bg-gray-900",
  "hover:scale-105",
  "hover:before:opacity-0",
];

const svgStyle = [`h-${2 * props.size}`, `w-${2 * props.size}`];
</script>

<template>
  <div class="inline-flex items-center">
    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="customStyle">
      <input type="checkbox" :class="inputStyle" />
      <span
        class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :class="svgStyle"
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
