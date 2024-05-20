import { ref } from "vue";
import { defineStore } from "pinia/dist/pinia";

export const useBoardStore = defineStore("board", () => {
    const article = ref({
        articleId: 0,
        img: {
            src: "",
            fileName: ""
        }
    });

    return { article };
})