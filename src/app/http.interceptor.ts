import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
 
@Injectable()
export class httpInterceptor implements HttpInterceptor {
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
        headers: new HttpHeaders({
          'Accept':  '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Host':'<calculated when request is sent>'
        })
      });
    return next.handle(request);
 
  }
 
}