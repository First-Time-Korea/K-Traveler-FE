import { localAxios, localAxiosWithHeaders } from "@/util/http-commons.js";
const http = localAxios();
const local = localAxiosWithHeaders();

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
  await http.get(`/attraction/sido/${sidoCode}`).then(success).catch(fail);
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

function getPlanInfos(param, success, fail) {
  local.get(`/plan/list`, { params: param }).then(success).catch(fail);
}

async function updateMemo(data, success, fail) {
  console.log("data", data);
  await http
    .put("/plan/memo", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(success)
    .catch(fail);
}

async function getPlanDetail(planId, success, fail) {
  await http
    .get("plan/info", { params: { planId: planId } })
    .then(success)
    .catch(fail);
}

function clearData() {}

export {
  getRegions,
  getPlanDetail,
  getAttractionBySidoCode,
  getBookmarkedAttraction,
  createPlan,
  getPlanInfos
  updateMemo,
  clearData,
};
