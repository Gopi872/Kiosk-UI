import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ScanserviceService} from '../../../services/scanservice.service';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import {PrintserviceService} from '../../../services/printservice.service';
declare var $: any;

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mailServer: any;
  selectedColor: string;
  selectedColorCode;
  selectedPaper: string;
  selectedDirection: string;
  selectedResolution: string;
  selectedFile: string;
  selectedScanMailImgs: [];
  imgHeight: string;
  imgWidth: string;
  imgBorder: string;
  mailImgs;
  mediaTypes: [];
  workType;
  paymentDue;
  modalRef: BsModalRef;
  @ViewChild('previewImg', {static: false}) previewImg: ElementRef<HTMLImageElement>;

  constructor(private modalService: BsModalService, private scanserviceService: ScanserviceService, 
              private commonService: CommonService, private printserviceService: PrintserviceService) {
    this.selectedColor = 'Color';
    this.selectedColorCode = 1;
    this.selectedPaper = 'A4';
    this.selectedDirection = 'Vertical';
    this.selectedResolution = '100dpi';
    this.selectedFile = 'PDF';
    this.selectedScanMailImgs = this.scanserviceService.selectedScanMailImgs;
    this.imgHeight = '275px';
    this.imgWidth = '240px';
    this.imgBorder = '2px solid #bdc3c7';
    this.workType = 1204;
    this.paymentDue = '';
    this.mailImgs = [];
  }

  startModalWithClass(start: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        start,
        Object.assign({}, { class: 'gray modal-lg' })
      );
  }

  createImages() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedScanMailImgs.length; i++) {
      const img = new Image();
      img.src = 'http://storage.myepsoft.com:53335/kioskapi/' + this.selectedScanMailImgs[i];
      this.mailImgs.push(img);
    }
    console.log(this.mailImgs);
  }

  calculateDuePayment() {
    const finalMediaType: any = this.mediaTypes.filter((media: any) => {
      return media.workType === this.workType && media.mediaSizeName === this.selectedPaper && media.color === this.selectedColorCode;
    });
    this.paymentDue = finalMediaType[0].cost;
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
    this.getPrintService();
    this.createImages();
    this.getAllMediaTypes();
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  updateImage(filter, rotate) {
    if (filter) {
      this.mailImgs.forEach(img => {
        // tslint:disable-next-line:max-line-length
        img.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; filter:grayscale(100%); transform:rotate(${rotate})`);
      });
      // tslint:disable-next-line:max-line-length
      this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; filter:grayscale(100%); transform:rotate(${rotate})`);
    } else {
      this.mailImgs.forEach(img => {
        // tslint:disable-next-line:max-line-length
        img.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
      });
      // tslint:disable-next-line:max-line-length
      this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
    }
    console.log(this.mailImgs);
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

  getPrintService() {
    this.printserviceService.fetchMailServernfo().subscribe((data: any) => {
      this.mailServer = data.data;
    });
  }

  scanUsbGo() {
    const newImage = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.mailImgs.length; i++) {
      newImage.push(this.commonService.getDataUrl(this.mailImgs[i], this.selectedScanMailImgs[i]));
    }
    const color = this.selectedColorCode === 1 ? true : false;
    const reqData = {
      newImage,
      pageFormat: this.selectedPaper,
      color
    };

    this.commonService.paymentPopup().subscribe((response: any) => {
      try {
        console.log('Response', response);
        if (response) {
          this.commonService.saveImgs(reqData).subscribe( (res: any) => {
            try {
                console.log('res');
                if (res === 'Images sent successfully.') {
                  this.scanserviceService.insertScanJob().subscribe((resp: any) => {
                    // tslint:disable-next-line: whitespace
                    if(resp.data === 'Scan Log inserted successfully.') {
                      this.commonService.sendEmailToUser(newImage).subscribe((respon: any) => {
                        console.log(respon);
                      });
                    }
                  });
                }
            } catch (error) {

            }
          });
        }
      } catch (error) {
      }
    });
  }

}
