<template>
    <div id="map" ref="basemap">

    </div>

</template>

<script>
    import "ol/ol.css"
    import {Map, View} from "ol"
    import BingMap from "ol/source/BingMaps"
    import TileLayer from "ol/layer/Tile"
    import mapconfig from "@/config/mapconfig";
    import data1 from "../assets/data1.json"

    export default {
        name: "olmap",
        data() {
            return {
                map: null,
                da: data1
            }
        },
        mounted() {
            this.map = new Map ( {
                target: this.$refs.basemap,
                layers: [
                    new TileLayer ( {
                        source: new BingMap ( {
                            imagerySet: "RoadOnDemand",
                            key: "AlLWcZPikbKPRGmqGgngDWtCDrkjMwSerppKGvDovTZ3VEDtUGCzI-nlYtUwrwTG\n"
                        } )
                    } )
                ],
                view: new View ( {
                    projection: "EPSG:4326",
                    center: [116.40, 39.90],
                    zoom: 5
                } )
            } );

            this.map.addLayer(mapconfig.canvasLayer)
            this.map.addLayer(mapconfig.WFSVectorLayer)

        },
        methods:{
            datajson:function () {
                alert(this.da)
            }
        }
    }
</script>

<style>
    #map {
        height: 100%;
    }

    /*隐藏ol的一些自带元素*/
    .ol-attribution, .ol-zoom {
        display: none;
    }


</style>
