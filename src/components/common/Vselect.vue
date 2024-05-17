<script setup>
import { ref, onMounted } from "vue"

const props = defineProps({
    selectOption: Array,
    defaultValue: String,
    classGroup: String
})

const emit = defineEmits(["onKeySelect"])

const key = ref("")

onMounted(() => {
    console.log(props.selectOption)
})

const onSelect = () => {
    // console.log(key.value + "선택!!!")
    emit("onKeySelect", key.value)
}
</script>

<template>
    <!-- <select v-model="key" :class="classGroup" @change="onSelect">
        <option value="" selected>{{ defaultValue }}</option>
        <option v-for="option in selectOption" :key="option.value" :value="option.value"
            :disabled="option.value === '' ? true : false">
            {{ option.text }}
        </option>
    </select> -->
</template>

<style scoped></style>
