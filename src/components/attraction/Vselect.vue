<script setup>
import { onMounted, ref, watch } from "vue";
import { getTheme, getCategory, getSido } from "@/api/attraction.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAttracionStore } from "@/stores/attraction.js";

const router = useRouter();
const attractionStore = useAttracionStore();
const { searchAttraction } = attractionStore;
const { selectedSidoCode, selectedThemeCode, selectedContentId } = storeToRefs(attractionStore);

const themeList = ref({});
const categoryList = ref({});
const sidoList = ref({});

const searchItem = ref({
  keyword: "",
  themeCode: "", //TODO: select 했을 때 지정되게 만들기
  categoryCode: "",
  sidoCode: "",
  contentId: "",
});

onMounted(() => {
  goGetTheme();
  goGetSido();

  if (selectedSidoCode.value || selectedThemeCode.value || selectedContentId.value) {
    searchItem.value.themeCode = selectedThemeCode.value;
    searchItem.value.sidoCode = selectedSidoCode.value;
    searchItem.value.contentId = selectedContentId.value;
    handleSearch();
  }
});

const goGetSido = () => {
  getSido(
    ({ data }) => {
      console.log(data.data);
      sidoList.value = data.data.map((item) => {
        return { value: item.sidoCode, text: item.sidoName };
      });
    },
    (error) => console.log(error)
  );
};

const goGetTheme = () => {
  getTheme(
    ({ data }) => {
      console.log(data.data);
      themeList.value = data.data.map((item) => {
        return { value: item.themeCode, text: item.themeName };
      });
    },
    (error) => console.log(error)
  );
};

const handleThemeChange = async (themeCode) => {
  searchItem.value.themeCode = themeCode;
  getCategory(
    themeCode,
    ({ data }) => {
      console.log(data.data);
      categoryList.value = data.data.map((item) => {
        return { value: item.categoryCode, text: item.categoryName };
      });
    },
    (error) => {
      console.log(error);
    }
  );
};

const handleCategoryChange = (categoryCode) => {
  searchItem.value.categoryCode = categoryCode;
};

const handleSidoChange = (sidoCode) => {
  searchItem.value.sidoCode = sidoCode;
};

const handleSearch = async () => {
  await searchAttraction(searchItem).then(console.log("끝"));
  console.log(searchItem.value);
};

const canSearch = ref(false);

watch(
  () => searchItem.value,
  () => {
    let count = 0;
    for (let key in searchItem.value) {
      if (searchItem.value[key] !== "") {
        count++;
      }
    }

    if (count > 1) {
      canSearch.value = true;
    } else {
      canSearch.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="flex justify-center mt-10">
    <div class="row justify-content-center">
      <div class="col-8 flex justify-content-center align-items-center">
        <!-- 시도로 검색 -->
        <div class="mr-3 flex-grow-1">
          <select v-model="sidoList.sidoCode" @change="handleSidoChange($event.target.value)"
            class="scroll select-box peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            <option value="" selected disabled>Select a Region</option>
            <option v-for="sido in sidoList" :key="sido.value" :value="sido.value">
              {{ sido.text }}
            </option>
          </select>
          <label
            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Select a Region
          </label>
        </div>

        <!-- Theme Select Box -->
        <div class="mr-3 flex-grow-1">
          <select v-model="themeList.themeCode" @change="handleThemeChange($event.target.value)" style="width: 350px"
            class="scroll select-box peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            <option value="" selected disabled>Select a theme</option>
            <option v-for="theme in themeList" :key="theme.value" :value="theme.value">
              {{ theme.text }}
            </option>
          </select>
          <label
            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Select a theme
          </label>
        </div>

        <!-- Category Select Box -->
        <div class="mr-3 flex-grow-1">
          <select v-model="categoryList.categoryCode" @change="handleCategoryChange($event.target.value)"
            class="scroll select-box peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            <option value="" selected disabled>Select a detail</option>
            <option v-for="category in categoryList" :key="category.value" :value="category.value">
              {{ category.text }}
            </option>
          </select>
          <label
            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Select a detail
          </label>
        </div>

        <!-- Search Input Box -->
        <div class="mr-3 flex-grow-1">
          <input v-model="searchItem.keyword"
            class="input-box peer w-full h-full bg-transparent text-blue-gray-700 font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder=" " /><label
            class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Username
          </label>
        </div>

        <!-- 검색 박스 -->
        <button
          class="bg-first-300 text-white relative flex-1 align-middle select-none font-medium text-center uppercase transition-all w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:bg-second-500 disabled:text-second-700/100"
          type="button"
          :disabled="!canSearch"
          @click="handleSearch"
        >
          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-box,
.input-box {
  width: 200px;
  height: 40px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
