import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/dashboard/dashboard.service";

@Component({
  selector: 'app-exacta-pivot',
  templateUrl: './exacta-pivot.component.html',
  styleUrls: ['./exacta-pivot.component.less']
})
export class ExactaPivotComponent implements OnInit {
  
  // title :any ;
  // type :any;
  // columnNames :any ;
  // options : any;
  // private datavalue  =[];
  // private dataItems =[]
  // private data=[];

  
  constructor(private dataService: DashboardService,) {
    
    // this.dataService.getExactaData().subscribe((dataRows) => {
    //   this.datavalue = dataRows;
    //   for(let k=0; k< this.datavalue.length;k++){
    //     // this.dataItems.push([this.datavalue[k].Due_Month,this.datavalue[k].Due_Month,5])
    //     this.dataItems.push({
    //       due_month:this.datavalue[k].Due_Month,ship_month:this.datavalue[k].Ship_Month,kits:5
    //     })
    //   }
      
    //   // for(const datas of dataRows){
      
    //   //  this.datavalue.push([datas.Due_Month])
    //   // }
    //   this.datavalue =[]
    //   this.title = "Sankey"
    //   this.options ={}

    //  this.datavalue.push(this.dataItems)
    //  this.data = this.datavalue
    
    //   this.columnNames = ["Due_Month","Ship_Month", "Kits"]
    //   console.log('value'+this.data)
    //   this.height = 550

      
    //   console.log('@@@@@@@'+ JSON.stringify(this.dataItems))
    //   this.showLoading = false
    // });

   }

