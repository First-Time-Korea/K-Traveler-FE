<script setup>
import { ref } from "vue";

const props = defineProps({
  tag: String,
});

const emit = defineEmits(["removeEvent"]);

const tag = ref(props.tag);

const remove = () => {
  emit("removeEvent", props.tag);
};
</script>

<template>
  <div
    class="hover:cursor-pointer relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900 mr-2"
    @click="remove"
  >
    <span>{{ tag }}</span>
  </div>
</template>

<style scoped></style>
