import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../../services/printservice.service';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
public mailServer:any;
  constructor(private PrintserviceService:PrintserviceService) {
    this.mailServer ;
    
  //  let d= this.formBuilder.group({
  //     mainSendMail: [''],
  //     mailId: [''],
  //     mailServer: ['']
  //   });

   }

  ngOnInit() {

    this.getPrintService();
    
    $(function() {
      $("input[name='colour']").click(function() {
        var preview = document.getElementById('preview-image');
        if ($("#mono").is(":checked") && $("#vertical").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
        } 
        else if ($("#vertical").is(":checked") && $("#mono").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
        } 
        else if ($("#mono").is(":checked") && $("#horizontal").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
        } 
        else if ($("#horizontal").is(":checked") && $("#mono").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
        } 
        else if ($("#color").is(":checked") && $("#vertical").is(":checked")){
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
        }
        else if ($("#vertical").is(":checked") && $("#color").is(":checked")){
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
        }
        else if ($("#color").is(":checked") && $("#horizontal").is(":checked")) {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(90deg);");
        }
        else if ($("#horizontal").is(":checked") && $("#color").is(":checked")) {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg);");
        }
      });
      $("input[name='direction']").click(function() {
        var preview = document.getElementById('preview-image');
        if ($("#mono").is(":checked") && $("#vertical").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
        } 
        else if ($("#vertical").is(":checked") && $("#mono").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(0deg);");
        } 
        else if ($("#mono").is(":checked") && $("#horizontal").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
        } 
        else if ($("#horizontal").is(":checked") && $("#mono").is(":checked"))
        {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; filter: grayscale(100%); transform: rotate(90deg);");
        } 
        else if ($("#color").is(":checked") && $("#vertical").is(":checked")){
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
        }
        else if ($("#vertical").is(":checked") && $("#color").is(":checked")){
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg); ");
        }
        else if ($("#color").is(":checked") && $("#horizontal").is(":checked")) {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(90deg);");
        }
        else if ($("#horizontal").is(":checked") && $("#color").is(":checked")) {
          preview.setAttribute("style", " background-image: url(https://picsum.photos/250/200); height: 275px; width: 240px; border: 2px solid #bdc3c7; transform: rotate(0deg);");
        }
      });
    });
  }

  getPrintService(){
    let obj ={'start':'0', 
    'length':'20'}

    console.log("avinash")
    this.PrintserviceService.fetchMailServernfo().subscribe((data:any)=>{

      console.log({data});
      this.mailServer= data.data;
      console.log("this",this.mailServer);
    })
    
  }

}
