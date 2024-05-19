import { localAxios } from "@/util/http-commons.js";
const http = localAxios();

function getRegions(success, fail) {
  http.get("/plan/regions").then(success).catch(fail);
}

export { getRegions };
