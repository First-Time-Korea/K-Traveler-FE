const {VITE_VUE_KCULTURE_FILE_URL} = import.meta.env;

const kCultures = {
    drama: [
        {
            code: "E01",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}drama/mr-sunshine.jpg`,
                alt: "K-Drama: Mr.Sunshine"
            }
        }, 
        {
            code: "E01",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}drama/answer-me-1988.jpg`,
                alt: "K-Drama: Answer me 1988"
            }
        }, 
        {
            code: "E01",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}drama/kingdom.jpg`,
                alt: "K-Drama: Kingdom"
            }
        }, 
        {
            code: "E01",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}drama/twenty-five-twenty-one.jpg`,
                alt: "K-Drama: Twenty-Five Twenty-One"
            }
        }
    ],
    movie: [
        {
            code: "E02",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}movie/parasite.jpg`,
                alt: "K-Movie: Parasite"
            }
        }, 
        {
            code: "E02",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}movie/christmas-in-august.jpg`,
                alt: "K-Movie: Christmas in August"
            }
        }, 
        {
            code: "E02",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}movie/brotherhood.jpg`,
                alt: "K-Movie: Brotherhood"
            }
        }, 
        {
            code: "E02",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}movie/little-forest.jpg`,
                alt: "K-Movie: Little Forest"
            }
        }
    ],
    entertainment: [
        {
            code: "E03",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}entertainment/house-on-wheels.jpg`,
                alt: "K-Entertainment: House on Wheels"
            }
        }, 
        {
            code: "E03",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}entertainment/one-night-two-days.jpg`,
                alt: "K-Entertainment: One Night Two Days"
            }
        }, 
        {
            code: "E03",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}entertainment/running-man.jpg`,
                alt: "K-Entertainment: Running Man"
            }
        }, 
        {
            code: "E03",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}entertainment/seoul-hillbilly.jpg`,
                alt: "K-Entertainment: Seoul Hillbilly"
            }
        }
    ],
    artist: [
        {
            code: "E04",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}artist/damyang-metasequoia-lined-road.jpg`,
                alt: "K-Artist: Damyang Metasequoia-lined Road(Yu Yeon-seok)"
            }
        }, 
        {
            code: "E04",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}artist/bukhansan-mountain.jpg`,
                alt: "K-Artist: Bukhansan Mountain(Gian84)"
            }
        },
        {
            code: "E04",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}artist/mt-hanlla.jpg`,
                alt: "K-Artist: Mt.Hanlla(Kwon Yu-ri)"
            }
        },
        {
            code: "E04",
            img: {
                src: `${VITE_VUE_KCULTURE_FILE_URL}artist/hyangho-beach.jpg`,
                alt: "K-Artist: Hyangho Beach(BTS)"
            }
        }
    ]
}

export { kCultures };