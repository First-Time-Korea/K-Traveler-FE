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

function getArticle(articleId, success, fail) {
  local.get(`/article/detail/${articleId}`).then(success).catch(fail);
}

function getArticleForModification(articleId, success, fail) {
  local.get(`/article/modify/${articleId}`).then(success).catch(fail);
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

function deleteArticle(articleId, success, fail) {
  local.delete(`/article/delete/${articleId}`).then(success).catch(fail);
}

export {
  writeArticle,
  getArticles,
  getArticle,
  getArticleForModification,
  modifyArticle,
  deleteArticle,
};
