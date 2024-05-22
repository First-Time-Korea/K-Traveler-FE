import { localAxios, localAxiosWithHeaders } from "@/util/http-commons.js";
const http = localAxios();
const local = localAxiosWithHeaders();

function getSido(success, fail) {
  http.get("attraction/region").then(success).catch(fail);
}

function getTheme(success, fail) {
  http.get("attraction/theme").then(success).catch(fail);
}

function getCategory(cateCode, success, fail) {
  http.get(`attraction/theme/${cateCode}/category`).then(success).catch(fail);
}

function getSearch(searchItem, success, fail) {
  http.post("attraction/search", searchItem.value).then(success).catch(fail);
}

async function togleBookmark(bookmarkItem, success, fail) {
  await http
    .post("attraction/bookmark", bookmarkItem)
    .then(success)
    .catch(fail);
}

async function getAttraction(wantItem, success, fail) {
  await http.post("attraction", wantItem).then(success).catch(fail);
}

async function getAttractionByAI(wantItem, success, fail) {
  await http.post("attraction/ai", wantItem).then(success).catch(fail);
}

function getBookmarkedAttractionInfos(param, success, fail) {
  local.get(`/attraction/list`, { params: param }).then(success).catch(fail);
}

export {
  getCategory,
  getTheme,
  getSearch,
  getAttraction,
  getAttractionByAI,
  togleBookmark,
  getSido,
  getBookmarkedAttractionInfos
};
