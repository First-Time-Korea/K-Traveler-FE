import { localAxiosWithHeaders } from "@/util/http-commons";

const local = localAxiosWithHeaders();

function getArticles(param, success, fail) {
  local.get(`/article/list`, { params: param }).then(success).catch(fail);
}

export { getArticles };
