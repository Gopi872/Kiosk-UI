import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service';
@Component({
  selector: 'app-select-image-scanmail',
  templateUrl: './select-image-scanmail.component.html',
  styleUrls: ['./select-image-scanmail.component.css']
})
export class SelectImageScanmailComponent implements OnInit {
 public imageList=[];
 targetPrinter=[];
  constructor(private PrintserviceService:PrintserviceService) { }

  ngOnInit() {
    this.fetchScanImage();
    this.fetchTargetPrinter();
  }
  fetchScanImage(){
    this.PrintserviceService.fetchScanImage().subscribe((payload:any)=>{
      try {
        console.log("ok",payload);
       this.imageList= payload;
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

}
