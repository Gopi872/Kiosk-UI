import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {PrintserviceService} from '../../../services/printservice.service';
@Component({
  selector: 'app-print-usb',
  templateUrl: './print-usb.component.html',
  styleUrls: ['./print-usb.component.css']
})
export class PrintUsbComponent implements OnInit {
  modalRef: BsModalRef;  
  waitingList:any=[];
  listItem:any=[];
  paymentDue:any=0;
  targetPrinter=[];
  constructor(private PrintserviceService:PrintserviceService, private modalService: BsModalService) { }  

  ngOnInit() {
    this.fetchListPrintingJobwithCostInfo();
    this.fetchTargetPrinter();
  }

  startModalWithClass(start: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      start,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
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
  fetchListPrintingJobwithCostInfo(){
   let data={
     "start":"0",
     "lenght":"20"
   }
    this.PrintserviceService.fetchListPrintingJobwithCostInfo(data).subscribe((data:any)=>{
       console.log("data",data)
       this.waitingList=data.data;
       console.log("data",this.waitingList);
    })
  }
  onCheckboxChange(event,list){
    console.log("event",event.target.checked)
    if(event.target.checked){
      this.listItem.push(list);
      this.paymentDue= this.paymentDue + Number(list.showUnitMoney);
    }else{
   let index=   this.listItem.findIndex((x)=>{
        return x.idx==list.idx;
      })
      console.log({index})

      this.listItem.splice(index,1);
      this.paymentDue= this.paymentDue -Number(list.showUnitMoney);

    }
    console.log(this.listItem);

  }
}
