<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";

const props = defineProps({
    keyword: String,
    places: Object
});
const appKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;

var markers = [];
var overlays = [];
var positions = [];
let map = null;

const loadScript = () => {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${appKey}&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);
};

const initMap = () => {
    const container = document.getElementById("map");
    const options = {
        center: new kakao.maps.LatLng(36.35559977190671, 127.29859991863871),
        level: 9,
    };
    map = new kakao.maps.Map(container, options);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
};

watch(() => props.places, (places) => {
    displayPlaces(places)
})

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
    // kakao.maps.LatLngBounds()는 카카오맵에서 사용되는 경도 및 위도 좌표의 경계를 정의하는 클래스입니다.
    var bounds = new kakao.maps.LatLngBounds();
    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {
        positions.push({
            title: places[i].addr1,
            latlng_x: places[i].longitude,
            latlng_y: places[i].latitude
        });
    }

    for (var i = 0; i < positions.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].latitude, places[i].longitude);

        displayMarker(places, i);
        bounds.extend(placePosition);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    // menuEl.scrollTop = 0;
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

//지도에 마커 클릭시 오버레이 출력
function displayMarker(places, i) {
    var marker = addMarker(places[i].latitude, places[i].longitude);

    var overlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
    });

    // 이미지가 없다면 준비중으로 대체
    if (places[i].firstImg == "") {
        places[i].firstImg = "/img/preparingimg.jpg";
    }

    var content = document.createElement("div");
    content.classList.add("wrap");
    content.style.cssText = 'position: absolute; 	left: 0; bottom: 20px;	width: 250px;	margin-left: -100px; text-align: left; overflow: hidden;'
    content.innerHTML =
        '<div class="info" style="background: white; border-radius: 5px; box-shadow: 0px 1px 2px #888;">' +
        '<div style="background: #eee; padding: 5px 0 0 10px"> <div class="title" style="display: inline-block;">' +
        places[i].title +
        '</div></div>' +
        '<div class="body" style="padding: 10px">' +
        '<div class="img">' +
        '<img src="' +
        places[i].firstImg +
        '" width="73" height="70">' +
        "</div>" +
        "</div>" +
        '<div class="desc">' +
        '<div class="ellipsis" style="padding: 0px 10px">' +
        places[i].addr1 +
        "</div>" +
        '<div class="jibun ellipsis" style="padding: 0px 10px">' +
        places[i].addr2 +
        "</div>" +
        "</div>" +
        "</div>";

    // <img id="closeBtn" onclick="close()" style="float: right; padding-right: 5px; width: 20px" src="/src/assets/img/icn_close.png"/>
    var closeBtn = document.createElement("button");
    closeBtn.className = "btn btn-primary btn-sm";
    closeBtn.style.cssText = "float : right";
    closeBtn.innerHTML += "<div>닫기</div>";
    closeBtn.onclick = () => {
        overlay.setMap(null);
    }
    content.appendChild(closeBtn);

    // end
    overlay.setContent(content);

    kakao.maps.event.addListener(marker, "click", function () {
        removeOverlay();
        overlay.setMap(map);
    });

    overlays.push(overlay);
    return overlay;
}

function addMarker(latitude, longitude) {
    var imageSrc = "/src/assets/img/trip.png",
        imageSize = new kakao.maps.Size(60, 60),
        imgOptions = {
            spriteSize: new kakao.maps.Size(45),
            spriteOrigin: new kakao.maps.Point(0, 0),
            offset: new kakao.maps.Point(12, 60),
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latitude, longitude), // 위도(latitude), 경도(longitude) 순서로 전달
            // image: markerImage,
        });

    marker.setMap(map);
    markers.push(marker);
    return marker;
}

// 지도 위에 표시되고 있는 마커,오버레이 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    for (var i = 0; i < overlays.length; i++) {
        overlays[i].setMap(null);
    }
    markers = [];
    positions = [];
    overlays = [];
}

//다른 오버레이 클릭시 기존에 열려있던 오버레이 창을 닫음
function removeOverlay() {
    for (var i = 0; i < overlays.length; i++) {
        overlays[i].setMap(null);
    }
}

onMounted(() => {
    if (window.kakao && window.kakao.maps) {
        initMap();
    } else {
        loadScript();
    }
});

onUpdated(() => {
});

</script>

<template>
    <div>
        <div id="map" style="height: 600px;"></div>
    </div>

</template>

<style scoped>
/* @import "/src/assets/css/tourist_spot.css" */

/* #map {
  flex: 1;
} */
</style>
