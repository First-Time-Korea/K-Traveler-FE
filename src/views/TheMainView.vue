<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
</script>

<template>
    <div class="relative h-screen w-full overflow-hidden">
        <!-- Background Video -->
        <video autoplay muted loop
            class="absolute top-0 left-0 w-full h-full object-cover object-center transform scale-150">
            <source src="@/assets/vedio/korea-description.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <!-- Content Overlay -->
        <div class="relative flex flex-col items-center justify-center h-full w-full bg-black bg-opacity-20">
            <h1 class="text-white text-6xl lg:text-9xl font-bold">TRIP TO KOREA</h1>
            <h2 class="text-white text-5xl lg:text-8xl font-bold">'JUST FOR YOU'</h2>
            <p class="text-white text-xl lg:text-2xl mt-2 text-center">
                Through our theme-based travel
                preference
                tests, we provide personalized recommendations for travel destinations.
            </p>
            <p class="text-white text-xl lg:text-2xl mt-2 text-center">
                Explore the rich culture,
                delicious food, fascinating history, and stunning nature of Korea.
            </p>
            <p class="text-white text-xl lg:text-2xl mt-2 text-center">
                I hope you have the best time in Korea.
            </p>
            <button @click="router.push({ name: 'theme-test' })"
                class=" mt-8 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                Get started </button>
        </div>
    </div>
</template>

<style scoped></style>