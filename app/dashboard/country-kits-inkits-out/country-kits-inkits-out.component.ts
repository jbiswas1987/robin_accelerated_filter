import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4geodataWorldLow from "@amcharts/amcharts4-geodata/worldLow"

@Component({
  selector: 'app-country-kits-inkits-out',
  templateUrl: './country-kits-inkits-out.component.html',
  styleUrls: ['./country-kits-inkits-out.component.less']
})
export class CountryKitsInkitsOutComponent implements AfterViewInit {

  chart : any
  constructor() {}
  cities = {};

  countries = [{
    id: 1, name: 'France', cities: ['Paris', 'Marseille', 'Nice']
  },
  {
    id: 2, name: 'Germany', cities: ['Hamburg', 'Berlin', 'Munich']
  },
  {
    id: 3, name: 'Italy', cities: ['Roma', 'Milan', 'Napoli']
  },
  ];

  onChange(deviceValue) {
    this.cities = this.countries.filter(x => x.id == deviceValue)[0].name;
    
  }

  ngAfterViewInit() {
    /* Create map instance */
    this.chart = am4core.create("chartdiv", am4maps.MapChart);

    /* Set map definition */
    this.chart.geodata = am4geodataWorldLow;
   

    // Set projection
    this.chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#dbdbdb");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#808080");
//this.chart.zoomControl = new am4maps.ZoomControl();
// Remove Antarctica
polygonSeries.exclude = ["AQ"];

// Add some data

for(let i =0; i<this.chart.geodata.features.length; i++){
    if(this.chart.geodata.features[i].properties.name == "India"){
      polygonSeries.data.push({
        "id": "IN",
        "name":this.chart.geodata.features[i].properties.name,
        "value": 100,
        "fill": am4core.color("#32CD32")
      })
    }else if(this.chart.geodata.features[i].properties.name == "France"){
      polygonSeries.data.push({
        "id": "FR",
        "name":this.chart.geodata.features[i].properties.name,
        "value": 100,
        "fill": am4core.color("#32CD32")
      })
    }else if(this.chart.geodata.features[i].properties.name == "United States"){
      polygonSeries.data.push({
        "id": "US",
        "name":this.chart.geodata.features[i].properties.name,
        "value": 100,
        "fill": am4core.color("#ffa500")
      })
    }else if(this.chart.geodata.features[i].properties.name == "Canada"){
      polygonSeries.data.push({
        "id": "CA",
        "name":this.chart.geodata.features[i].properties.name,
        "value": 100,
        "fill": am4core.color("#32CD32")
      })
    }
    else{
      polygonSeries.data.push({ "fill": am4core.color("#5C5CFF")})
    }
  }


// Bind "fill" property to "fill" key in data
polygonTemplate.propertyFields.fill = "fill";

// Create image series
var imageSeries = this.chart.series.push(new am4maps.MapImageSeries());

// Create a circle image in image series template so it gets replicated to all new images
var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#B27799");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{title}";

// Set property fields
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";

// Add data for the three cities
imageSeries.data = [{
  "latitude": 48.856614,
  "longitude": 2.352222,
  "title": "Paris"
}, {
  "latitude": 40.712775,
  "longitude": -74.005973,
  "title": "New York"
}, {
  "latitude": 49.282729,
  "longitude": -123.120738,
  "title": "Vancouver"
}];

  }
}

function createMarkers(chart) {
  console.log("calling createMarkers");
  const demoAddress = { my_lat: 35.6895, my_lng: 139.6917 };
  const mapImageSeries = chart.series.push(new am4maps.MapImageSeries());

  const imageSeriesTemplate = mapImageSeries.mapImages.template;
  const circle = imageSeriesTemplate.createChild(am4core.Circle);
  circle.radius = 10;
  circle.fill = am4core.color("#ff00");
  circle.stroke = am4core.color("#000000");
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.tooltipText = "hi";
  imageSeriesTemplate.propertyFields.latitude = "latitude";
  imageSeriesTemplate.propertyFields.longitude = "longitude";
  // mapImageSeries.data = {
  //   latitude: demoAddress.latitude,
  //   longitude: demoAddress.longitude
  // };
  return chart;
}