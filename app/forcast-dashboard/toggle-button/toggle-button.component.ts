import { Component, Output, EventEmitter} from '@angular/core';
import { DashboardService } from '../../dashboard/dashboard.service'

@Component({
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styles: [`
  :host {
    display: block;
    position: relative;
    width: 45px;
    height: 23px;
  }
  
  input[type="checkbox"] {
    display: none; 
  }

  .toggle-button-switch {
    

    position: absolute;
    top: 0px;
    left: 1px;
    right: 1px;
    width: 22px;
    height: 20px;
    background-color: #fff;
    border-radius: 100%;
    cursor: pointer;
    z-index: 100;
    transition: left 0s;
    
  }

  .toggle-button-text {
    overflow: hidden;
    background-color: #98acb3;
    border-radius: 30px;
    box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
    transition: background-color 0.3s;
    height:20px;
  }

  .toggle-button-text-on,
  .toggle-button-text-off {
    float: left;
    width: 50%;
    height: 90%;
    line-height: 45px;
    font-family: Lato, sans-serif;
    font-size:1px;
    color: #005d78;
    text-align: center;
  }

  input[type="checkbox"]:checked ~ .toggle-button-switch {
    left: 20px;
  }

  input[type="checkbox"]:checked ~ .toggle-button-text {
    background-color: #005d78;
  }
`]
})
export class ToggleButtonComponent {
  @Output() changed = new EventEmitter<boolean>();
  _apiResponseTogglevalue :any;
  defaulealue = false
  value :any =''
  constructor(private dashBoard: DashboardService){
  this.defaulealue = false
  }
  ngAfterViewInit() {
   this._apiResponseTogglevalue = this.dashBoard.defaultToggleOption.subscribe((response)=>{
     if(response == 'true'){
      // this.defaulealue = false
     }
   })
  }
  ngOnDestroy() {
    if (this._apiResponseTogglevalue != undefined)
      this._apiResponseTogglevalue.unsubscribe();
   
  }
  submit(){
    this.defaulealue = false
  }
}
