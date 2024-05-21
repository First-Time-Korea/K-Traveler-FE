<script setup></script>

<template>
  <figure
    class="relative w-full h-56 hover:cursor-pointer hover:shadow-xl hover:shadow-gray-800/30 transition duration-300 rounded-xl"
  >
    <div class="w-full h-full rounded-xl overflow-hidden">
      <img
        class="transition-transform duration-300 transform hover:scale-105 object-cover object-center w-full h-full rounded-xl"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
        alt="nature image"
      />
    </div>
    <figcaption
      class="absolute bottom-4 left-1/2 flex w-[calc(100%-2rem)] -translate-x-1/2 justify-between rounded-xl border border-white bg-white/75 py-2 px-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
    >
      <div class="overflow">
        <h5
          class="block font-sans text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
        >
          plan title
        </h5>
        <p
          class="block mt-2.5 font-sans text-xs antialiased font-normal leading-relaxed text-gray-700"
        >
          2024.00.00 ~ 2024.00.00
        </p>
      </div>
    </figcaption>
  </figure>
</template>

<style></style>
