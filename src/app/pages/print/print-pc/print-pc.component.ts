import { Component, OnInit, TemplateRef  } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {PrintserviceService} from '../../../services/printservice.service';
import { CommonService } from "../../../services/common.service";

declare var $: any;
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ], 
  declarations: []
  }
)
@Component({
  selector: 'app-print-pc',
  templateUrl: './print-pc.component.html',
  styleUrls: ['./print-pc.component.css']
})
export class PrintPcComponent implements OnInit {
  modalRef: BsModalRef;  
  waitingList:any=[];
  listItem:any=[];
  paymentDue:any=0;
  pinNumber:any;
  targetPrinter:[];
  constructor( private modalService: BsModalService,private PrintserviceService:PrintserviceService,private commonService: CommonService) { }  

  ngOnInit() {
    this.fetchListPrintingJobwithCostInfo();
    this.fetchTargetPrinter();
    this.getAllMediaCost();
  }

  fetchListPrintingJobwithCostInfo(){
   let data={
     "start":"0",
     "lenght":"20"
   }
    this.PrintserviceService.fetchListPrintingJobwithCostInfo(data).subscribe((data:any)=>{
       console.log("data",data)
       this.waitingList=data.data;
       console.log("data-----------------",this.waitingList);
    })
  }

  all_media_cost:any=[];

  getAllMediaCost(){
    this.commonService.get_AllMediaCost_Service().subscribe(
      (data:any) =>{
        console.log("Get media cost data");
        // console.log(data);

        // for (let i = 0; i < this.waitingList.length; i++) {
        //   for (let j = 0; j < data.data.length; j++) {
        //     const element = array[j];
            
        //   }
        // }


        // this.all_media_cost = data.data;
        data.data.forEach(element => {
            console.log(element);
            if(element.workType == '1201') {
              if (element.color == 0 && element.mediaSizeName == 'A4') {
                  let cost1 = {
                    "cost_clr_0_A4": element.cost,
                    "workType":element.workType
                  }
                this.all_media_cost.push(cost1);
              }
              if (element.color == 1 && element.mediaSizeName == 'A4') {
                let cost2 = {
                  "cost_clr_1_A4": element.cost,
                  "workType":element.workType
                }
                this.all_media_cost.push(cost2);
              }
              if (element.color == 0 && element.mediaSizeName == 'A3') {
                let cost3 = {
                  "cost_clr_0_A3": element.cost,
                  "workType":element.workType
                }
                this.all_media_cost.push(cost3);
              }
              if (element.color == 1 && element.mediaSizeName == 'A3') {
                let cost4 = {
                  "cost_clr_1_A3": element.cost,
                  "workType":element.workType
                }
                this.all_media_cost.push(cost4);
              }
            }

          });

          console.log(this.all_media_cost);

        },
        (error:any)=>{
          console.log(error);
        }
    )

    // this.listItem.forEach(element => {
    //   console.log(element);
    //   let obj = {
    //     "id": element.id,
    //     "username": element.username
    //   }
    //     console.log("data",obj);
    // });


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
  fetchTargetPrinter(){

    this.PrintserviceService.fetchTargetPrinter().subscribe((data:any)=>{
      try {
        console.log("data fetchTargetPrinter",data);
        this.targetPrinter=data;
      } catch (error) {
        
      }
    })
  }

  fetchJobByPin(){
    console.log("data",this.pinNumber);
    this.PrintserviceService.fetchJobByPin(this.pinNumber).subscribe((data:any)=>{
      console.log("data",data);
      this.waitingList = data;
    })
  }

  startModalWithClass(start: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      start,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );
      
}
printModal(print_process: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      print_process,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
}

scanModal(scan_process: TemplateRef<any>) {  
  this.modalRef = this.modalService.show(  
    scan_process,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}

copyModal(copy_process: TemplateRef<any>) {  
  this.modalRef = this.modalService.show(  
    copy_process,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}
faxModal(fax_process: TemplateRef<any>) {  
  this.modalRef = this.modalService.show(  
    fax_process,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}
copyBackModal(copy_backside: TemplateRef<any>) {  
  this.modalRef = this.modalService.show(  
    copy_backside,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}

informationModal(information: TemplateRef<any>) {  
  this.modalRef = this.modalService.show(  
    information,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}

infoModal(info_modal: TemplateRef<any>) {  
  this.modalRef = this.modalService.show(  
    info_modal,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}

errorModal(error: TemplateRef<any>) {  
  this.modalRef = this.modalService.show(  
    error,  
    Object.assign({}, { class: 'gray modal-lg' })  
  );  
}

countDown(){
var timeleft = 10;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Finished";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);
}


moveJobAtDestination_popup_Go(){
    console.log("moveJobAtDestination_popup_Go");
    
    this.PrintserviceService.fetch_pop_Go().subscribe(
      (data:any)=>{
      console.log("data",data);
      if (data == "true") {
          this.listItem.forEach(element => {
                console.log(element);
                let obj = {
                  "id": element.id,
                  "username": element.username
                }

              console.log("data",obj);
              this.PrintserviceService.moveJobAt_destination(obj).subscribe((data:any)=>{
                console.log("data",data);
              })

          });
      }
    },
    (error:any) =>{
      console.log(error);      
    })

    
  }

}
