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
    {
      id: id++,
      text: "I enjoy exploring UNESCO World Heritage sites.",
      theme: theme.value.history.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit national parks and natural reserves.",
      theme: theme.value.nature.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to explore Korean mountains and hiking trails.",
      theme: theme.value.nature.key,
      value: -1,
    },
    {
      id: id++,
      text: "I am interested in scenic coastal views and beaches.",
      theme: theme.value.nature.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy photographing nature scenery.",
      theme: theme.value.nature.key,
      value: -1,
    },
    {
      id: id++,
      text: "I am a fan of K-pop music and idols.",
      theme: theme.value.kCulture.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy watching Korean dramas and movies.",
      theme: theme.value.kCulture.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit locations where famous K-dramas were filmed.",
      theme: theme.value.kCulture.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy watching Korean variety shows.",
      theme: theme.value.kCulture.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy visiting amusement parks and theme parks.",
      theme: theme.value.entertainment.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to experience Korean nightlife.",
      theme: theme.value.entertainment.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit gaming arcades and PC bangs.",
      theme: theme.value.entertainment.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to experience unique Korean spas and jjimjilbangs.",
      theme: theme.value.entertainment.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to go cycling in scenic areas.",
      theme: theme.value.sport.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy doing activities at travel destinations.",
      theme: theme.value.sport.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to try water sports and activities.",
      theme: theme.value.sport.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy hiking and mountain climbing.",
      theme: theme.value.sport.key,
      value: -1,
    },
    {
      id: id++,
      text: "I am interested in visiting contemporary art galleries.",
      theme: theme.value.modernCulture.key,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy exploring modern architecture and urban spaces.",
      theme: theme.value.modernCulture.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to attend contemporary theater and dance performances.",
      theme: theme.value.modernCulture.key,
      value: -1,
    },
    {
      id: id++,
      text: "I want to explore digital art and technology exhibitions.",
      theme: theme.value.modernCulture.key,
      value: -1,
    },
  ]);

  const calculateValueOfQuestion = (id, value) => {
    questions.value.findIndex((question) => {
      if (question.id === id) {
        question.value = value;

        if (value > -1) {
          restOfQuestions.value--;
        } else {
          restOfQuestions.value++;
        }
      }
    });
  };

  const restOfQuestions = ref(questions.value.length);
  const isDone = computed(() => {
    return restOfQuestions.value == 0;
  });

  const calcualteResult = () => {
    questions.value.forEach((question) => {
      theme.value[question.theme].score += question.value;
    });

    let maxScore = -1;
    let maxTheme;
    for (let key in theme.value) {
      if (maxScore < theme.value[key].score) {
        maxScore = theme.value[key].score;
        maxTheme = key;
      }
    }

    console.log(`result: ${maxTheme}`);
  };

  return { questions, isDone, calculateValueOfQuestion, calcualteResult };
});
