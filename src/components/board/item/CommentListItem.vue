<script setup></script>

<template>
  <div>
    <div class="flex mt-5">
      <img
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        class="mr-2 relative inline-block h-6 w-6 !rounded-full object-cover object-center"
      />
      <div class="flex flex-col">
        <h6
          class="mr-2 flex-none block w-3/10 font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-inherit"
        >
          사용자 이름
        </h6>
        <p
          class="flex-auto w-7/10 block font-sans text-sm antialiased font-normal leading-relaxed text-inherit"
        >
          Material Tailwind is an easy to use components library for Tailwind CSS and Material
          Design. It provides a simple way to customize your components, you can change the colors,
          fonts, breakpoints and everything you need.
        </p>
        <div class="flex flex-row items-center text-left mt-2">
          <p class="block font-sans text-xs antialiased font-light leading-normal text-inherit">
            2024.05.20
          </p>
          <button
            class="ml-2 flex items-center px-1 py-1 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            type="button"
          >
            REPLY
          </button>
          <button
            class="ml-2 flex items-center px-1 py-1 font-sans text-xs font-bold text-center text-red-500 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-red-700/10 active:bg-red-700/20"
            type="button"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
