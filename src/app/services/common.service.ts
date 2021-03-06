import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private api = 'https://your_api_url.com';
  ipAddress;
  selectedPrinterObj: any;

  baseUrl = environment.baseUrl;
  oldBaseUrl = environment.oldBaseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
    this.ipAddress = this.getIPAddress();
    this.selectedPrinterObj = {};
   }

  getData(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api + '/files/');
  }

  // Get All media cost service

  get_AllMediaCost_Service() {
    return this.httpClient.get(`${this.baseUrl}/system/media/cost`);
  }

  // Payment Popup Go
  public paymentPopup(): Observable<any> {
   return this.httpClient.get(`${this.baseUrl}/dashboard/status`);
 }

 // Save Images
 public saveImgs(data: any): Observable<any> {
  const reqData = {
    images : data.newImage,
    destPrinterUrl: this.selectedPrinterObj.printerURL,
    attributes: {
      username: 'user',
      copies: 1,
      duplex: false,
      color: data.color,
      pageFormat: data.pageFormat
    }
  };
  const headers = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };
   // tslint:disable-next-line: align
   return this.httpClient.post(`${this.oldBaseUrl}/kioskapi/images/send`, this.getImageReq(data));
 }

 // Save Fax Images
 public saveFaxImgs(data: any): Observable<any> {
  const reqData = {
    images : data.newImage,
    destPrinterUrl: this.selectedPrinterObj.printerURL,
    attributes: {
      username: 'user',
      copies: 1,
      duplex: false,
      color: data.color,
      pageFormat: data.pageFormat
    }
  };
   // tslint:disable-next-line: align
   return this.httpClient.post(`${this.oldBaseUrl}/kioskapi/fax/send`, data);
 }

 getImageReq(data) {
   return {
    images : data.newImage,
    destPrinterUrl: this.selectedPrinterObj.printerURL,
    attributes: {
      username: 'user',
      copies: 1,
      duplex: false,
      color: data.color,
      pageFormat: data.pageFormat
   }
  };
 }

 // IP Address
 getIPAddress() {
    this.httpClient.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }

  saveImgLocal(url): Observable<any> {
    return this.httpClient.get('http://storage.myepsoft.com:53335/kioskapi/' + url, { responseType: 'blob'});
  }

  // Save Images
  public sendEmailToUser(attachments: any, sendMail: any, sendTitle: any): Observable<any> {
    attachments.forEach(element => {
      element.filename = element.fileName;
    });
    const emaildata = {
    from: {
      email: 'developer9@myepsoft.com'
    },
    content: [{
      type: 'text/plain',
      subject: sendTitle,
      value: 'Dear User, Thanks for your cooperation.'
    }],
    mailSettings: {
      to: {
        email: sendMail,
        enable: true
      }
    },
    // tslint:disable-next-line: object-literal-shorthand
    attachments: attachments
   };
    return this.httpClient.post(`${this.oldBaseUrl}/kioskapi/email/send`, emaildata);
  }
 
  // convert img to Base64
  getDataUrl(img, imgPath) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    img.crossOrigin = 'anonymous';
    // Draw the image
    ctx.drawImage(img, 0, 0);
    const fileName = canvas.toDataURL('image/jpeg');
    const image = {
      fileName: imgPath,
      content: fileName.split(',')[1]
    };
    return image;
 }

}
