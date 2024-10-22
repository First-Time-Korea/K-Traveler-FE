<script setup>
import { onMounted, onUnmounted, onBeforeMount, onUpdated, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAttracionStore } from "@/stores/attraction.js";
import { togleBookmark, getAttraction, getAttractionByAI } from "@/api/attraction.js";
import { useMemberStore } from "@/stores/member";
import { kCultures } from "@/assets/js/KCulture";

import "@/assets/css/VMap.css";

const memberStore = useMemberStore();
const router = useRouter();
const attractionStore = useAttracionStore();

const { places } = storeToRefs(attractionStore);
const { userInfo } = storeToRefs(memberStore);

const appKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;
places.value = [
    {
        latitude: 37.5642135,
        longitude: 127.0016985,
    },
]; //초기값 세팅
var markers = [];
let map = null;
var clusterer = null;

const isModalVisible = ref(false);
const clickedPlace = ref({
    contentId: null,
    title: "",
    addr1: "",
    overView: "",
    firstImage: "",
    isBookmarked: false,
});

onBeforeMount(() => {
    console.log("되거라~~~ BoforeMount")
    loadScript();
}),

    onMounted(() => {
        if (window.kakao && window.kakao.maps) {
            initMap();
        } else {
            loadScript()
                .then(initMap) // Initialize the map after the script is loaded
                .catch(error => {
                    console.error('Failed to load the Kakao Maps script:', error);
                });
        }
    });

onUpdated(() => { });

onUnmounted(() => {
    if (places.value) {
        places.value = [];
    }
});

const loadScript = () => {
    // const script = document.createElement("script");
    // script.onload = () => kakao.maps.load(initMap);
    // script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services,clusterer,drawing`;
    // document.head.appendChild(script);
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.onload = () => {
            kakao.maps.load(resolve); // Resolve the promise once kakao maps load
        };
        script.onerror = reject; // Reject the promise if there is an error loading the script
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services,clusterer,drawing`;
        document.head.appendChild(script);
    });
};

const initMap = () => {
    const container = document.getElementById("map");
    const options = {
        center: new kakao.maps.LatLng(36.2683, 127.6358),
        level: 12,
    };
    map = new kakao.maps.Map(container, options);

    clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 12, // 클러스터 할 최소 지도 레벨
        maxLevel: 12,
    });

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
};

watch(
    () => places.value,
    (newPlaces) => {
        console.log("watch", newPlaces.value);
        if (newPlaces.length === 0) {
            alert("Search results do not exist.");
            return;
        }
        if (newPlaces.length !== 0 || window.kakao && window.kakao.maps) {
            setTimeout(displayPlaces(newPlaces), 200); //지도 불러오기 전에 좌표 찍으려고 하는 것 임시 해결
        } else {
            alert("Search results do not exist.");
        }
    },
    { deep: true }
);

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
    removeMarker(); // 기존 마커 제거
    var bounds = new kakao.maps.LatLngBounds();
    var newMarkers = [];

    places.forEach((place) => {
        var position = new kakao.maps.LatLng(place.latitude, place.longitude);
        var marker = new kakao.maps.Marker({
            position: position,
        });
        kakao.maps.event.addListener(marker, "click", function () {
            openModal(place.contentId, place.themeCode);
        });
        newMarkers.push(marker);
        bounds.extend(position);
    });

    console.log("displayPlaces clusterer", clusterer);
    clusterer.addMarkers(newMarkers); // 클러스터를 사용하면 마커 클러스터가 자동으로 지도에 마커를 추가
    map.setBounds(bounds); // 모든 마커가 보이도록 지도 범위 조정
}

function togleLike(contentId) {
    const bookmarkItem = {
        memberId: userInfo.value.id,
        contentId: contentId,
    };
    togleBookmark(
        bookmarkItem,
        (response) => {
            if (response.data.status == "success") {
                changeHeartIcon();
            }
        },
        (error) => {
            console.log(error.data);
        }
    );
}

function changeHeartIcon() {
    clickedPlace.value.isBookmarked = !clickedPlace.value.isBookmarked;
}

function closeModal() {
    clickedPlace.value = {
        contentId: null,
        title: "",
        addr1: "",
        overView: "",
        firstImage: "",
        isBookmarked: false,
    };
    isModalVisible.value = false;
}

function openModal(contentId, themeCode) {
    const wantItem = {
        memberId: userInfo.value.id,
        contentId: contentId,
    };
    if (themeCode === "E") {
        getAttractionByAI(
            wantItem,
            (response) => {
                if (response.data.status == "success") {
                    clickedPlace.value = {
                        ...clickedPlace.value,
                        ...response.data.data,
                        isBookmarked: response.data.data.bookmarkId > 0,
                    };
                    console.log("clickedPlace", clickedPlace.value);
                    clickedPlace.value.firstImage = loadKCultureImg(response.data.data.categoryCode);
                }
            },
            (error) => {
                console.log(error.data);
            }
        );
    } else {
        getAttraction(
            wantItem,
            (response) => {
                if (response.data.status == "success") {
                    clickedPlace.value = {
                        ...clickedPlace.value,
                        ...response.data.data,
                        isBookmarked: response.data.data.bookmarkId > 0,
                    };
                }
                console.log("clickedPlace", clickedPlace.value);
            },
            (error) => {
                console.log(error.data);
            }
        );
    }
    isModalVisible.value = true;
}

function removeMarker() {
    console.log("removeMarker clusterer", clusterer);
    if (clusterer != null) {
        clusterer.clear();
    }
    markers = [];
}

const loadKCultureImg = (categoryCode) => {
    let imgs;
    switch (categoryCode) {
        case "E01":
            imgs = kCultures.drama;
            break;
        case "E02":
            imgs = kCultures.movie;
            break;
        case "E03":
            imgs = kCultures.entertainment;
            break;
        case "E04":
            imgs = kCultures.artist;
            break;
    }

    let index = Math.floor(Math.random() * imgs.length);
    return imgs[index].img.src;
};
</script>

<template>
    <div>
        <div id="map" class="mt-5" style="height: 800px"></div>
    </div>
    <div v-show="isModalVisible" class="modal" @click.self="closeModal">
        <div class="modal-content">
            <div class="image-container">
                <img v-if="clickedPlace.firstImage" :src="clickedPlace.firstImage" alt="Place image"
                    class="place-image" />
                <img v-else src="@/assets/img/no-picture.png" alt="Default image" class="place-image" />
                <img src="@/assets/img/like-before.png" v-if="!clickedPlace.isBookmarked" alt="Like" class="like-button"
                    @click="togleLike(clickedPlace.contentId)" />
                <img src="@/assets/img/like-after.png" v-else alt="Liked" class="like-button"
                    @click="togleLike(clickedPlace.contentId)" />
            </div>
            <div class="title scroll">
                <p class="font-bold">{{ clickedPlace.title }}</p>
                {{ clickedPlace.addr1 }}
            </div>
            <div class="description scroll">
                {{ clickedPlace.overView }}
            </div>
        </div>
    </div>
</template>

<style scoped></style>