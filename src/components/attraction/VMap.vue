<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAttracionStore } from "@/stores/attraction.js";
import { togleBookmark, getAttraction, getAttractionByAI } from "@/api/attraction.js";
import { useMemberStore } from "@/stores/member"

import "@/assets/css/VMap.css";

const memberStore = useMemberStore();
const router = useRouter();
const attractionStore = useAttracionStore();

const { places } = storeToRefs(attractionStore);
const { userInfo } = storeToRefs(memberStore);

const appKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

var markers = [];
let map = null;
var clusterer;

const isModalVisible = ref(false);
const clickedPlace = ref({
    contentId: null,
    title: '',
    addr1: '',
    overView: '',
    firstImage: '',
    isBookmarked: false
});

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        initMap();
    } else {
        loadScript();
    }
});

onUpdated(() => {
});

watch(() => places.value, (newPlaces) => {
    if (newPlaces.length != 0) {
        displayPlaces(newPlaces)
    } else {
        alert("Search item does not exist.")
    }
}, { deep: true })

const loadScript = () => {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
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
        minLevel: 10 // 클러스터 할 최소 지도 레벨 
    });

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
};

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
    removeMarker(); // 기존 마커 제거
    var bounds = new kakao.maps.LatLngBounds();
    var newMarkers = [];

    places.forEach(place => {
        var position = new kakao.maps.LatLng(place.latitude, place.longitude);
        var marker = new kakao.maps.Marker({
            position: position
        });
        kakao.maps.event.addListener(marker, 'click', function () {
            openModal(place.contentId, place.themeCode);
        });
        newMarkers.push(marker);
        bounds.extend(position);
    });

    clusterer.addMarkers(newMarkers); // 클러스터를 사용하면 마커 클러스터가 자동으로 지도에 마커를 추가
    map.setBounds(bounds); // 모든 마커가 보이도록 지도 범위 조정

}

function togleLike(contentId) {
    const bookmarkItem = {
        "memberId": userInfo.value.id,
        "contentId": contentId
    }
    togleBookmark((bookmarkItem),
        (response) => {
            if (response.data.status == "success") {
                changeHeartIcon()
            }
        },
        (error) => {
            console.log(error.data);
        }
    )
}

function changeHeartIcon() {
    clickedPlace.value.isBookmarked = !clickedPlace.value.isBookmarked;
}

function closeModal() {
    clickedPlace.value = {
        contentId: null,
        title: '',
        addr1: '',
        overView: '',
        firstImage: '',
        isBookmarked: false
    };
    isModalVisible.value = false;
}

function openModal(contentId, themeCode) {
    const wantItem = {
        "memberId": userInfo.value.id,
        "contentId": contentId
    }
    if (themeCode === 'E') {
        getAttractionByAI((wantItem),
            (response) => {
                if (response.data.status == "success") {
                    clickedPlace.value = {
                        ...clickedPlace.value,
                        ...response.data.data,
                        isBookmarked: response.data.data.bookmarkId > 0
                    };
                }
            },
            (error) => {
                console.log(error.data);
            }
        )
    } else {
        getAttraction((wantItem),
            (response) => {
                if (response.data.status == "success") {
                    clickedPlace.value = {
                        ...clickedPlace.value,
                        ...response.data.data,
                        isBookmarked: response.data.data.bookmarkId > 0
                    };
                }
            },
            (error) => {
                console.log(error.data);
            }
        )
    }
    isModalVisible.value = true;
}

function removeMarker() {
    clusterer.clear();
    markers = [];
}

</script>

<template>
    <div>
        <div id="map" class="mt-5" style="height: 800px;"></div>
    </div>
    <div v-show="isModalVisible" class="modal" @click.self="closeModal">
        <div class="modal-content">
            <div class="image-container">
                <img v-if="clickedPlace.firstImage" :src="clickedPlace.firstImage" alt="Place image"
                    class="place-image">
                <img v-else src="@/assets/img/no-picture.png" alt="Default image" class="place-image">
                <img src="@/assets/img/like-before.png" v-if="!clickedPlace.isBookmarked" alt="Like" class="like-button"
                    @click="togleLike(clickedPlace.contentId)">
                <img src="@/assets/img/like-after.png" v-else alt="Liked" class="like-button"
                    @click="togleLike(clickedPlace.contentId)">
            </div>
            <div class="title scroll">
                <p class="font-bold">{{ clickedPlace.title }}</p>
                {{ clickedPlace.addr1 }}
            </div>
            <div class=" description scroll">
                {{ clickedPlace.overView }}
            </div>
        </div>
    </div>
</template>

<style scoped></style>
