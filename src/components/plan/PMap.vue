<script setup>
import { onMounted, onBeforeMount, ref, computed, watch } from 'vue';
import { storeToRefs } from "pinia";
import { usePlanStore } from "@/stores/plan.js";

const planStore = usePlanStore();
const { places, clickedDate } = storeToRefs(planStore); //AttractionListVue: (travelPlans, selectedDate) 와 동일

const appKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

var markers = [];
let map = null;

onBeforeMount(() => {
    loadScript();
});

onMounted(async () => {
    // if (window.kakao && window.kakao.maps) {
    //     initMap();
    // } else {
    //     loadScript();
    // }
});

const initMap = () => {
    const container = document.getElementById("map");
    const options = {
        center: new kakao.maps.LatLng(35.95, 128.25),
        level: 12,
    };
    map = new kakao.maps.Map(container, options);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
};

const loadScript = () => {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services`;
    document.head.appendChild(script);
};

watch(() => clickedDate.value, () => {
    if (places.value[clickedDate.value]) {
        displayPlaces(places.value[clickedDate.value]);
    } else if (places.value[clickedDate.value] === undefined) {
        removeMarker();
    }
}, { deep: true });

watch(() => places.value, () => {
    console.log(places.value[clickedDate.value].length)
    if (places.value[clickedDate.value] && places.value[clickedDate.value].length > 0) {
        displayPlaces(places.value[clickedDate.value]);
    } else if (places.value[clickedDate.value] === undefined) {
        removeMarker();
    }
}, { deep: true });

function displayPlaces(places) {
    var bounds = new kakao.maps.LatLngBounds();
    removeMarker();
    for (var i = 0; i < places.length; i++) { //새로 찍을 장소들
        var placePosition = new kakao.maps.LatLng(places[i].latitude, places[i].longitude);
        addMarker(placePosition, i)
        console.log(markers)
        bounds.extend(placePosition);
    }
    map.setBounds(bounds);
}

function addMarker(position, idx) {
    console.log("addMarker", position, idx)
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다
    return marker;
}

function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

</script>

<template>
    <div>
        <div>
            <div id="map" class="mt-5 me-6" style="height: 670px;"></div>
        </div>
    </div>
</template>

<style scoped></style>