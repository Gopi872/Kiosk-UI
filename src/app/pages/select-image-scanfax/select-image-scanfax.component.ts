import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service';
import { FaxserviceService } from '../../services/faxservice.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-select-image-scanfax',
  templateUrl: './select-image-scanfax.component.html',
  styleUrls: ['./select-image-scanfax.component.css']
})
export class SelectImageScanfaxComponent implements OnInit {
  public imageList = [];
  public targetPrinter = [];
  isValid: boolean;

  constructor(private printserviceService: PrintserviceService,
              private faxserviceService: FaxserviceService, private commonService: CommonService) {
    this.faxserviceService.selectedFaxImgs = [];
    this.commonService.selectedPrinterObj = {};
    this.faxserviceService.selectedPrinter = '';
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

  faxImgSelect(image) {
    const index = this.faxserviceService.selectedFaxImgs.indexOf(image);
    if (index === -1) {
      this.faxserviceService.selectedFaxImgs.push(image);
    } else {
      this.faxserviceService.selectedFaxImgs.splice(index, 1);
    }
    this.isValid = this.checkFormValidyStatus();
  }

  changePrinter(value) {
    this.targetPrinter.forEach(printer => {
      if (value === printer.name) {
        this.commonService.selectedPrinterObj = printer;
      }
    });
    this.faxserviceService.selectedPrinter = value;
    this.isValid = this.checkFormValidyStatus();
  }

  checkFormValidyStatus() {
    return (this.faxserviceService.selectedPrinter !== '' && this.faxserviceService.selectedFaxImgs.length > 0) ? true : false;
  }

}
