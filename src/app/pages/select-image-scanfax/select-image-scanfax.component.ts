import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service'
@Component({
  selector: 'app-select-image-scanfax',
  templateUrl: './select-image-scanfax.component.html',
  styleUrls: ['./select-image-scanfax.component.css']
})
export class SelectImageScanfaxComponent implements OnInit {
 public imageList=[];
 public targetPrinter=[];
  constructor(private PrintserviceService:PrintserviceService) { }

  ngOnInit() {
    this.fetchFaxImage();
    this.fetchTargetPrinter();
  }
  fetchFaxImage(){

    this.PrintserviceService.fetchFaxImage().subscribe((payload:any)=>{
      console.log("payload",payload)
      this.imageList= payload;
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

}
