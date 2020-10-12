import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service';
import { ScanserviceService } from '../../services/scanservice.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-select-image-scanusb',
  templateUrl: './select-image-scanusb.component.html',
  styleUrls: ['./select-image-scanusb.component.css']
})
export class SelectImageScanusbComponent implements OnInit {
  public imagelist = [];
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

  fetchImage() {
    this.printserviceService.fetchScanImage().subscribe((data: any) => {
      try {
        console.log('data', data);
        this.imagelist = data;
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

  scanUsbImgSelect(image) {
    const index = this.scanserviceService.selectedScanUsbImgs.indexOf(image);
    if (index === -1) {
      this.scanserviceService.selectedScanUsbImgs.push(image);
    } else {
      this.scanserviceService.selectedScanUsbImgs.splice(index, 1);
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
    return (this.scanserviceService.selectedPrinter !== '' && this.scanserviceService.selectedScanUsbImgs.length > 0) ? true : false;
  }

}
