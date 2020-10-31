import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ScanserviceService} from '../../../services/scanservice.service';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import {PrintserviceService} from '../../../services/printservice.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
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
  fileName;

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
    this.paymentDue = 0;
    this.mailImgs = [];
    this.fileName = '';
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

  resize(img, MAX_WIDTH: number = 500, MAX_HEIGHT: number = 500) {
    let canvas = document.createElement('canvas');


    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, width, height);

    let dataUrl = canvas.toDataURL('image/jpeg');
    // IMPORTANT: 'jpeg' NOT 'jpg'
    return dataUrl;
  }

  imageChange() {
    let file_src = '//placehold.it/200';
    // Loop through each picture file
    // this.files = (input.target.files[0]);

    // Create an img element and add the image file data to it
    let img = document.createElement('img');
    //img.src = window.URL.createObjectURL(document.getElementById('preview-image').src);

    // Create a FileReader
    let reader = new FileReader();

    // Add an event listener to deal with the file when the reader is complete
    reader.addEventListener('load', (event: any) => {
    // Get the event.target.result from the reader (base64 of the image)
      img.src = event.target.result;

      // Resize the image
      let resized_img = this.resize(img);
      // Push the img src (base64 string) into our array that we display in our html template
      file_src = resized_img;
      }, false);

    // reader.readAsDataURL(input.target.files[0]);
        // }
  }
  // toDataURL = url => fetch(url)
  // .then(response => response.blob())
  // .then(blob => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => resolve(reader.result);
  //   reader.onerror = reject;
  //   reader.readAsDataURL(blob);
  // }))

  // toDataURl(url) {
  //   return from(fetch(url))
  //       .pipe(map(response => response.blob()));
  // }

  toDataURL(src, callback, outputFormat) {
    // tslint:disable-next-line:prefer-const
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    // tslint:disable-next-line:only-arrow-functions
    img.onload = function() {
      // tslint:disable-next-line:prefer-const
      let canvas = document.createElement('canvas');
      // tslint:disable-next-line:prefer-const
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = src;
    }
  }

  scanUsbGo() {
    // this.imageChange();
    this.toDataURL(
      'http://localhost:4200/assets/ui/10192020scan110322_3-5.jpg',
      // tslint:disable-next-line:only-arrow-functions
      function(dataUrl) {
        console.log('RESULT:', dataUrl);
      }, 'image/jpeg'
    );
  //   this.toDataURL('http://localhost:4200/assets/ui/10192020scan110322_3-5.jpg')
  // .then(dataUrl => {
  //   console.log('RESULT:', dataUrl)
  // })
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
   // console.log(newImage)
    // this.commonService.sendEmailToUser(newImage, this.mailServer.mainSendMail, this.mailServer.mailId).subscribe((respon: any) => {
    //   console.log(respon);
    //  });



    this.commonService.paymentPopup().subscribe((response: any) => {
      try {
        console.log('Response', response);
        if (response) {
          this.commonService.saveImgs(reqData).subscribe( (res: any) => {
            try {
                console.log('res');
                if (res === 'Images sent successfully.') {
                  this.commonService.sendEmailToUser(newImage, this.mailServer.mainSendMail, this.mailServer.mailId)
                  .subscribe((resp: any) => {
                    if (resp.data === 'Email sent successfully.') {
                      this.scanserviceService.insertScanJob().subscribe((respon: any) => {
                        console.log('Response', respon);
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
