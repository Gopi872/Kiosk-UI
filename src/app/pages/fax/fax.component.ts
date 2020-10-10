import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
declare var $: any;
@Component({
  selector: 'app-fax',
  templateUrl: './fax.component.html',
  styleUrls: ['./fax.component.css','../../../assets/css/dialpad.css']
})
export class FaxComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    var count=0;
    $(document).ready(function () {

      $('.num').click(function () {
          var num = $(this);
          var text = $.trim(num.find('.txt').clone().children().remove().end().text());
          if (count < 11) {
            $("#output").append('<span>' + text.trim() + '</span>');
            count++
          }
      });

      $('.delete').click(function () {
        $('#output span:last-child').remove();
        count--;
      });
  
  });
  
  $(function() {
    $("input[name='radio-group3']").click(function() {
      var preview = document.getElementById('preview-image');
      if ($("#horizontal").is(":checked")) {
        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(90deg);");
      } else if ($("#vertical").is(":checked")) {
        preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg);");
      }
    });
  });
  }

  startModalWithClass(start: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      start,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
}
}
