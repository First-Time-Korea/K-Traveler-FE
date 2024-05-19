import { localAxiosWithHeaders } from "@/util/http-commons";

const local = localAxiosWithHeaders();

function writeArticle(article, success, fail) {
  local
    .post(`/article/write`, article, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function getArticles(param, success, fail) {
  local.get(`/article/list`, { params: param }).then(success).catch(fail);
}

function getArticleForModification(articleId, success, fail) {
  local.get(`/article/modify/${articleId}`).then(success).catch(false);
}

function modifyArticle(article, success, fail) {
  local
    .put(`/article/modify`, article, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

export { writeArticle, getArticles, getArticleForModification, modifyArticle };
