import { ref } from "vue";

const theme = {
    food: "A",
    shopping: "B",
    history: "C",
    nature: "D",
    kCulture: "E",
    entertainment: "F",
    modernCulture: "H"
}

const questions = ref([
  {
      id: 1,
      text: "I enjoy trying local cuisine when traveling.",
      theme: theme.food,
      value: -1
    },
    {
      id: 2,
      text: "Food quality is important to me when choosing a travel destination.",
      theme: theme.food,
      value: -1,
    },
    {
      id: 3,
      text: "I am familiar with Korea's 'chimaek' culture.",
      theme: theme.food,
      value: -1,
    },
    {
      id: 4,
      text: "I find trying exotic and unfamiliar foods exciting.",
      theme: theme.food,
      value: -1,
    },
    {
      id: 5,
      text: "I enjoy shopping for local products and souvenirs when traveling.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: 6,
      text: "I want to visit traditional Korean markets.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: 7,
      text: "Shopping is important to me when choosing a travel destination.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: 8,
      text: "I am familiar with K-Beauty in Korea.",
      theme: theme.shopping,
      value: -1,
    },
    {
      id: 9,
      text: "I am interested in exploring historical sites and monuments.",
      theme: theme.history,
      value: -1,
    },
    {
      id: 10,
      text: "I want to experience traditional Korean culture.",
      theme: theme.history,
      value: -1,
    },
    {
      id: 11,
      text: "I am familiar with hanok and hanbok.",
      theme: theme.history,
      value: -1,
    },
    {
      id: 12,
      text: "I enjoy exploring UNESCO World Heritage sites.",
      theme: theme.history,
      value: -1,
    },
    {
      id: 13,
      text: "I want to visit national parks and natural reserves.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: 14,
      text: "I want to explore Korean mountains and hiking trails.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: 15,
      text: "I am interested in scenic coastal views and beaches.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: 16,
      text: "I enjoy photographing nature scenery.",
      theme: theme.nature,
      value: -1,
    },
    {
      id: 17,
      text: "I am a fan of K-pop music and idols.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: 18,
      text: "I enjoy watching Korean dramas and movies.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: 19,
      text: "I want to visit locations where famous K-dramas were filmed.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: 20,
      text: "I enjoy watching Korean variety shows.",
      theme: theme.kCulture,
      value: -1,
    },
    {
      id: 21,
      text: "I enjoy visiting amusement parks and theme parks.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: 22,
      text: "I want to experience Korean nightlife.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: 23,
      text: "I want to visit gaming arcades and PC bangs.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: 24,
      text: "I want to experience unique Korean spas and jjimjilbangs.",
      theme: theme.entertainment,
      value: -1,
    },
    {
      id: 25,
      text: "I want to go cycling in scenic areas.",
      theme: theme.G,
      value: -1,
    },
    {
      id: 26,
      text: "I enjoy doing activities at travel destinations.",
      theme: theme.G,
      value: -1,
    },
    {
      id: 27,
      text: "I want to try water sports and activities.",
      theme: theme.G,
      value: -1,
    },
    {
      id: 28,
      text: "I enjoy hiking and mountain climbing.",
      theme: theme.G,
      value: -1,
    },
    {
      id: 29,
      text: "I am interested in visiting contemporary art galleries.",
      theme: theme.modernCulture,
      value: -1,
    },
    {
      id: 30,
      text: "I enjoy exploring modern architecture and urban spaces.",
      theme: theme.modernCulture,
      value: -1,
    },
    {
      id: 31,
      text: "I want to attend contemporary theater and dance performances.",
      theme: theme.modernCulture,
      value: -1,
    },
    {
      id: 32,
      text: "I want to explore digital art and technology exhibitions.",
      theme: theme.modernCulture,
      value: -1,
    }
]);
  
export { questions };