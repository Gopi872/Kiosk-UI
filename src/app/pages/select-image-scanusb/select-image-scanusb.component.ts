import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service';
import { ScanserviceService } from '../../services/scanservice.service';
@Component({
  selector: 'app-select-image-scanusb',
  templateUrl: './select-image-scanusb.component.html',
  styleUrls: ['./select-image-scanusb.component.css']
})
export class SelectImageScanusbComponent implements OnInit {
  public imagelist =[];
  public targetPrinter = [];

  constructor(private PrintserviceService: PrintserviceService, private scanserviceService: ScanserviceService) {
    this.scanserviceService.selectedScanUsbImgs = [];
  }

  ngOnInit() {
    this.fetchImage();
    this.fetchTargetPrinter();
  }

  fetchImage(){

    this.PrintserviceService.fetchScanImage().subscribe((data:any)=>{
      try {
        console.log("data",data)
        this.imagelist = data;
      } catch (error) {
        
      }
    })
  }
  fetchTargetPrinter(){

    this.PrintserviceService.fetchTargetPrinter().subscribe((data:any)=>{
      try {
        console.log("data fetchTargetPrinter",data);
        this.targetPrinter=data;
      } catch (error) {
        
      }
    })
  }

  scanUsbImgSelect(image){
    let index = this.scanserviceService.selectedScanUsbImgs.indexOf(image);
    if(index === -1){
      this.scanserviceService.selectedScanUsbImgs.push(image);
    } else {
      this.scanserviceService.selectedScanUsbImgs.splice(index, 1);
    }
  }

}
