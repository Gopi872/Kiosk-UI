import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {PrintserviceService} from '../../services/printservice.service';
import {CopyComponent} from '../copy/copy.component';
import { CopyserviceService } from '../../services/copyservice.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit {
 public imageList = [];
 public targetPrinter = [];
 listOfSelectedImages: any = [];
 selectedPrinter?: string;
  constructor(private printserviceService: PrintserviceService, private router: Router,
              private copyserviceService: CopyserviceService, private commonService: CommonService) {
    this.copyserviceService.selectedCopyImgs = [];
    this.commonService.selectedPrinterObj = {};
  }

  ngOnInit() {
  this.fetchTargetPrinter();
    // tslint:disable-next-line:typedef-whitespace
    // tslint:disable-next-line:whitespace
  this.printserviceService.fetchCopyImage().subscribe((payload: any)=> {
      try {
        console.log('payload copy', payload);
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
  onChange_SelectedImages(images) {
    const index = this.copyserviceService.selectedCopyImgs.indexOf(images);
    if (index === -1) {
      this.copyserviceService.selectedCopyImgs.push(images);
    } else {
      this.copyserviceService.selectedCopyImgs.splice(index, 1);
    }

  }
  getSeletedPrinter(value) {
    this.targetPrinter.forEach(printer => {
      if (value === printer.name) {
        this.commonService.selectedPrinterObj = printer;
      }
    });
    this.copyserviceService.selectedPrinter = value;
  }
  OnSelectImage() {
    if (!(this.copyserviceService.selectedPrinter && this.copyserviceService.selectedCopyImgs.length > 0)) {
      alert('Select all fields');
    }
  }
}
