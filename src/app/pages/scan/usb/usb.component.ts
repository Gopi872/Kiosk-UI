import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ScanserviceService} from '../../../services/scanservice.service';

declare var $: any;
@Component({
  selector: 'app-usb',
  templateUrl: './usb.component.html',
  styleUrls: ['./usb.component.css']
})
export class UsbComponent implements OnInit {

  selectedColor: string;
  selectedColorCode;
  selectedPaper: string;
  selectedDirection: string;
  selectedResolution: string;
  selectedFile: string;
  selectedScanUsbImgs: [];
  imgHeight: string;
  imgWidth: string;
  imgBorder: string;
  usbImgs: HTMLImageElement[] ;
  mediaTypes: [];
  workType;
  paymentDue;
  modalRef: BsModalRef;
  @ViewChild('previewImg', {static: false}) previewImg: ElementRef<HTMLImageElement>;

  constructor(private modalService: BsModalService, private scanserviceService: ScanserviceService) {
    this.selectedColor = 'Color';
    this.selectedColorCode = 1;
    this.selectedPaper = 'A4';
    this.selectedDirection = 'Vertical';
    this.selectedResolution = '100dpi';
    this.selectedFile = 'PDF';
    this.selectedScanUsbImgs = this.scanserviceService.selectedScanUsbImgs;
    this.imgHeight = '275px';
    this.imgWidth = '240px';
    this.imgBorder = '2px solid #bdc3c7';
    this.workType = 1204;
    this.paymentDue = '';
  }

  startModalWithClass(start: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        start,
        Object.assign({}, { class: 'gray modal-lg' })
      );
  }

  createImages() {
    // tslint:disable-next-line: one-line
    // for(let i=0; i< this.selectedScanUsbImgs.length; i++){
    //   const img = new Image();
    //   img.src = 'http://storage.myepsoft.com:53335/kioskapi/' + this.selectedScanUsbImgs[i];
    //   this.usbImgs.push(img);
    // }
    // this.selectedScanUsbImgs.forEach(obj => {
    //   const img = new Image();
    //   img.src = 'http://storage.myepsoft.com:53335/kioskapi/' + obj;
    //   this.usbImgs.push(img);
    // });
    console.log(this.usbImgs);
  }

  calculateDuePayment() {
    const finalMediaType: any = this.mediaTypes.filter((media: any) => {
      return media.workType === this.workType && media.mediaSizeName === this.selectedPaper && media.color === this.selectedColorCode;
    });
    this.paymentDue = finalMediaType[0].cost;
  }

  getAllMediaTypes() {
    this.scanserviceService.getMediaTypes().subscribe((response: any) => {
      try {
        console.log('Response', response);
        this.mediaTypes = response.data;
        this.calculateDuePayment();
      } catch (error) {
      }
    });
  }
  ngOnInit() {
    this.createImages();
    this.getAllMediaTypes();
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  updateImage(filter, rotate){
    if(filter){
      // tslint:disable-next-line:max-line-length
      this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; filter:grayscale(100%); transform:rotate(${rotate})`);
    } else {
      // tslint:disable-next-line:max-line-length
      this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
    }
  }
  onColorChange(value) {
    this.selectedColor = value;
    if (value === 'Mono') {
      this.selectedColorCode = 0;
      if (this.selectedDirection === 'Vertical') {
        this.updateImage(true, '0deg');
      } else if (this.selectedDirection === 'Horizontal') {
        this.updateImage(true, '90deg');
      }
    } else if (value === 'Color') {
      this.selectedColorCode = 1;
      if (this.selectedDirection === 'Vertical') {
        this.updateImage(false, '0deg');
      } else if (this.selectedDirection === 'Horizontal') {
        this.updateImage(false, '90deg');
      }
    }
  }

  onDirectionChange(value) {
    this.selectedDirection = value;
    if (value === 'Vertical') {
      if (this.selectedColor === 'Mono') {
        this.updateImage(true, '0deg');
      } else if (this.selectedColor === 'Color') {
        this.updateImage(false, '0deg');
      }
    } else if (value === 'Horizontal') {
      if (this.selectedColor === 'Mono') {
        this.updateImage(true, '90deg');
      } else if (this.selectedColor === 'Color') {
        this.updateImage(false, '90deg');
      }
    }
  }

  onFileChange(value) {
    this.selectedFile = value;
  }

  onResolutionChange(value) {
    this.selectedResolution = value;
  }

  onPaperChange(value) {
    this.selectedPaper = value;
  }
  scanUsbGo(){
    this.scanserviceService.paymentPopup().subscribe((response: any) => {
      try {
        console.log('Response', response);
        if(response){

        }
      } catch (error) {
      }
    });
  }

}
