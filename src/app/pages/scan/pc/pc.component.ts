import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ScanserviceService} from '../../../services/scanservice.service';
import { CommonService } from '../../../services/common.service';
import {SaveImageService} from '../../../services/save-image.service';
import {SaveImagePayload} from '../usb/save-image-payload';
import { saveAs } from 'file-saver';
//import { FileSaverService } from 'ngx-filesaver';

declare var $: any;

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css'],
  styles: ['body { background-color:white; }']
})
export class PcComponent implements OnInit {
  saveImagePayload: SaveImagePayload;
  selectedColor: string;
  selectedColorCode;
  selectedPaper: string;
  selectedDirection: string;
  selectedResolution: string;
  selectedFile: string;
  filePath: any;
  selectedScanPcImgs: [];
  imgHeight: string;
  imgWidth: string;
  imgBorder: string;
  pcImgs;
  mediaTypes: [];
  workType;
  paymentDue;
  modalRef: BsModalRef;
  @ViewChild('previewImg', {static: false}) previewImg: ElementRef<HTMLImageElement>;

  constructor(private saveImageService: SaveImageService, private modalService: BsModalService, 
              private scanserviceService: ScanserviceService, private commonService: CommonService) {
    this.selectedColor = 'Color';
    this.selectedColorCode = 1;
    this.selectedPaper = 'A4';
    this.selectedDirection = 'Vertical';
    this.selectedResolution = '100dpi';
    this.selectedFile = 'PDF';
    this.selectedScanPcImgs = this.scanserviceService.selectedScanPcImgs;
    this.imgHeight = '275px';
    this.imgWidth = '240px';
    this.imgBorder = '2px solid #bdc3c7';
    this.workType = 1204;
    this.paymentDue = 0;
    this.pcImgs = [];
    this.saveImagePayload = {
      images: [],
      targetFileType: ''
    };

  }

  /*browseResult(event){
    var fileselector = document.getElementById('fileselector');
    console.log(fileselector.value);
    document.getElementById("fakepath").value = fileselector.value;
  }*/

  startModalWithClass(start: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        start,
        Object.assign({}, { class: 'gray modal-lg' })
      );
  }

  createImages() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedScanPcImgs.length; i++) {
      const img = new Image();
      img.src = 'http://storage.myepsoft.com:53335/kioskapi/' + this.selectedScanPcImgs[i];
      this.pcImgs.push(img);
      //this.fileSaverService.save('http://storage.myepsoft.com:53335/kioskapi/', '');
    }
    // var FileSaver = require('file-saver');
    // FileSaver.saveAs('http://storage.myepsoft.com:53335/kioskapi/' + this.selectedScanPcImgs[0], 'E:\img.pdf');
    console.log(this.pcImgs);
  }

  calculateDuePayment() {
    const finalMediaType: any = this.mediaTypes.filter((media: any) => {
      return media.workType === this.workType && media.mediaSizeName === this.selectedPaper && media.color === this.selectedColorCode;
    });
    if (finalMediaType.length > 0) {
      this.paymentDue = finalMediaType[0].cost;
    }
  }

  getAllMediaTypes() {
    this.commonService.get_AllMediaCost_Service().subscribe((response: any) => {
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
  updateImage(filter, rotate) {
    if (filter) {
      this.pcImgs.forEach(img => {
        // tslint:disable-next-line:max-line-length
        img.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; filter:grayscale(100%); transform:rotate(${rotate})`);
      });
      // tslint:disable-next-line:max-line-length
      this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; filter:grayscale(100%); transform:rotate(${rotate})`);
    } else {
      this.pcImgs.forEach(img => {
        // tslint:disable-next-line:max-line-length
        img.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
      });
      // tslint:disable-next-line:max-line-length
      this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
    }
    console.log(this.pcImgs);
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
    this.calculateDuePayment();
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
    this.calculateDuePayment();
  }

  onFileChange(value) {
    this.selectedFile = value;
  }

  onResolutionChange(value) {
    this.selectedResolution = value;
  }

  onPaperChange(value) {
    this.selectedPaper = value;
    this.calculateDuePayment();
  }

  scanUsbGo() {
    const newImage = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.pcImgs.length; i++) {
      newImage.push(this.commonService.getDataUrl(this.pcImgs[i], this.selectedScanPcImgs[i]));
    }
    const color = this.selectedColorCode === 1 ? true : false;
    const reqData = {
      newImage,
      pageFormat: this.selectedPaper,
      color
    };
    this.saveImagePayload.images = newImage;
    this.saveImagePayload.targetFileType = this.selectedFile.toLowerCase();
    console.log(this.saveImagePayload);
    this.saveImageService.saveImage(this.saveImagePayload).subscribe((response: any) => {
      this.commonService.saveImgLocal(response[0]).subscribe( (pdf: any) => {
        console.log('gopi');
        saveAs(pdf, 'gopi.pdf');
      });
      // this.router.navigateByUrl('/');
      console.log('Success Response', response);
    }, error => {
      console.log('Failure Response' + error);
    });

    /*this.commonService.paymentPopup().subscribe((response: any) => {
      try {
        console.log('Response', response);
        if (response) {
          this.commonService.saveImgs(reqData).subscribe( (res: any) => {
            try {
                console.log('res');
                if (res === 'Images sent successfully.') {
                  this.scanserviceService.insertScanJob().subscribe((resp: any) => {
                    console.log('resp');
                  });
                }
            } catch (error) {

            }
          });
        }
      } catch (error) {
      }
    });*/
  }

}
