import { Component, OnInit } from '@angular/core';
import {PrintserviceService} from '../../services/printservice.service'
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(private PrintserviceService:PrintserviceService) { }

  ngOnInit() {

    this.PrintserviceService.fetchPrintMethod().subscribe((data:any)=>{
      console.log("avinash",data);
    })
  }

}
