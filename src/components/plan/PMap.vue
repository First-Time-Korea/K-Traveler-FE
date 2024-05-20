<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { storeToRefs } from "pinia";
import { usePlanStore } from "@/stores/plan.js";

const planStore = usePlanStore();
const { places, clickedDate } = storeToRefs(planStore); //AttractionListVue: (travelPlans, selectedDate) 와 동일

const appKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

var markers = [];
let map = null;
var clusterer;

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        initMap();
    } else {
        loadScript();
    }
});

const initMap = () => {
    const container = document.getElementById("map");
    const options = {
        center: new kakao.maps.LatLng(35.95, 128.25),
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

const loadScript = () => {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
};

watch(() => clickedDate.value, () => {
    if (places.value[clickedDate.value] && places.value[clickedDate.value].length > 0) {
        displayPlaces(places.value[clickedDate.value]);
    } else if (places.value[clickedDate.value]) {
        initMap();
    }
}, { deep: true });

watch(() => places.value, () => {
    console.log(places.value[clickedDate.value].length)
    if (places.value[clickedDate.value] && places.value[clickedDate.value].length > 0) {
        displayPlaces(places.value[clickedDate.value]);
    } else if (places.value[clickedDate.value]) {
        initMap();
    }
}, { deep: true });

function displayPlaces(places) {
    var bounds = new kakao.maps.LatLngBounds();
    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    console.log("새로 찍을 장소들", places);
    for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].latitude, places[i].longitude);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        addMarker(placePosition, i)
        console.log(markers)

        bounds.extend(placePosition);
    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
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

    console.log("marker", marker);
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
        <!-- 날짜별로 관광지 객체 가져오기 -->
        <!-- <div class="flex-1 flex px-4">
            <div class="flex flex-col text-gray-700 bg-white w-96 rounded-xl overflow-y-auto">
                <div class="selected-container scroll">
                    <div v-if="places[clickedDate] && places[clickedDate].length > 0">
                        <div v-for="(attraction, index) in places[clickedDate]" :key="index">
                            <div class="m-3 p-3 bg-second-50 rounded-md">
                                {{ attraction }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped></style>