
//import {Map, Graphic, SimpleMarkerSymbol, Point} from "../dist";

window.load = () => {
    /*const amap = new AMap.Map("amap", {
        fadeOnZoom: false,
        navigationMode: 'classic',
        optimizePanAnimation: false,
        animateEnable: false,
        dragEnable: false,
        zoomEnable: false,
        resizeEnable: true,
        doubleClickZoom: false,
        keyboardEnable: false,
        scrollWheel: false,
        expandZoomRange: true,
        zooms: [1, 20],
        mapStyle: 'normal',
        features: ['road', 'point', 'bg'],
        viewMode: '2D'
    });

    const map = new Map("foo");
    map.on("extent", (event) => {
        amap.setZoomAndCenter(event.zoom, event.center);
    });
    map.setView([116.397411,39.909186], 12);*/

    const canvas = document.getElementById("canvas");
    canvas.addEventListener("touchstart", (event)=>{
        event.preventDefault();
        console.log("touchstart");
    },false);
    canvas.addEventListener("touchmove", (event)=>{
        event.preventDefault();
        console.log("touchmove");
    },false);
    canvas.addEventListener("touchend", (event)=>{
        console.log("touchend");
    },false);
    canvas.addEventListener("mousedown", (event)=>{
        console.log("mousedown");
    },false);
    canvas.addEventListener("mousemove", (event)=>{
        console.log("mousemove");
    },false);
    canvas.addEventListener("mouseup", (event)=>{
        console.log("mouseup");
    },false);
    canvas.addEventListener("wheel", (event)=>{
        console.log("wheel");
    },false);
}

//cause typescript tsc forget js suffix for geometry.js