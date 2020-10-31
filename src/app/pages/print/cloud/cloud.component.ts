import { Component, OnInit, TemplateRef } from '@angular/core';
import {PrintserviceService} from '../../../services/printservice.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {PrintCloudService} from '../../../services/print-cloud.service';
declare var $: any;


@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css']
})
export class CloudComponent implements OnInit {
  constructor(private printCloudService:PrintCloudService ,private modalService: BsModalService, private PrintserviceService: PrintserviceService) {
    this.paymentDue = 0;
   }
  modalRef: BsModalRef;
  paymentDue;
public targetPrinter = [];
  quantity: string = '1 Page';
  i = 1;

  ngOnInit() {
   this.fetchTargetPrinter();
   this.loginCloud();
  }

  /**
   * loginCloud
   */
  public loginCloud() {
    this.PrintserviceService.loginCloud().subscribe((payload:any)=>{
      try {
        console.log("avi",payload);
      } catch (error) {
        
      }
    })
    
  }

  startModalWithClass(start: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      start,
      Object.assign({}, { class: 'gray modal-lg' })
    );
}

  fetchTargetPrinter() {

    this.PrintserviceService.fetchTargetPrinter().subscribe((data: any) => {
      try {
        console.log('data fetchTargetPrinter', data);
        this.targetPrinter = data;
      } catch (error) {

      }
    });
  }
  plus() {
    if (this.i !== 100) {
      this.i++;
      this.quantity = this.i + ' Page';
      if (this.paymentDue !== 0) {
        this.paymentDue = this.paymentDue * 2;
      }
    }
  }

  minus() {
    if (this.i !== 1) {
      this.i--;
      this.quantity = this.i + ' Page';
      if (this.paymentDue !== 0) {
        this.paymentDue = this.paymentDue / 2;
      }
    }
  }

  printGo(phoneNumber){
    console.log(phoneNumber.value)
    this.printCloudService.getAllDocs(phoneNumber.value).subscribe((resp:any) => {
      console.log('Success Response'+resp);
    }, error => {
      console.log('Failure Response'+error);
    });
    }

}
