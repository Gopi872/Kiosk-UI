import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { CommonService} from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CopyserviceService {

  baseUrl = environment.baseUrl;
  oldBaseUrl = environment.oldBaseUrl;
  selectedCopyImgs;
  selectedPrinter: string;

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.selectedCopyImgs = [];
    this.selectedPrinter = '';
   }

  //  Get Cost of All Media Types
   public getMediaTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/system/media/cost`);
   }

   // Payment Popup Go
   public paymentPopup(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/status`);
  }

  // Insert Copy Job
  public insertCopyJob(data: any): Observable<any> {
    const insertCopyJobReq = {
      doc: '',
      userId: 78,
      outType: 1202,
      departmentId: 73,
      printerId: 13,
      code: '',
      locationId: 1,
      color: data.color,
      mediaSizeId: 1,
      realMediaSizeId: 1,
      sheetCount: 1,
      unitMoney: 1.00,
      allMoney: 1.00,
      startDt: '2020-09-30T17:02:47Z',
      endDt: '2020-09-30T17:02:47Z',
      clientIp: this.commonService.ipAddress,
      clientName: 'RNP583879147768',
      submitBranchId: 1,
      spoolFileSize: 0,
      spoolFileName: '',
      charged: 0,
      submitDay: 30,
      submitMonth: 9,
      submitYear: 2020,
      applicationName: 'gsnx',
      permissionId: 1,
      exceptionId: 1
    };
     // tslint:disable-next-line: align
     return this.http.post(`${this.baseUrl}/log/out/insert`, insertCopyJobReq);
   }
}
