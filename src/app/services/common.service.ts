import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private api = "https://your_api_url.com";

  baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api+ '/files/');
  }

  // Get All media cost service 

  get_AllMediaCost_Service(){
    return this.httpClient.get(`${this.baseUrl}/system/media/cost`);
  }

}
