<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { theme } from "@/assets/js/Theme";

const route = useRoute();
const store = useMemberStore();

const themeKey = ref(route.params.theme);

const resultTheme = ref(theme[themeKey.value]);
const img = ref({});

onMounted(() => {
  let imgs = resultTheme.value.img;
  let index = Math.floor(Math.random() * imgs.length);
  img.value = imgs[index];
});

const buttonBasicStyle =
  "align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const buttonAbledStyle = "bg-first-300 text-white";

const buttonStyle = computed(() => {
  // TODO: 로그인 상태에 따라 버튼 활성화하기
  return store.isLogin
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const goRecommendedAttraction = () => {
  // TODO: 테마 추천 여행지 페이지로 이동하기
  console.log("go recommended attraction");
};
</script>

<template>
  <div class="flex justify-center mt-10 mb-20">
    <div
      class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-8 card-width"
    >
      <div class="p-6">
        <div class="flex justify-center mb-8">
          <img :src="img.src" :alt="img.alt" class="w-50 h-50" />
        </div>
        <h3
          class="text-center mb-4 block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-inherit"
        >
          {{ resultTheme.subject }}
        </h3>
        <p
          class="mb-2 block font-sans text-base antialiased font-light leading-relaxed text-inherit"
        >
          {{ resultTheme.content }}
        </p>
        <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {{ resultTheme.recommendation }}
        </p>
      </div>
      <div class="flex justify-center mt-10 mb-10">
        <button :class="buttonStyle" type="button" @click="goRecommendedAttraction">
          Get Attraction Recommendation
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-width {
  width: 60%;
}
</style>
