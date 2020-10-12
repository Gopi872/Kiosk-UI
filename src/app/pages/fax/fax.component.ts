import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FaxserviceService} from '../../services/faxservice.service';
import { CommonService } from '../../services/common.service';

declare var $: any;
@Component({
  selector: 'app-fax',
  templateUrl: './fax.component.html',
  styleUrls: ['./fax.component.css', '../../../assets/css/dialpad.css']
})
export class FaxComponent implements OnInit {
  selectedPaper: string;
  selectedDirection: string;
  selectedSlide: string;
  selectedFile: string;
  selectedFaxImgs: [];
  imgHeight: string;
  imgWidth: string;
  imgBorder: string;
  faxImgs;
  mediaTypes: [];
  workType;
  paymentDue;
  modalRef: BsModalRef;
  @ViewChild('previewImg', {static: false}) previewImg: ElementRef<HTMLImageElement>;

  constructor(private modalService: BsModalService, private faxserviceService: FaxserviceService, private commonService: CommonService) {
    this.selectedPaper = 'A4';
    this.selectedDirection = 'Vertical';
    this.selectedSlide = 'Single Slide';
    this.selectedFile = 'PDF';
    this.selectedFaxImgs = this.faxserviceService.selectedFaxImgs;
    this.imgHeight = '275px';
    this.imgWidth = '240px';
    this.imgBorder = '2px solid #bdc3c7';
    this.workType = 1203;
    this.paymentDue = '';
    this.faxImgs = [];
  }

  createImages() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFaxImgs.length; i++) {
      const img = new Image();
      img.src = 'http://storage.myepsoft.com:53335/kioskapi/' + this.selectedFaxImgs[i];
      this.faxImgs.push(img);
    }
    console.log(this.faxImgs);
  }

  calculateDuePayment() {
    const finalMediaType: any = this.mediaTypes.filter((media: any) => {
      return media.workType === this.workType && media.mediaSizeName === this.selectedPaper;
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
    this.createImages();
    this.getAllMediaTypes();

    let count = 0;
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {

      $('.num').click(function() {
          const num = $(this);
          const text = $.trim(num.find('.txt').clone().children().remove().end().text());
          if (count < 11) {
            $('#output').append('<span>' + text.trim() + '</span>');
            count++;
          }
      });

      // tslint:disable-next-line:only-arrow-functions
      $('.delete').click(function() {
        $('#output span:last-child').remove();
        count--;
      });

    });
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  updateImage(rotate) {
    this.faxImgs.forEach(img => {
      // tslint:disable-next-line:max-line-length
      img.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
    });
    // tslint:disable-next-line:max-line-length
    this.previewImg.nativeElement.setAttribute('style', `height:${this.imgHeight}; width:${this.imgWidth}; border:${this.imgBorder}; transform:rotate(${rotate})`);
  }

  onDirectionChange(value) {
    this.selectedDirection = value;
    if (value === 'Vertical') {
      this.updateImage('0deg');
    } else if (value === 'Horizontal') {
      this.updateImage('90deg');
    }
    this.calculateDuePayment();
  }

  onSlideChange(value) {
    this.selectedSlide = value;
  }

  onPaperChange(value) {
    this.selectedPaper = value;
    this.calculateDuePayment();
  }

  scanUsbGo() {
    const newImage = [];
    for (let i = 0; i < this.faxImgs.length; i++) {
      newImage.push(this.commonService.getDataUrl(this.faxImgs[i], this.selectedFaxImgs[i]));
    }
    const reqData = {
      newImage,
      pageFormat: this.selectedPaper,
      color: true
    };

    this.commonService.paymentPopup().subscribe((response: any) => {
      try {
        console.log('Response', response);
        if (response) {
          this.commonService.saveFaxImgs(this.selectedFaxImgs).subscribe( (res: any) => {
            try {
                console.log('res');
                if (res === 'Images sent successfully.') {
                  this.faxserviceService.insertFaxJob(reqData).subscribe((resp: any) => {
                    if (resp.data === 'Scan Log inserted successfully.') {
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

  startModalWithClass(start: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      start,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
