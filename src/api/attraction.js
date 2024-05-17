import { localAxios } from "@/util/http-commons.js";
const http = localAxios();

function getTheme(success, fail) {
  http.get("attraction/theme").then(success).catch(fail);
}

function getCategory(cateCode, success, fail) {
  http.get(`attraction/theme/${cateCode}/category`).then(success).catch(fail);
}

function getSearch(searchItem, success, fail) {
  console.log(searchItem.value);
  http.post("attraction/search", searchItem.value).then(success).catch(fail);
}

export { getCategory, getTheme, getSearch };
