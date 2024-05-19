import { localAxios } from "@/util/http-commons.js";
const http = localAxios();

async function getRegions(success, fail) {
  await http.get("/plan/regions").then(success).catch(fail);
}

async function getBookmarkedAttraction(memberId, success, fail) {
  await http
    .get("/attraction/bookmark", {
      params: { memberId },
    })
    .then(success)
    .catch(fail);
}

async function getAttractionBySidoCode(sidoCode, success, fail) {
  console.log("시도코드!!!!");
  console.log(sidoCode);
  await http.get(`/attraction/sido/${sidoCode}`).then(success).catch(fail);
}

export { getRegions, getAttractionBySidoCode, getBookmarkedAttraction };
