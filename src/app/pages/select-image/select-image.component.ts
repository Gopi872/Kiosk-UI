import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {PrintserviceService} from '../../services/printservice.service';
import {CopyComponent} from '../copy/copy.component';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit {
 public imageList=[];
 public targetPrinter=[];
 listOfSelectedImages:any=[];
 selectedPrinter?:string; 
  constructor(private PrintserviceService :PrintserviceService,private router:Router) { }

  ngOnInit() {
  this.fetchTargetPrinter();
    this.PrintserviceService.fetchCopyImage().subscribe((payload:any)=>{
      try {
        console.log("payload copy",payload)
        this.imageList =payload;
      } catch (error) {
        
      }
    });
    localStorage.removeItem('selectedImages');
    localStorage.removeItem('seletedPrinter');
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
  getListOfImages(images){
  if(this.listOfSelectedImages && this.listOfSelectedImages.length==0){
      this.listOfSelectedImages.push(images);
  }
  else{
      var index=this.listOfSelectedImages.indexOf(images);
      if(index>-1)
      this.listOfSelectedImages.splice(index,1);
      else
      this.listOfSelectedImages.push(images)
  }    
  }
  getSeletedPrinter($event){
    this.selectedPrinter=$event.target.value;    
  }
  OnSelectImage(){
    debugger;
    if(this.selectedPrinter !=undefined && this.selectedPrinter!==null && this.listOfSelectedImages.length>0){
      localStorage.removeItem('selectedImages');
      localStorage.removeItem('seletedPrinter');
      localStorage.setItem('selectedImages',JSON.stringify(this.listOfSelectedImages));
      localStorage.setItem('seletedPrinter',this.selectedPrinter);      
      this.router.navigate(["/copy"]);
    }
    else{
      alert("Select all fields");
    }
  }
}
