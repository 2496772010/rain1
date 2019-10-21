import VectorLayer from "ol/layer/Vector"
import ImageLayer from "ol/layer/Image"
import VectorSource from "ol/source/Vector"
import ImageCanvas from "ol/source/ImageCanvas"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import Feature from "ol/Feature"
import {Point,Polygon} from "ol/geom"
import {Style,Fill,Circle} from "ol/style"
import kriging from '../config/kriging'
import data from "../assets/data1.json"


let mapconfig={}
mapconfig.params = {
    mapCenter: [116.40, 39.90],
    krigingModel: 'exponential',//model还可选'gaussian','spherical'
    krigingSigma2: 0,
    krigingAlpha: 226,
    canvasAlpha: 0.75,//canvas图层透明度
    colors: ["#00A600", "#01A600", "#03A700", "#04A700", "#05A800", "#07A800", "#08A900", "#09A900", "#0BAA00", "#0CAA00", "#0DAB00", "#0FAB00", "#10AC00", "#12AC00", "#13AD00", "#14AD00", "#16AE00", "#17AE00", "#19AF00", "#1AAF00", "#1CB000", "#1DB000", "#1FB100", "#20B100", "#22B200", "#23B200", "#25B300", "#26B300", "#28B400", "#29B400", "#2BB500", "#2CB500", "#2EB600", "#2FB600", "#31B700", "#33B700", "#34B800", "#36B800", "#37B900", "#39B900", "#3BBA00", "#3CBA00", "#3EBB00", "#3FBB00", "#41BC00", "#43BC00", "#44BD00", "#46BD00", "#48BE00", "#49BE00", "#4BBF00", "#4DBF00", "#4FC000", "#50C000", "#52C100", "#54C100", "#55C200", "#57C200", "#59C300", "#5BC300", "#5DC400", "#5EC400", "#60C500", "#62C500", "#64C600", "#66C600", "#67C700", "#69C700", "#6BC800", "#6DC800", "#6FC900", "#71C900", "#72CA00", "#74CA00", "#76CB00", "#78CB00", "#7ACC00", "#7CCC00", "#7ECD00", "#80CD00", "#82CE00", "#84CE00", "#86CF00", "#88CF00", "#8AD000", "#8BD000", "#8DD100", "#8FD100", "#91D200", "#93D200", "#95D300", "#97D300", "#9AD400", "#9CD400", "#9ED500", "#A0D500", "#A2D600", "#A4D600", "#A6D700", "#A8D700", "#AAD800", "#ACD800", "#AED900", "#B0D900", "#B2DA00", "#B5DA00", "#B7DB00", "#B9DB00", "#BBDC00", "#BDDC00", "#BFDD00", "#C2DD00", "#C4DE00", "#C6DE00", "#C8DF00", "#CADF00", "#CDE000", "#CFE000", "#D1E100", "#D3E100", "#D6E200", "#D8E200", "#DAE300", "#DCE300", "#DFE400", "#E1E400", "#E3E500", "#E6E600", "#E6E402", "#E6E204", "#E6E105", "#E6DF07", "#E6DD09", "#E6DC0B", "#E6DA0D", "#E6D90E", "#E6D710", "#E6D612", "#E7D414", "#E7D316", "#E7D217", "#E7D019", "#E7CF1B", "#E7CE1D", "#E7CD1F", "#E7CB21", "#E7CA22", "#E7C924", "#E8C826", "#E8C728", "#E8C62A", "#E8C52B", "#E8C42D", "#E8C32F", "#E8C231", "#E8C133", "#E8C035", "#E8BF36", "#E9BE38", "#E9BD3A", "#E9BC3C", "#E9BB3E", "#E9BB40", "#E9BA42", "#E9B943", "#E9B945", "#E9B847", "#E9B749", "#EAB74B", "#EAB64D", "#EAB64F", "#EAB550", "#EAB552", "#EAB454", "#EAB456", "#EAB358", "#EAB35A", "#EAB35C", "#EBB25D", "#EBB25F", "#EBB261", "#EBB263", "#EBB165", "#EBB167", "#EBB169", "#EBB16B", "#EBB16C", "#EBB16E", "#ECB170", "#ECB172", "#ECB174", "#ECB176", "#ECB178", "#ECB17A", "#ECB17C", "#ECB17E", "#ECB27F", "#ECB281", "#EDB283", "#EDB285", "#EDB387", "#EDB389", "#EDB38B", "#EDB48D", "#EDB48F", "#EDB591", "#EDB593", "#EDB694", "#EEB696", "#EEB798", "#EEB89A", "#EEB89C", "#EEB99E", "#EEBAA0", "#EEBAA2", "#EEBBA4", "#EEBCA6", "#EEBDA8", "#EFBEAA", "#EFBEAC", "#EFBFAD", "#EFC0AF", "#EFC1B1", "#EFC2B3", "#EFC3B5", "#EFC4B7", "#EFC5B9", "#EFC7BB", "#F0C8BD", "#F0C9BF", "#F0CAC1", "#F0CBC3", "#F0CDC5", "#F0CEC7", "#F0CFC9", "#F0D1CB", "#F0D2CD", "#F0D3CF", "#F1D5D1", "#F1D6D3", "#F1D8D5", "#F1D9D7", "#F1DBD8", "#F1DDDA", "#F1DEDC", "#F1E0DE", "#F1E2E0", "#F1E3E2", "#F2E5E4", "#F2E7E6", "#F2E9E8", "#F2EBEA", "#F2ECEC", "#F2EEEE", "#F2F0F0", "#F2F2F2"]
};
mapconfig.baseLayer=new TileLayer({
    title:'base',
    source: new OSM()
});
let WFSVectorSource =new VectorSource();
mapconfig.WFSVectorLayer =new VectorLayer({
    source:WFSVectorSource
});
for(let i=0;i<data.features.length;i++){
    let feature=new Feature({
        geometry:new Point([data.features[i].attributes.x,data.features[i].attributes.y])
        ,value:data.features[i].attributes.z
    });
    feature.setStyle(new Style({
        image:new Circle({
            radius:6,
            fill:new Fill({color:"#00F"})
        })
    }));
    WFSVectorSource.addFeature(feature);
}
//定义裁剪边界
let coord = [[
    [117.315375, 40.181212],
    [117.367916, 40.135762],
    [116.751758, 40.002595],
    [116.754136, 39.870341],
    [116.913383, 39.804999],
    [116.901858, 39.680614],
    [116.788145, 39.56255],
    [116.535646, 39.590346],
    [116.392103, 39.491124],
    [116.4293, 39.433841],
    [116.387072, 39.417336],
    [116.237232, 39.476253],
    [116.172242, 39.578854],
    [115.728745, 39.479123],
    [115.610225, 39.588658],
    [115.508537, 39.59137],
    [115.416399, 39.733407],
    [115.416624, 39.776734],
    [115.550565, 39.772964],
    [115.408433, 40.015829],
    [115.85422, 40.144999],
    [115.922315, 40.216777],
    [115.708758, 40.499032],
    [115.89819, 40.585919],
    [116.03778, 40.577909],
    [116.208725, 40.741562],
    [116.454984, 40.739689],
    [116.297615, 40.910402],
    [116.43816, 40.870116],
    [116.405424, 40.94854],
    [116.537137, 40.9661],
    [116.621495, 41.057333],
    [116.703349, 40.853574],
    [116.93405, 40.675155],
    [117.454502, 40.647216],
    [117.387854, 40.533274],
    [117.166811, 40.503979],
    [117.164198, 40.373887],
    [117.315375, 40.181212]]];
