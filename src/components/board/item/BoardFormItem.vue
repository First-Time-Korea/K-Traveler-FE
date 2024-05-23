<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { writeArticle, getArticleForModification, modifyArticle } from "@/api/board";
import ChipItemVue from "@/components/board/item/ChipItem.vue";

const route = useRoute();
const router = useRouter();

const { VITE_VUE_API_URL } = import.meta.env;

const store = useMemberStore();

const props = defineProps({ type: String });

const articleId = ref(route.params.articleid);
onMounted(() => {
  if (props.type === "modify") {
    getArticleForModification(
      articleId.value,
      ({ data }) => {
        for (let tag of data.article.tags) {
          tags.value.push(tag.name);
        }
        content.value = data.article.content;
        previewUrl.value = `${VITE_VUE_API_URL}/article/img/${data.article.file.saveFolder}/${data.article.file.saveFile}`;
        file.value = "already registed img";
      },
      (error) => {
        console.log(error);
        alert("Travel review inquiry failed.");
      }
    );
  }
});

const buttonBasicStyle =
  "w-full align-middle select-none  font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-md shadow-gray-900/10 hover:bg-first-400 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";

const buttonDisabledStyle = "pointer-events-none bg-second-500 text-second-700/100";

const buttonAbledStyle = "bg-first-300 text-white";

const buttonStyle = computed(() => {
  return canDone.value
    ? `${buttonBasicStyle} ${buttonAbledStyle}`
    : `${buttonBasicStyle} ${buttonDisabledStyle}`;
});

const tag = ref();
const tags = ref([]);
const createTag = () => {
  // 이미 태그를 3개 입력한 경우
  if (tags.value.length === 3) {
    console.log("최대 태그 입력 개수 초과");
  } else {
    // 이미 입력한 태그인지 확인하기
    if (tags.value.indexOf(tag.value) === -1) {
      tags.value.push(tag.value);
    } else {
      console.log("이미 등록된 태그");
    }
  }

  tag.value = "";
};

const handleRemoveEvent = (tag) => {
  let index = tags.value.indexOf(tag);
  if (index > -1) {
    tags.value.splice(index, 1);
  }
};

const showTags = computed(() => {
  return tags.value.length > 0;
});

const content = ref("");

const canDone = computed(() => {
  return tags.value.length > 0 && content.value !== "" && file.value !== null;
});

const handleFileUpload = () => {
  fileInput.value.click();
};

const file = ref(null);
const previewUrl = ref();
const uploadFile = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file.value);
  }
};

const fileInput = ref(null);

const previewStyle = computed(() => {
  return previewUrl.value
    ? {
      backgroundImage: `url(${previewUrl.value})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : {};
});

const onSubmit = () => {
  props.type === "write" ? tryWriteArticle() : tryModifyArticle();
};

const tryWriteArticle = () => {
  const formData = new FormData();

  formData.append("userid", store.userInfo.id);
  formData.append("tags", tags.value);
  formData.append("content", content.value);
  formData.append("file", file.value);

  writeArticle(
    formData,
    (response) => {
      if (response.status == 201) {
        alert("You have completed the travel review.");
      }

      goArticleList();
    },
    (error) => {
      console.log(error);
      alert("Failed to write travel reviews.");
    }
  );
};

const tryModifyArticle = () => {
  const formData = new FormData();

  formData.append("articleid", articleId.value);
  formData.append("tags", tags.value);
  formData.append("content", content.value);
  if (file.value === "already registed img") {
    const emptyFile = new Blob([""], { type: "text/plain" });
    formData.append("file", emptyFile, "empty.txt");
  } else {
    formData.append("file", file.value);
  }

  modifyArticle(
    formData,
    (response) => {
      if (response.status == 200) {
        alert("You have completed the travel review.");

        router.replace({ name: "board-detail", params: { articleid: articleId.value } });
      }
    },
    (error) => {
      console.log(error);
      alert("Modification of travel reviews failed.");
    }
  );
};

const goArticleList = () => {
  router.replace({ name: "board-list" });
};
</script>

<template>
  <div class="flex justify-center h-screen">
    <div
      class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl p-8 card-width w-full max-w-4xl">
      <div class="flex flex-row h-full">
        <!-- 사진 업로드란 -->
        <div class="bg-second-500/100 flex-1 m-4 rounded-[7px] flex justify-center items-center" :style="previewStyle">
          <input type="file" class="hidden" ref="fileInput" @change="uploadFile" />
          <button
            class="flex justify-center items-center relative align-middle select-none  font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[50px] h-12 max-h-[50px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
            type="button" @click="handleFileUpload">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
        </div>

        <!-- 태그 & 내용 입력란 -->
        <div class="flex-1 flex flex-col justify-center items-center h-full ml-4">
          <!-- 입력한 태그 -->
          <div class="flex justify-center mb-2" v-show="showTags">
            <ChipItemVue v-for="tag in tags" :key="tag" :tag="tag" @remove-event="handleRemoveEvent" />
          </div>

          <div class="relative w-full">
            <input
              class="peer w-full h-full bg-transparent text-blue-gray-700  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder="TAG" v-model="tag" @keydown.enter="createTag" />
          </div>
          <div class="relative h-3/4 w-full mt-4">
            <textarea
              class="peer w-full h-full bg-transparent text-blue-gray-700  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder="CONTENT" v-model="content"></textarea>
          </div>
          <div class="mt-4 w-full">
            <button :class="buttonStyle" type="button" @click="onSubmit">DONE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-width {
  width: 60%;
}

textarea {
  resize: none;
}
</style>
