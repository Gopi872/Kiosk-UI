import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScanserviceService {

  baseUrl = environment.baseUrl;
  oldBaseUrl = environment.oldBaseUrl;
  oldBaseUrl1 = environment.oldBaseUrl1;
  selectedScanUsbImgs;
  selectedPrinter: string;

  constructor(private http: HttpClient) {
    this.selectedScanUsbImgs = [];
    this.selectedPrinter = '';
   }

  /**
    * Get Cost of All Media Types
    */
   public getMediaTypes(): Observable<any> {
    return this.http.get(`${this.oldBaseUrl1}/system/media/cost`);
   }

   //Payment Popup Go
   public paymentPopup(): Observable<any> {
    return this.http.get(`${this.oldBaseUrl1}/dashboard/status`);
  }

  //Save Images
  public saveScanUsbImgs(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/kioskapi/images/send`, data);
  }
}
