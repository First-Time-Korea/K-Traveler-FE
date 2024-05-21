import { ref, computed } from "vue";
import { defineStore } from "pinia/dist/pinia";

export const useThemeTestStore = defineStore("themeTest", () => {
  const theme = ref({
    food: {
      code: "A",
      key: "food",
      score: 0,
    },
    shopping: {
      code: "B",
      key: "shopping",
      score: 0,
    },
    history: {
      code: "C",
      key: "history",
      score: 0,
    },
    nature: {
      code: "D",
      key: "nature",
      score: 0,
    },
    kCulture: {
      code: "E",
      key: "kCulture",
      score: 0,
    },
    entertainment: {
      code: "F",
      key: "entertainment",
      score: 0,
    },
    sport: {
      code: "G",
      key: "sport",
      score: 0,
    },
    modernCulture: {
      code: "H",
      key: "modernCulture",
      score: 0,
    },
  });

  let id = 0;
  const questions = ref([
    {
      id: id++,
      text: "I enjoy trying local cuisine when traveling.",
      theme: theme.value.food.key,
      value: -1,
    },
    {
      id: id++,
      text: "Food quality is important to me when choosing a travel destination.",
      theme: theme.value.food.key,
      value: -1,
    },
    {
      id: id++,
      text: "I am familiar with Korea's 'chimaek' culture.",
      theme: theme.value.food.key,
      value: -1,
    },
    {
      id: id++,
      text: "I find trying exotic and unfamiliar foods exciting.",
      theme: theme.value.food.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy shopping for local products and souvenirs when traveling.",
      theme: theme.value.shopping.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit traditional Korean markets.",
      theme: theme.value.shopping.key,
      value: -1,
    },
    {
      id: id++,
      text: "Shopping is important to me when choosing a travel destination.",
      theme: theme.value.shopping.key,
      value: -1,
    },
    {
      id: id++,
      text: "I am familiar with K-Beauty in Korea.",
      theme: theme.value.shopping.key,
      value: -1,
    },
    {
      id: id++,
      text: "I am interested in exploring historical sites and monuments.",
      theme: theme.value.history.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to experience traditional Korean culture.",
      theme: theme.value.history.key,
      value: -1,
    },
    {
      id: id++,
      text: "I am familiar with hanok and hanbok.",
      theme: theme.value.history.key,
      value: -1,
    },
  ]);

  const calculateValueOfQuestion = (id, value) => {
    questions.value.findIndex((question) => {
      if (question.id === id) {
        if (question.value > -1 && value == -1) {
          restOfQuestions.value++;
        } else if (question.value == -1 && value > -1) {
          restOfQuestions.value--;
        }
        question.value = value;
      }
    });
  };

  const restOfQuestions = ref(questions.value.length);
  const isDone = computed(() => {
    return restOfQuestions.value == 0;
  });

  const result = ref();
  const maxThemeCode = ref();
  const calcualteResult = () => {
    questions.value.forEach((question) => {
      theme.value[question.theme].score += question.value;
    });

    let maxScore = -1;
    let maxTheme;
    for (let key in theme.value) {
      if (maxScore < theme.value[key].score) {
        maxScore = theme.value[key].score;
        maxThemeCode.value = theme.value[key].code;
        maxTheme = key;
      }
    }

    result.value = maxTheme;
  };

  const init = () => {
    for (let key in theme.value) {
      theme.value[key].score = 0;
    }

    questions.value.forEach((q) => {
      q.value = -1;
    });

    restOfQuestions.value = questions.value.length;
  };

  return {
    questions,
    isDone,
    result,
    maxThemeCode,
    calculateValueOfQuestion,
    calcualteResult,
    init,
  };
});
