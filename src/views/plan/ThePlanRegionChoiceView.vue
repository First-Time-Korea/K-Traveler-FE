<script setup>
import RegionList from "@/components/plan/RegionList.vue"
import RegionDescription from "@/components/plan/RegionDescription.vue"
</script>

<template>
    <div class="flex justify-center ">
        <div class="flex-1 flex justify-center">
            <RegionList class="w-full"></RegionList>
        </div>
        <div class="flex-1 flex justify-center">
            <RegionDescription class="w-full"></RegionDescription>
        </div>
    </div>
</template>

<style></style>