import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class FaxserviceService {
  selectedFaxImgs;
  selectedPrinter;
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
    this.selectedFaxImgs = [];
    this.selectedPrinter = '';
  }

    // Insert Fax Job
    public insertFaxJob(data: any): Observable<any> {
      const insertFaxJobReq = {
        cost: 1,
        departmentId: 1,
        endDt: '2020-09-26T09:39:04Z',
        faxNumber: '07079979900',
        imageFileName: '/image/faxrecv/20200506/20200219122247.pdf',
        imageFileSize: 22375,
        jobStatus: 0,
        jobTypeId: 1301,
        jobUuid: '1fac789d-563b-4eaf-a22f-c93990898e',
        mediaSize: 16,
        printerId: 14,
        sheetCount: 0,
        startDt: '2020-09-26T09:39:04Z',
        thumbnailName: '/image/faxrecv/20200506/20200219122247_thumbnail.jpg',
        userId: 2
      };
       // tslint:disable-next-line: align
       return this.httpClient.post(`${this.baseUrl}/log/fax/insert`, insertFaxJobReq);
     }
}
