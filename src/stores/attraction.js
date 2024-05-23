import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { getSearch } from "@/api/attraction.js";

import {} from "@/api/attraction";

export const useAttracionStore = defineStore("attractionStore", () => {
  const selectedSidoCode = ref();
  const selectedThemeCode = ref();
  const selectedContentId = ref();

  const places = ref([]);

  const searchAttraction = async (searchItem) => {
    getSearch(
      searchItem,
      (response) => {
        console.log(response.data.data);
        if (response.data.status == "success") {
          places.value = response.data.data;
          console.log(places);
        } else {
          console.log("검색 실패");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const clearSearchData = () => {
    selectedSidoCode.value = "";
    selectedThemeCode.value = "";
    selectedContentId.value = 0;
  };

  return {
    searchAttraction,
    selectedSidoCode,
    selectedThemeCode,
    selectedContentId,
    places,
    clearSearchData,
  };
});
