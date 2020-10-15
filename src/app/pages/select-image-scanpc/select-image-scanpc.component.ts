import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service';
import { ScanserviceService } from '../../services/scanservice.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-select-image-scanpc',
  templateUrl: './select-image-scanpc.component.html',
  styleUrls: ['./select-image-scanpc.component.css']
})
export class SelectImageScanpcComponent implements OnInit {
  public imageList = [];
  public targetPrinter = [];
  isValid: boolean;
  scanSelect;

  constructor(private printserviceService: PrintserviceService,
              private scanserviceService: ScanserviceService, private commonService: CommonService) {
    this.scanserviceService.selectedScanUsbImgs = [];
    this.commonService.selectedPrinterObj = {};
    this.scanSelect = 'Select Source Printer';
    this.scanserviceService.selectedPrinter = this.scanSelect;
    this.isValid = false;
  }

  ngOnInit() {
   this.fetchpcscanImage();
   this.fetchTargetPrinter();
  }

  fetchpcscanImage(){
    return this.printserviceService.fetchScanImage().subscribe((payload: any) => {
      try {
         console.log('payload', payload);
         this.imageList = payload;
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

  scanPcImgSelect(image) {
    const index = this.scanserviceService.selectedScanPcImgs.indexOf(image);
    if (index === -1) {
      this.scanserviceService.selectedScanPcImgs.push(image);
    } else {
      this.scanserviceService.selectedScanPcImgs.splice(index, 1);
    }
    this.isValid = this.checkFormValidyStatus();
  }

  changePrinter(value) {
    this.targetPrinter.forEach(printer => {
      if (value === printer.name) {
        this.commonService.selectedPrinterObj = printer;
      }
    });
    this.scanSelect = value;
    this.scanserviceService.selectedPrinter = value;
    this.isValid = this.checkFormValidyStatus();
  }

  checkFormValidyStatus() {
    return (this.scanserviceService.selectedPrinter !== '' && this.scanserviceService.selectedScanPcImgs.length > 0) ? true : false;
  }

}
