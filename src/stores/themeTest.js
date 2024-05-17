import { ref, computed } from "vue";
import { defineStore } from "pinia/dist/pinia";

export const useThemeTestStore = defineStore("themeTest", () => {
  const theme = {
    food: "A",
    shopping: "B",
    history: "C",
    nature: "D",
    kCulture: "E",
    entertainment: "F",
    sport: "G",
    modernCulture: "H",
  };

  let id = 0;
  const questions = ref([
    {
      id: id++,
      text: "I enjoy trying local cuisine when traveling.",
      theme: theme.food,
      value: -1,
    },
    {
      id: id++,
      text: "Food quality is important to me when choosing a travel destination.",
      theme: theme.food,
      value: -1,
    },
    {
      id: id++,
      text: "I am familiar with Korea's 'chimaek' culture.",
      theme: theme.food,
      value: -1,
    },
    {
      id: id++,
      text: "I find trying exotic and unfamiliar foods exciting.",
      theme: theme.food,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy shopping for local products and souvenirs when traveling.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit traditional Korean markets.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: id++,
      text: "Shopping is important to me when choosing a travel destination.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: id++,
      text: "I am familiar with K-Beauty in Korea.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: id++,
      text: "I am interested in exploring historical sites and monuments.",
      theme: theme.history,
      value: -1,
    },
    {
      id: id++,
      text: "I want to experience traditional Korean culture.",
      theme: theme.history,
      value: -1,
    },
    {
      id: id++,
      text: "I am familiar with hanok and hanbok.",
      theme: theme.history,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy exploring UNESCO World Heritage sites.",
      theme: theme.history,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit national parks and natural reserves.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: id++,
      text: "I want to explore Korean mountains and hiking trails.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: id++,
      text: "I am interested in scenic coastal views and beaches.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy photographing nature scenery.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: id++,
      text: "I am a fan of K-pop music and idols.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy watching Korean dramas and movies.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit locations where famous K-dramas were filmed.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy watching Korean variety shows.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy visiting amusement parks and theme parks.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: id++,
      text: "I want to experience Korean nightlife.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: id++,
      text: "I want to visit gaming arcades and PC bangs.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: id++,
      text: "I want to experience unique Korean spas and jjimjilbangs.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: id++,
      text: "I want to go cycling in scenic areas.",
      theme: theme.sport,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy doing activities at travel destinations.",
      theme: theme.sport,
      value: -1,
    },
    {
      id: id++,
      text: "I want to try water sports and activities.",
      theme: theme.sport,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy hiking and mountain climbing.",
      theme: theme.sport,
      value: -1,
    },
    {
      id: id++,
      text: "I am interested in visiting contemporary art galleries.",
      theme: theme.modernCulture,
      value: -1,
    },
    {
      id: id++,
      text: "I enjoy exploring modern architecture and urban spaces.",
      theme: theme.modernCulture,
      value: -1,
    },
    {
      id: id++,
      text: "I want to attend contemporary theater and dance performances.",
      theme: theme.modernCulture,
      value: -1,
    },
    {
      id: id++,
      text: "I want to explore digital art and technology exhibitions.",
      theme: theme.modernCulture,
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
    console.log(isDone);
    return restOfQuestions.value == 0;
  });

  return { questions, isDone, calculateValueOfQuestion };
});
