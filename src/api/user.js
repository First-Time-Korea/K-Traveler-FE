import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
  await local.post(`/user/login`, param).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  local.defaults.headers["Authorization"] =
    sessionStorage.getItem("accessToken");
  await local.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] =
    sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await local.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function signup(user, success, fail) {
  await local
    .post("/user/signup", JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function idCheck(userid, success, fail) {
  await local
    .get("/user/signup", {
      params: userid,
    })
    .then(success)
    .catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout, signup, idCheck };
