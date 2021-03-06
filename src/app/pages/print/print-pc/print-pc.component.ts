import { Component, OnInit, TemplateRef  } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {PrintserviceService} from '../../../services/printservice.service';
import { CommonService } from '../../../services/common.service';

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
  waitingList:any =[];
  listItem:any =[];
  paymentDue:any =0;
  pinNumber:any;
  targetPrinter:[];
  workType;
  jobsCount;
  constructor( private modalService: BsModalService,private PrintserviceService:PrintserviceService,private commonService: CommonService) {
    this.workType = 1201;
    this.jobsCount = 0;
  }

  ngOnInit() {
    this.fetchListPrintingJobwithCostInfo();
    this.fetchTargetPrinter();
    this.getAllMediaCost();
  }

  fetchListPrintingJobwithCostInfo(){
   let data ={
     'start':'0',
     'lenght':'20'
   }
    this.PrintserviceService.fetchListPrintingJobwithCostInfo(data).subscribe((data:any) => {
       console.log('data',data)
       //this.waitingList=data.data;
       console.log('data-----------------',this.waitingList);
    })
  }

  all_media_cost:any =[];

  getAllMediaCost(){
    this.commonService.get_AllMediaCost_Service().subscribe(
      (data:any) => {
        console.log('Get media cost data');
        this.all_media_cost = data.data;
        },
        (error:any) => {
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
    console.log('event',event.target.checked);
    if(event.target.checked){
      this.jobsCount++;
      this.paymentDue += (Number(list.attributes.copies) * Number(list.attributes.amount));
      this.listItem.push(list);
      //this.paymentDue= this.paymentDue + Number(list.showUnitMoney);
    }else{
      this.jobsCount--;
   let index =   this.listItem.findIndex((x) => {
        return x.idx == list.idx;
      })
      console.log({index});
      this.paymentDue -= (Number(list.attributes.copies) * Number(list.attributes.amount));

      this.listItem.splice(index,1);
      //this.paymentDue= this.paymentDue -Number(list.showUnitMoney);

    }
    console.log(this.listItem);

  }
  fetchTargetPrinter(){

    this.PrintserviceService.fetchTargetPrinter().subscribe((data:any) => {
      try {
        console.log('data fetchTargetPrinter',data);
        this.targetPrinter = data;
      } catch (error) {

      }
    })
  }

  fetchJobByPin(){
    console.log('data',this.pinNumber);
    this.PrintserviceService.fetchJobByPin(this.pinNumber).subscribe((data: any) => {
      console.log('data',data);
      this.waitingList = data;
      this.updateWaitingList();
    })
  }

  updateWaitingList(){
    this.waitingList.forEach(element => {
      const colorCode = (element.attributes.color === 'COLOR') ? 1 : 0 ;
      const finalMediaType: any = this.all_media_cost.filter((media: any) => {
        return media.workType === this.workType && media.mediaSizeName === element.attributes.pageFormat && media.color === colorCode;
      });
      if (finalMediaType.length > 0) {
        element.attributes.amount = finalMediaType[0].cost;
      }
    });
  }

  startModalWithClass(start: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      start,
      Object.assign({}, { class: 'gray modal-lg' })
    );

}
// tslint:disable-next-line:variable-name
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
    document.getElementById('countdown').innerHTML = 'Finished';
  } else {
    document.getElementById('countdown').innerHTML = timeleft + ' seconds remaining';
  }
  timeleft -= 1;
}, 1000);
}


moveJobAtDestination_popup_Go(){
    console.log('moveJobAtDestination_popup_Go');

    this.PrintserviceService.fetch_pop_Go().subscribe(
      (data:any) => {
      console.log('data',data);
      if (data == 'true') {
          this.listItem.forEach(element => {
                console.log(element);
                let obj = {
                  'id': element.id,
                  'username': element.username
                }

              console.log('data',obj);
              this.PrintserviceService.moveJobAt_destination(obj).subscribe((data:any) => {
                console.log('data',data);
              })

          });
      }
    },
    (error:any) => {
      console.log(error);
    })


  }

}