let clipgeom=new Polygon(coord);
//绘制Kriging插值图
mapconfig.canvasLayer=null;
let  drawKriging=function (extent) {
    let values=[],lngs=[],lats=[];
    WFSVectorSource.forEachFeature(function (feature) {
        values.push(feature.getProperties().value);
        lngs.push(feature.getGeometry().getCoordinates()[0]);
        lats.push(feature.getGeometry().getCoordinates()[1]);
    })
// console.log(values.length);
    if(values.length>3){
        let  letiogram=kriging.train(values,lngs,lats,"exponential",0,226);
        let ex=clipgeom.getExtent();
        let grid=kriging.grid(coord,letiogram,(ex[2]-ex[0])/500);
        window.console.log(extent);
        mapconfig.canvasLayer=new ImageLayer({

            source:new ImageCanvas({
                    canvasFunction:(extent,resolution,pixelRatio,size)=>{
                    // console.log(extent);
                    let canvas=document.createElement('canvas');
                    canvas.width = size[0];
                    canvas.height = size[1];
                    canvas.style.display = 'block';
                    //设置canvas透明度
                    canvas.getContext('2d').globalAlpha = 0.75;
                    //使用分层设色渲染
                    kriging.plot(canvas, grid,
                        [extent[0], extent[2]], [extent[1], extent[3]], mapconfig.params.colors);
                    return canvas;
                },
                projection: "EPSG:4326"
            })
        })
    }
}
//首次加载，自动渲染一次插值图
let extent=clipgeom.getExtent();
drawKriging(extent);
export default mapconfig;
