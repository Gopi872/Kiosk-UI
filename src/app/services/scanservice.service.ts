import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { CommonService} from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ScanserviceService {

  baseUrl = environment.baseUrl;
  oldBaseUrl = environment.oldBaseUrl;
  selectedScanUsbImgs;
  selectedScanPcImgs;
  selectedScanMailImgs;
  selectedPrinter: string;

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
    this.selectedScanUsbImgs = [];
    this.selectedScanPcImgs = [];
    this.selectedScanMailImgs = [];
    this.selectedPrinter = '';
   }

   // Insert Scan Job
   public insertScanJob(): Observable<any> {
    const insertScanJobReq = {
      userId: 78,
      id: '190711766',
      userName: '',
      scanType: 1004,
      departmentId: 73,
      printerId: 13,
      code: '',
      ip: this.commonService.ipAddress,
      locationId: 0
    };
     // tslint:disable-next-line: align
     return this.httpClient.post(`${this.baseUrl}/log/scan/insert`, insertScanJobReq);
   }
}
