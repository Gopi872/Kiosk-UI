import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service'

@Component({
  selector: 'app-select-image-scanpc',
  templateUrl: './select-image-scanpc.component.html',
  styleUrls: ['./select-image-scanpc.component.css']
})
export class SelectImageScanpcComponent implements OnInit {
  public imageList=[];
  public targetPrinter =[];
  constructor(private PrintserviceService: PrintserviceService) { }

  ngOnInit() {
   this.fetchpcscanImage();
   this.fetchTargetPrinter();
  }

  fetchpcscanImage(){
    return this.PrintserviceService.fetchScanImage().subscribe((payload:any)=>{
      try {
         console.log("payload",payload);
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
