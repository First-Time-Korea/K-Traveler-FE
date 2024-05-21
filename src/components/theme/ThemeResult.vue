<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { useThemeTestStore } from "@/stores/themeTest";
import { useAttracionStore } from "@/stores/attraction";
import { theme } from "@/assets/js/Theme";
import LocationItem from "@/components/theme/item/LocationItem.vue";

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore();
const isLogin = memberStore.checkLoginStatus();
const themeStore = useThemeTestStore();
const attractionStore = useAttracionStore();

const themeKey = ref(route.params.theme);

const resultTheme = ref(theme[themeKey.value]);
const img = ref({});

onMounted(() => {
  let imgs = resultTheme.value.img;
  let index = Math.floor(Math.random() * imgs.length);
  img.value = imgs[index];
});

const buttonBasicStyle =
  "align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const buttonAbledStyle = "bg-first-300 text-white";

const buttonStyle = computed(() => {
  return isLogin
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const { selectedSidoCode, selectedThemeCode } = storeToRefs(attractionStore);
const goRecommendedAttraction = () => {
  // TODO: 지역 TOP 3 중에서 TOP 1 시도 코드 넣기
  selectedSidoCode.value = 1;
  selectedThemeCode.value = themeStore.maxThemeCode;

  router.push({ name: "attraction" });
};
</script>

<template>
  <div class="flex justify-center mt-10 mb-20">
    <div
      class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-8 card-width"
    >
      <!-- 여행지 테마 -->
      <div class="p-6">
        <div class="flex justify-center mb-8">
          <img :src="img.src" :alt="img.alt" class="w-50 h-50" />
        </div>
        <h3
          class="text-center mb-4 block text-3xl antialiased font-semibold leading-snug tracking-normal text-inherit"
        >
          {{ resultTheme.subject }}
        </h3>
        <p
          class="mb-2 text-center block text-base antialiased font-light leading-relaxed text-inherit"
        >
          {{ resultTheme.content }}
        </p>
        <p class="text-center block text-base antialiased font-light leading-relaxed text-inherit">
          {{ resultTheme.recommendation }}
        </p>
      </div>

      <!-- 테마에 맞는 추천 여행지 보러가기 -->
      <div class="flex justify-center mt-20 mb-16">
        <button :class="buttonStyle" type="button" @click="goRecommendedAttraction">
          Get Attraction Recommendation
        </button>
      </div>

      <!-- 추천 여행지 TOP 3 지역 -->
      <h4
        class="text-center mb-4 block text-2xl antialiased font-semibold leading-snug tracking-normal text-inherit"
      >
        TOP 3
      </h4>
      <p
        class="mb-6 text-center block text-base antialiased font-light leading-relaxed text-inherit"
      >
        The top three regions with the most destinations that suit your theme.
      </p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <LocationItem
          v-for="location in resultTheme.locations"
          :key="location.code"
          :location="location"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-width {
  width: 60%;
}
</style>