  ngOnInit() {
  }
  colors = ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f',
  '#cab2d6', '#ffff99', '#1f78b4', '#33a02c'];

  title = "";
  type = "Sankey";
  data = [["Due:Feb-2014","Missing Data",5],["Due:May-2015","Missing Data",5],["Due:May-2015","Shipped:Apr-2020",5],["Due:Jul-2015","Shipped:Apr-2020",5],["Due:Sep-2015","Shipped:Apr-2020",5],["Due:Oct-2015","Shipped:Apr-2020",5],["Due:Nov-2015","Shipped:Apr-2020",5],["Due:Nov-2015","Shipped:Apr-2020",5],["Due:Dec-2015","Missing Data",5],["Due:Dec-2015","Shipped:Apr-2020",5],["Due:Jan-2016","Shipped:Apr-2020",5],["Due:Feb-2016","Shipped:Apr-2020",5],["Due:Jun-2016","Shipped:Apr-2020",5],["Due:Jul-2016","Missing Data",5],["Due:Jul-2016","Shipped:Apr-2020",5],["Due:Aug-2016","Shipped:Apr-2020",5],["Due:Nov-2016","Shipped:Apr-2020",5],["Due:Dec-2016","Shipped:Apr-2020",5],["Due:Apr-2017","Shipped:Apr-2020",5],["Due:May-2017","Shipped:Apr-2020",5],["Due:Jun-2017","Missing Data",5],["Due:Jun-2017","Shipped:Apr-2020",5],["Due:Aug-2017","Shipped:Apr-2020",5],["Due:Sep-2017","Missing Data",5],["Due:Sep-2017","Shipped:Apr-2020",5],["Due:Sep-2017","Missing Data",5],["Due:Sep-2017","Shipped:Sep-2017",5],["Due:Sep-2017","Shipped:Apr-2020",5],["Due:Oct-2017","Missing Data",5],["Due:Oct-2017","Shipped:Apr-2020",5],["Due:Oct-2017","Shipped:Apr-2020",5],["Due:Nov-2017","Missing Data",5],["Due:Nov-2017","Shipped:Apr-2020",5],["Due:Dec-2017","Missing Data",5],["Due:Dec-2017","Shipped:Apr-2020",5],["Due:Jan-2018","Shipped:Apr-2020",5],["Due:Jan-2018","Shipped:Apr-2020",5],["Due:Nov-2018","Missing Data",5],["Due:Jul-2029","Missing Data",5],["Due:Oct-2019","Missing Data",5],["Due:Oct-2019","Shipped:Nov-2019",5],["Due:Oct-2019","Shipped:Feb-2020",5],["Due:Nov-2019","Missing Data",5],["Due:Nov-2019","Shipped:Feb-2020",5],["Due:Nov-2019","Missing Data",5],["Due:Nov-2019","Shipped:Feb-2020",5],["Due:Dec-2019","Missing Data",5],["Due:Dec-2019","Shipped:Dec-2019",5],["Due:Dec-2019","Shipped:Jan-2020",5],["Due:Jan-2020","Shipped:Feb-2020",5],["Due:Feb-2020","Shipped:Feb-2020",5],["Due:Jan-2020","Missing Data",5],["Due:Jan-2020","Shipped:Mar-2020",5],["Due:Feb-2020","Missing Data",5],["Due:Feb-2020","Shipped:Feb-2020",5],["Due:Feb-2020","Shipped:Mar-2020",5],["Due:Mar-2020","Missing Data",5],["Due:Mar-2020","Shipped:Feb-2020",5],["Due:Mar-2020","Shipped:Mar-2020",5],["Due:Apr-2020","Shipped:Mar-2020",5],["Due:May-2020","Shipped:Mar-2020",5],["Due:Feb-2020","Missing Data",5],["Due:Feb-2020","Shipped:Feb-2020",5],["Due:Feb-2020","Shipped:Mar-2020",5],["Due:Feb-2020","Shipped:Apr-2020",5],["Due:Feb-2020","Shipped:Jun-2020",5],["Due:Feb-2020","Shipped:Jul-2020",5],["Due:Mar-2020","Missing Data",5],["Due:Mar-2020","Shipped:Feb-2020",5],["Due:Mar-2020","Shipped:Mar-2020",5],["Due:Mar-2020","Shipped:Apr-2020",5],["Due:Apr-2020","Shipped:Mar-2020",5],["Due:Apr-2020","Shipped:Apr-2020",5],["Due:Mar-2020","Missing Data",5],["Due:Mar-2020","Shipped:Mar-2020",5],["Due:Mar-2020","Shipped:Apr-2020",5],["Due:Mar-2020","Shipped:May-2020",5],["Due:Mar-2020","Shipped:Jun-2020",5],["Due:Mar-2020","Shipped:Jul-2020",5],["Due:Mar-2020","Shipped:Sep-2020",5],["Due:Apr-2020","Missing Data",5],["Due:Apr-2020","Shipped:Mar-2020",5],["Due:Apr-2020","Shipped:Apr-2020",5],["Due:Apr-2020","Shipped:May-2020",5],["Due:Apr-2020","Shipped:Jun-2020",5],["Due:Apr-2020","Shipped:Jul-2020",5],["Due:May-2020","Shipped:Mar-2020",5],["Due:May-2020","Shipped:Apr-2020",5],["Due:May-2020","Shipped:May-2020",5],["Due:Jun-2020","Missing Data",5],["Due:Jun-2020","Shipped:May-2020",5],["Due:Jun-2020","Shipped:Jun-2020",5],["Due:Apr-2020","Missing Data",5],["Due:Apr-2020","Shipped:Apr-2020",5],["Due:Apr-2020","Shipped:May-2020",5],["Due:Apr-2020","Shipped:Jun-2020",5],["Due:Apr-2020","Shipped:Jul-2020",5],["Due:Apr-2020","Shipped:Oct-2020",5],["Due:May-2020","Missing Data",5],["Due:May-2020","Shipped:Apr-2020",5],["Due:May-2020","Shipped:May-2020",5],["Due:May-2020","Shipped:Jun-2020",5],["Due:Jun-2020","Missing Data",5],["Due:Jun-2020","Shipped:May-2020",5],["Due:Jun-2020","Shipped:Jun-2020",5],["Due:Jul-2020","Shipped:Jun-2020",5],["Due:May-2020","Missing Data",5],["Due:May-2020","Shipped:May-2020",5],["Due:May-2020","Shipped:Jun-2020",5],["Due:May-2020","Shipped:Jul-2020",5],["Due:Jun-2020","Missing Data",5],["Due:Jun-2020","Shipped:May-2020",5],["Due:Jun-2020","Shipped:Jun-2020",5],["Due:Jun-2020","Shipped:Jul-2020",5],["Due:Jul-2020","Missing Data",5],["Due:Jul-2020","Shipped:May-2020",5],["Due:Jul-2020","Shipped:Jun-2020",5],["Due:Jul-2020","Shipped:Jul-2020",5],["Due:Aug-2020","Shipped:Jul-2020",5],["Due:Aug-2020","Shipped:Aug-2020",5],["Due:May-2030","Shipped:Jun-2020",5],["Due:Jun-2020","Missing Data",5],["Due:Jun-2020","Shipped:Jun-2020",5],["Due:Jun-2020","Shipped:Jul-2020",5],["Due:Jun-2020","Shipped:Aug-2020",5],["Due:Jul-2020","Missing Data",5],["Due:Jul-2020","Shipped:Jun-2020",5],["Due:Jul-2020","Shipped:Jul-2020",5],["Due:Jul-2020","Shipped:Aug-2020",5],["Due:Jul-2020","Shipped:Sep-2020",5],["Due:Aug-2020","Missing Data",5],["Due:Aug-2020","Shipped:Jul-2020",5],["Due:Aug-2020","Shipped:Aug-2020",5],["Due:Jul-2020","Missing Data",5],["Due:Jul-2020","Shipped:Jul-2020",5],["Due:Jul-2020","Shipped:Aug-2020",5],["Due:Jul-2020","Shipped:Sep-2020",5],["Due:Jul-2020","Shipped:Dec-2020",5],["Due:Jul-2020","Shipped:Jan-2021",5],["Due:Aug-2020","Missing Data",5],["Due:Aug-2020","Shipped:Jul-2020",5],["Due:Aug-2020","Shipped:Aug-2020",5],["Due:Aug-2020","Shipped:Sep-2020",5],["Due:Aug-2020","Shipped:Oct-2020",5],["Due:Sep-2020","Missing Data",5],["Due:Sep-2020","Shipped:Aug-2020",5],["Due:Sep-2020","Shipped:Sep-2020",5],["Due:Sep-2020","Shipped:Oct-2020",5],["Due:Oct-2020","Shipped:Sep-2020",5],["Due:Oct-2020","Shipped:Oct-2020",5],["Due:Aug-2020","Missing Data",5],["Due:Aug-2020","Shipped:Aug-2020",5],["Due:Aug-2020","Shipped:Sep-2020",5],["Due:Aug-2020","Shipped:Oct-2020",5],["Due:Aug-2020","Shipped:Nov-2020",5],["Due:Aug-2020","Shipped:Dec-2020",5],["Due:Sep-2020","Missing Data",5],["Due:Sep-2020","Shipped:Aug-2020",5],["Due:Sep-2020","Shipped:Sep-2020",5],["Due:Sep-2020","Shipped:Oct-2020",5],["Due:Sep-2020","Shipped:Nov-2020",5],["Due:Sep-2020","Shipped:Dec-2020",5],["Due:Oct-2020","Missing Data",5],["Due:Oct-2020","Shipped:Sep-2020",5],["Due:Oct-2020","Shipped:Oct-2020",5],["Due:Oct-2020","Shipped:Nov-2020",5],["Due:Oct-2020","Shipped:Dec-2020",5],["Due:Nov-2020","Shipped:Nov-2020",5],["Due:Sep-2020","Missing Data",5],["Due:Sep-2020","Shipped:Sep-2020",5],["Due:Sep-2020","Shipped:Oct-2020",5],["Due:Sep-2020","Shipped:Nov-2020",5],["Due:Oct-2020","Missing Data",5],["Due:Oct-2020","Shipped:Sep-2020",5],["Due:Oct-2020","Shipped:Oct-2020",5],["Due:Oct-2020","Shipped:Nov-2020",5],["Due:Oct-2020","Shipped:Dec-2020",5],["Due:Oct-2020","Shipped:Jan-2021",5],["Due:Nov-2020","Missing Data",5],["Due:Nov-2020","Shipped:Oct-2020",5],["Due:Nov-2020","Shipped:Nov-2020",5],["Due:Nov-2020","Shipped:Dec-2020",5],["Due:Oct-2020","Missing Data",5],["Due:Oct-2020","Shipped:Oct-2020",5],["Due:Oct-2020","Shipped:Nov-2020",5],["Due:Oct-2020","Shipped:Dec-2020",5],["Due:Oct-2020","Shipped:Jan-2021",5],["Due:Nov-2020","Missing Data",5],["Due:Nov-2020","Shipped:Oct-2020",5],["Due:Nov-2020","Shipped:Nov-2020",5],["Due:Nov-2020","Shipped:Dec-2020",5],["Due:Nov-2020","Shipped:Jan-2021",5],["Due:Dec-2020","Missing Data",5],["Due:Dec-2020","Shipped:Nov-2020",5],["Due:Dec-2020","Shipped:Dec-2020",5],["Due:Dec-2020","Shipped:Jan-2021",5],["Due:Jan-2021","Shipped:Jan-2021",5],["Due:Nov-2020","Missing Data",5],["Due:Nov-2020","Shipped:Nov-2020",5],["Due:Nov-2020","Shipped:Dec-2020",5],["Due:Nov-2020","Shipped:Jan-2021",5],["Due:Dec-2020","Missing Data",5],["Due:Dec-2020","Shipped:Nov-2020",5],["Due:Dec-2020","Shipped:Dec-2020",5],["Due:Dec-2020","Shipped:Jan-2021",5],["Due:Jan-2021","Missing Data",5],["Due:Jan-2021","Shipped:Nov-2020",5],["Due:Jan-2021","Shipped:Dec-2020",5],["Due:Jan-2021","Shipped:Jan-2021",5],["Due:Feb-2021","Missing Data",5],["Due:Dec-2020","Missing Data",5],["Due:Dec-2020","Shipped:Dec-2020",5],["Due:Dec-2020","Shipped:Jan-2021",5],["Due:Jan-2021","Missing Data",5],["Due:Jan-2021","Shipped:Dec-2020",5],["Due:Jan-2021","Shipped:Jan-2021",5],["Due:Feb-2021","Missing Data",5],["Due:Feb-2021","Shipped:Dec-2020",5],["Due:Feb-2021","Shipped:Jan-2021",5],["Due:Mar-2021","Missing Data",5],["Due:Mar-2021","Shipped:Jan-2021",5],["Due:Apr-2021","Missing Data",5],["Due:Jun-2021","Missing Data",5],["Due:Dec-2021","Shipped:Dec-2020",5],["Due:Jan-2021","Missing Data",5],["Due:Jan-2021","Shipped:Jan-2021",5],["Due:Feb-2021","Missing Data",5],["Due:Feb-2021","Shipped:Jan-2021",5],["Due:Mar-2021","Missing Data",5],["Due:Mar-2021","Shipped:Jan-2021",5],["Due:Apr-2021","Missing Data",5],["Due:Apr-2021","Shipped:Jan-2021",5],["Due:Feb-2021","Missing Data",5],["Due:Mar-2021","Missing Data",5],["Due:Apr-2021","Missing Data",5],["Due:May-2021","Missing Data",5]]
  columnNames = ["Due_Month","Ship_Month", "Kits"];
  options = {
    sankey: {
      link: { color: { fill: '#005d78', fillOpacity: 0.8 } },
      node: {width: 2 , label: { fontSize: 12,
                       color: '#000000',
                       noral: true
                      } } },};
  // width = 1000;
  height = 550;

}
