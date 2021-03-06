import React from "react";
import axios from "axios";
import _ from "lodash";
import Credentials from "../helpers/credentials.js";

let google = window.google;
const options = {
    colorAxis: { colors: ["red", "orange", "green"] }
};

let formatJson = (json) => {
    let keys = Object.keys(json);
    let array = [];
    keys.forEach(function (key, index){
        let value = json[key];
        if(!_.isUndefined(value)) {
            array.push([key, value]);
        }
    });
    return array;
};

let renderMap = () => {
    google.charts.load("current", {
        "packages": ["geochart"],
        "mapsApiKey": Credentials.GeoChartKey
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
}

let drawRegionsMap = () => {
    let chart = new google.visualization.GeoChart(document.getElementById("map"));
    axios.get("http://localhost:3001/data")
        .then((res) => {
            let dataTable = formatJson(res.data);
            chart.draw(google.visualization.arrayToDataTable(dataTable), options);
        });
}
export default class Map extends React.PureComponent {
    componentDidMount() {
        renderMap();
    }

    render() {
        return (
            <div id="rotate">
                <div id="map"></div>
            </div>
        );
    }
}
