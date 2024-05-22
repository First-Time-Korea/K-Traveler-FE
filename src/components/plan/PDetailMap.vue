<script setup>
import { onMounted, ref, computed, watch } from 'vue';

const props = defineProps({
    planId: Number,
    planTitle: String,
    travelPlans: Object,
    selectedDate: String,
    dateRange: Object
})

const appKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

var markers = [];
let map = null;

onMounted(async () => {
    console.log("지도")
    console.log("컴포넌트 마운트됨");
    console.log("날짜 범위 시작:", props.dateRange);
    console.log("선택된 날짜:", props.selectedDate);
    console.log("여행 계획:", props.travelPlans);
    if (window.kakao && window.kakao.maps) {
        initMap();
        console.log("후에요...", props.travelPlans[props.selectedDate])
        displaytravelPlans(props.travelPlans[props.selectedDate]);
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

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    displaytravelPlans(props.travelPlans[props.selectedDate]);
};

const loadScript = () => {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services,drawing`;
    document.head.appendChild(script);
};

watch(() => props.selectedDate, () => {
    if (props.travelPlans[props.selectedDate]) {
        displaytravelPlans(props.travelPlans[props.selectedDate]);
    } else if (props.travelPlans[props.selectedDate] === undefined) {
        initMap();
    }
});

watch(() => props.travelPlans, () => {
    console.log("변경되었어요", (props.travelPlans[props.selectedDate]))
    if (props.travelPlans[props.selectedDate] && props.travelPlans[props.selectedDate].length > 0) {
        displaytravelPlans(props.travelPlans[props.selectedDate]);
    } else if (props.travelPlans[props.selectedDate]) {
        initMap();
    }
}, { deep: true });

function displaytravelPlans(travelPlans) {
    var bounds = new kakao.maps.LatLngBounds();
    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    for (var i = 0; i < travelPlans.length; i++) { //새로 찍을 장소들
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(travelPlans[i].latitude, travelPlans[i].longitude);
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
    </div>
</template>

<style scoped></style>