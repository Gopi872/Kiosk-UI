import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  isDocument: boolean = true;
  isIdCard: boolean = false;
  modalRef: BsModalRef;
  Payment?: any;
  NumberofCopies?: any;
  FourInOne: boolean = false;
  TwoInOne: boolean = false;
  OneInOne: boolean = true;;
  isHorizontal: boolean = false;
  isVertical: boolean = true;
  isB4: boolean = true;
  isB5: boolean = false;
  isA3: boolean = false;
  isA4: boolean = true;
  isMonoColor: boolean = false;
  isColor: boolean = true;
  isDocCopy: boolean = true;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {

  }

  openModalWithClass(copy: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      copy,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  startModalWithClass(start: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      start,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  quantity: string = '0';
  i = 0;
  plus() {
    if (this.i != 100) {
      this.i++;
      this.quantity = this.i + ' Page';
    }
  }

  minus() {
    if (this.i != 1) {
      this.i--;
      this.quantity = this.i + ' Page';
    }
  }

  CheckDocumentType(documenttype, $event) {
    if (documenttype == 'doc') {
      if ($event.target.checked == true) {
        this.isDocument = true;
        this.isIdCard = false;
        this.isDocCopy = true;
      }
    }
    else {
      if ($event.target.checked == true) {
        this.isDocument = false;
        this.isIdCard = true;
        this.isDocCopy = false;
      }
    }
  }

  //jQueryFunction() {
  //  $(function () {
  //    $("input[name='radio-group5']").click(function () {
  //      if ($("#document_copy").is(":checked")) {
  //        $("#document_copy_div").show();
  //        $("#id_card_div").hide();
  //        $("#setting_div").show();
  //      } else {
  //        $("#document_copy_div").hide();
  //        $("#id_card_div").show();
  //        $("#setting_div").hide();
  //      }
  //    });
  //  });

  //  $(function () {
  //    $("input[name='radio-group2']").click(function () {
  //      var preview = document.getElementById('preview-image');
  //      if ($("#mono").is(":checked") && $("#vertical").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
  //      }
  //      else if ($("#vertical").is(":checked") && $("#mono").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
  //      }
  //      else if ($("#mono").is(":checked") && $("#horizontal").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
  //      }
  //      else if ($("#horizontal").is(":checked") && $("#mono").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
  //      }
  //      else if ($("#color").is(":checked") && $("#vertical").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
  //      }
  //      else if ($("#vertical").is(":checked") && $("#color").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
  //      }
  //      else if ($("#color").is(":checked") && $("#horizontal").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(90deg);");
  //      }
  //      else if ($("#horizontal").is(":checked") && $("#color").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg);");
  //      }
  //    });
  //    $("input[name='radio-group3']").click(function () {
  //      var preview = document.getElementById('preview-image');
  //      if ($("#mono").is(":checked") && $("#vertical").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
  //      }
  //      else if ($("#vertical").is(":checked") && $("#mono").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
  //      }
  //      else if ($("#mono").is(":checked") && $("#horizontal").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
  //      }
  //      else if ($("#horizontal").is(":checked") && $("#mono").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
  //      }
  //      else if ($("#color").is(":checked") && $("#vertical").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
  //      }
  //      else if ($("#vertical").is(":checked") && $("#color").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
  //      }
  //      else if ($("#color").is(":checked") && $("#horizontal").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(90deg);");
  //      }
  //      else if ($("#horizontal").is(":checked") && $("#color").is(":checked")) {
  //        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg);");
  //      }
  //    });
  //  });
  //}
}
