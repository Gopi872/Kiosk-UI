import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CopyserviceService } from '../../services/copyservice.service';
import { CommonService } from '../../services/common.service';

declare var $: any;
@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule],
  declarations: []
}
)
@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})
export class CopyComponent implements OnInit {

  constructor(private modalService: BsModalService, private copyserviceService: CopyserviceService, private commonService: CommonService) {
    this.selectedColor = 'Color';
    this.selectedColorCode = 1;
    this.selectedPaper = 'A4';
    this.selectedDirection = 'Vertical';
    this.selectedResolution = '100dpi';
    this.selectedFile = 'PDF';
    this.selectedCopyImgs = this.copyserviceService.selectedCopyImgs;
    this.imgHeight = '275px';
    this.imgWidth = '240px';
    this.imgBorder = '2px solid #bdc3c7';
    this.workType = 1202; // 1204
    this.paymentDue = 0;
    this.selectedPage = '';
    this.selectedOption = '';
    this.selectedProcess = '';
    this.copyImgs = [];
  }



  selectedColor: string;
  selectedColorCode;
  selectedPaper: string;
  selectedDirection: string;
  selectedResolution: string;
  selectedPage: string;
  selectedOption: string;
  selectedProcess: string;
  selectedFile: string;
  selectedCopyImgs: [];
  imgHeight: string;
  imgWidth: string;
  imgBorder: string;
  copyImgs;
  mediaTypes: [];
  workType;
  paymentDue;
  modalRef: BsModalRef;
  @ViewChild('previewImg', {static: false}) previewImg: ElementRef<HTMLImageElement>;


  /* ************************************************************************************************  */

  isDocument = true;
  isIdCard = false;
  // modalRef: BsModalRef;
  Payment?: any;
  NumberofCopies?: any;
  FourInOne = false;
  TwoInOne = false;
  OneInOne = true;  isHorizontal = false;
  isVertical = true;
  isB4 = true;
  isB5 = false;
  isA3 = false;
  isA4 = true;
  isMonoColor = false;
  isColor = true;
  isDocCopy = true;

  quantity = '1 Page';
  i = 1;

  startModalWithClass(start: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        start,
        Object.assign({}, { class: 'gray modal-lg' })
      );
  }

  createImages() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedCopyImgs.length; i++) {
      const img = new Image();
      img.src = 'http://storage.myepsoft.com:53335/kioskapi/' + this.selectedCopyImgs[i];
      this.copyImgs.push(img);
    }
  }

  calculateDuePayment() {
    const finalMediaType: any = this.mediaTypes.filter((media: any) => {
      return media.workType === this.workType && media.mediaSizeName === this.selectedPaper && media.color === this.selectedColorCode;
    });
    if (finalMediaType.length > 0) {
      this.paymentDue = finalMediaType[0].cost * this.i;
    }
  }

  getAllMediaTypes() {
    this.copyserviceService.getMediaTypes().subscribe((response: any) => {
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
      this.copyImgs.forEach(img => {
        // tslint:disable-next-line:max-line-length
        img.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; filter:grayscale(100%); transform:rotate(${rotate})`);
      });
      // tslint:disable-next-line:max-line-length
      this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; filter:grayscale(100%); transform:rotate(${rotate})`);
    } else {
      this.copyImgs.forEach(img => {
        // tslint:disable-next-line:max-line-length
        img.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
      });
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

  onPageChange(value) {
    this.selectedPage = value;
  }

  onOptionChange(value) {
    this.selectedOption = value;
  }

  onProcessChange(value) {
    this.selectedProcess = value;
  }

  onPaperChange(value) {
    this.selectedPaper = value;
    this.calculateDuePayment();
  }
  getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    img.crossOrigin = 'anonymous';
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL();
 }

 scanUsbGo() {
  const newImage = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < this.copyImgs.length; i++) {
    newImage.push(this.commonService.getDataUrl(this.copyImgs[i], this.selectedCopyImgs[i]));
  }
  const color = this.selectedColorCode === 1 ? true : false;
  const reqData = {
    newImage,
    pageFormat: this.selectedPaper,
    color
  };
  const insertReq = {
    color : this.selectedColorCode
  };
  this.commonService.paymentPopup().subscribe((response: any) => {
    try {
      console.log('Response', response);
      if (response) {
        this.commonService.saveImgs(reqData).subscribe( (res: any) => {
          try {
              console.log('res');
              if (res === 'Images sent successfully.') {
                this.copyserviceService.insertCopyJob(insertReq).subscribe((resp: any) => {
                  console.log('resp');
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

  openModalWithClass(copy: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      copy,
      Object.assign({}, { class: 'gray modal-lg' })
    );
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

  CheckDocumentType(documenttype, $event) {
    if (documenttype === 'doc') {
      if ($event.target.checked === true) {
        this.isDocument = true;
        this.isIdCard = false;
        this.isDocCopy = true;
      }
    } else {
      if ($event.target.checked === true) {
        this.isDocument = false;
        this.isIdCard = true;
        this.isDocCopy = false;
      }
    }
  }

  jQueryFunction() {
   $(function() {
     $('input[name=\'radio-group5\']').click(function() {
       if ($('#document_copy').is(':checked')) {
         $('#document_copy_div').show();
         $('#id_card_div').hide();
         $('#setting_div').show();
       } else {
         $('#document_copy_div').hide();
         $('#id_card_div').show();
         $('#setting_div').hide();
       }
     });
   });

}}
