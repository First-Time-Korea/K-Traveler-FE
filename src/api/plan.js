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

async function getAttractionBySidoCode(sidoCode, gugunCode, success, fail) {
  await http
    .get(`/attraction`, {
      params: {
        sidoCode: sidoCode,
        gugunCode: gugunCode,
      },
    })
    .then(success)
    .catch(fail);
}

async function createPlan(formData, success, fail) {
  await http
    .post("/plan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

export {
  getRegions,
  getAttractionBySidoCode,
  getBookmarkedAttraction,
  createPlan,
};
