<script setup>
import { computed } from "vue";

const props = defineProps({
  value: Number,
  isClicked: Boolean,
});

const emit = defineEmits(["clickEvent"]);

const onClick = () => {
  emit("clickEvent", props.value);
};

const buttonBasicStyle =
  "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

const buttonClickedStyle =
  "bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonUnclickedStyle = " text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20";

const buttonStyle = computed(() => {
  return props.isClicked
    ? `${buttonBasicStyle} ${buttonClickedStyle}`
    : `${buttonBasicStyle} ${buttonUnclickedStyle}`;
});
</script>

<template>
  <button :class="buttonStyle" type="button" @click="onClick">
    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{{
      props.value
    }}</span>
  </button>
</template>

<style scoped></style>
