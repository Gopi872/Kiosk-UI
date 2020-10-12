import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service';
import { ScanserviceService } from '../../services/scanservice.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-select-image-scanmail',
  templateUrl: './select-image-scanmail.component.html',
  styleUrls: ['./select-image-scanmail.component.css']
})
export class SelectImageScanmailComponent implements OnInit {
  public imageList = [];
  public targetPrinter = [];
  isValid: boolean;

  constructor(private printserviceService: PrintserviceService,
              private scanserviceService: ScanserviceService, private commonService: CommonService) {
  this.scanserviceService.selectedScanUsbImgs = [];
  this.commonService.selectedPrinterObj = {};
  this.scanserviceService.selectedPrinter = '';
  this.isValid = false;
}

  ngOnInit() {
    this.fetchImage();
    this.fetchTargetPrinter();
  }

  fetchImage(){

    this.printserviceService.fetchScanImage().subscribe((data: any) => {
      try {
        console.log('data', data);
        this.imageList = data;
      } catch (error) {

      }
    });
  }
  fetchTargetPrinter() {
    this.printserviceService.fetchTargetPrinter().subscribe((data: any) => {
      try {
        console.log('data fetchTargetPrinter', data);
        this.targetPrinter = data;
      } catch (error) {

      }
    });
  }

  scanMailImgSelect(image) {
    const index = this.scanserviceService.selectedScanMailImgs.indexOf(image);
    if (index === -1) {
      this.scanserviceService.selectedScanMailImgs.push(image);
    } else {
      this.scanserviceService.selectedScanMailImgs.splice(index, 1);
    }
    this.isValid = this.checkFormValidyStatus();
  }

  changePrinter(value) {
    this.targetPrinter.forEach(printer => {
      if (value === printer.name) {
        this.commonService.selectedPrinterObj = printer;
      }
    });
    this.scanserviceService.selectedPrinter = value;
    this.isValid = this.checkFormValidyStatus();
  }

  checkFormValidyStatus() {
    return (this.scanserviceService.selectedPrinter !== '' && this.scanserviceService.selectedScanMailImgs.length > 0) ? true : false;
  }

}
