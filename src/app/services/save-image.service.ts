import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SaveImagePayload} from '../pages/scan/usb/save-image-payload';

@Injectable({
  providedIn: 'root'
})
export class SaveImageService {

  constructor(private httpClient: HttpClient) { 


  }
  saveImage(saveImagePayload: SaveImagePayload){
    return this.httpClient.post('http://storage.myepsoft.com:53335/kioskapi/images/save/', saveImagePayload);
  }
}
