import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrintCloudService {

  constructor(private httpClient: HttpClient) { 
  }
  getAllDocs(phoneNumber:String){
    console.log();
    return this.httpClient.get(`http://103.55.191.95/PrintPluinV2/printplugin/api/v2/document/az3hqat4j3u5tngj7j6k53kjuzsmfy0cyrh1sjdpbol8ouna6s/1/${phoneNumber}`);
  }

}
