import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';  
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PrintComponent } from './pages/print/print.component';
import { ScanComponent } from './pages/scan/scan.component';
import { PcComponent } from './pages/scan/pc/pc.component';
import { MailComponent } from './pages/scan/mail/mail.component';
import { UsbComponent } from './pages/scan/usb/usb.component';
import { FaxComponent } from './pages/fax/fax.component';
import { CopyComponent } from './pages/copy/copy.component';
import { CloudComponent } from './pages/print/cloud/cloud.component';
import { PrintPcComponent } from './pages/print/print-pc/print-pc.component';
import { PrintUsbComponent } from './pages/print/print-usb/print-usb.component';

import {PrintserviceService} from './services/printservice.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {httpInterceptor} from './http.interceptor';
import { FormsModule } from '@angular/forms';
import { SelectImageComponent } from './pages/select-image/select-image.component';
import { SelectImageScanpcComponent } from './pages/select-image-scanpc/select-image-scanpc.component';
import { SelectImageScanfaxComponent } from './pages/select-image-scanfax/select-image-scanfax.component';
import { SelectImageScanusbComponent } from './pages/select-image-scanusb/select-image-scanusb.component';
import { SelectImageScanmailComponent } from './pages/select-image-scanmail/select-image-scanmail.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrintComponent,
    ScanComponent,
    PcComponent,
    MailComponent,
    UsbComponent,
    FaxComponent,
    CopyComponent,
    CloudComponent,
    PrintPcComponent,
    PrintUsbComponent,
    SelectImageComponent,
    SelectImageScanpcComponent,
    SelectImageScanfaxComponent,
    SelectImageScanusbComponent,
    SelectImageScanmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [PrintserviceService,{provide:HTTP_INTERCEPTORS,useClass:httpInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
