const locations = {
  seoul: {
    code: 1,
    img: {
      src: "https://cdn.britannica.com/57/75757-050-122EC2ED/Changgyong-Palace-background-Seoul.jpg",
      alt: "Seoul",
    },
  },
  incheon: {
    code: 2,
    img: {
      src: "https://goguides.azureedge.net/media/guxoaooq/f2350b07-6004-4311-899c-e0c01de88a8c.jpg?anchor=center&mode=crop&width=1600&height=1066&quality=50",
      alt: "Incheon",
    },
  },
  daejeon: {
    code: 3,
    img: {
      src: "https://res.heraldm.com/content/image/2015/06/05/20150605001415_0.jpg",
      alt: "Daejeon",
    },
  },
  daegu: {
    code: 4,
    img: {
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTJfMTE4%2FMDAxNjk5Nzk1NTA5Mjg0.LqfVMZX3EM5D1Tr9o_gN7rKhi6fyko7If8WkRQdNuEgg.bIFQAr9lgEBlvcwJhieQA6sE0QUKO0C5CFfMBa3-fpcg.JPEG.bluetime01%2F3X9A9088.jpg&type=sc960_832",
      alt: "Daegu",
    },
  },
  gwangju: {
    code: 5,
    img: {
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTlfMTAw%2FMDAxNzEwODQ3MjgxNzgx.Hzdv3jcQfd_3Vvn-YZSwG4beA1fxizyACofK1g2d7v8g.64cdjBBLWy0D3jWeA6P3u8H3fb87LlAAWyxp1GoM9HUg.JPEG%2FDSC02484-Enhanced-NR.jpg&type=sc960_832",
      alt: "Gwangju",
    },
  },
  busan: {
    code: 6,
    img: {
      src: "https://i.namu.wiki/i/uS37PZN_Dz11o6w2-_TM-rxg9NEbI1RY6Qio5DYWL0dEb-CWdiDUiuU4lPL0LF5ATUM13kJTISSFwyL4aCOXLg.webp",
      alt: "Busan",
    },
  },
  ulsan: {
    code: 7,
    img: {
      src: "https://facts.net/wp-content/uploads/2023/07/32-facts-about-ulsan-1688545372.jpeg",
      alt: "Ulsan",
    },
  },
  sejong: {
    code: 8,
    img: {
      src: "https://marketplace.intelligentcitieschallenge.eu/files/imager/images/city/sejong/22920/sejong_city.JPG_28f048ec435706e3593a4d04ed813319.jpg",
      alt: "Sejong",
    },
  },
  gyeonggcodeo: {
    code: 31,
    img: {
      src: "https://cdn.imweb.me/thumbnail/20230920/4ff21c1655f07.jpg",
      alt: "Gyeonggi-do",
    },
  },
  gangwonDo: {
    code: 32,
    img: {
      src: "https://res.klook.com/image/upload/Mobile/City/xg0vz4w95pq9a90kvgxe.jpg",
      alt: "Gangwon-do",
    },
  },
  chungcheongbukDo: {
    code: 33,
    img: {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixcode=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Chungcheongbuk-do",
    },
  },
  chungcheongnamDo: {
    code: 34,
    img: {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixcode=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Chungcheongnam-do",
    },
  },
  gyeongsangbukDo: {
    code: 35,
    img: {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixcode=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Gyeongsangbuk-do",
    },
  },
  gyeonsangnamDo: {
    code: 36,
    img: {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixcode=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Gyeongsangnam-do",
    },
  },
  jeollabukDo: {
    code: 37,
    img: {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixcode=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Jeollabuk-do",
    },
  },
  jeollanamDo: {
    code: 38,
    img: {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixcode=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Jeollanam-do",
    },
  },
  jejuDo: {
    code: 39,
    img: {
      src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixcode=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80",
      alt: "Jeju-do",
    },
  },
};

export { locations };
