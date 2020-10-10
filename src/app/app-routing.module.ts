import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/pages/home/home.component';
import {PrintComponent} from '../app/pages/print/print.component';
import {ScanComponent} from '../app/pages/scan/scan.component';
import {PcComponent} from '../app/pages/scan/pc/pc.component';
import {MailComponent} from '../app/pages/scan/mail/mail.component';
import {UsbComponent} from '../app/pages/scan/usb/usb.component';
import {FaxComponent} from '../app/pages/fax/fax.component';
import { CloudComponent } from './pages/print/cloud/cloud.component';
import { PrintPcComponent } from './pages/print/print-pc/print-pc.component';
import { PrintUsbComponent } from './pages/print/print-usb/print-usb.component';
import {SelectImageComponent} from './pages/select-image/select-image.component'
import {SelectImageScanfaxComponent} from './pages/select-image-scanfax/select-image-scanfax.component';
import {SelectImageScanmailComponent} from './pages/select-image-scanmail/select-image-scanmail.component'
import {SelectImageScanpcComponent} from './pages/select-image-scanpc/select-image-scanpc.component'
import {SelectImageScanusbComponent} from './pages/select-image-scanusb/select-image-scanusb.component'
import {CopyComponent} from './pages/copy/copy.component'
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'print',component:PrintComponent},
  { path: 'scan',component:ScanComponent},
  { path: 'scan-pc',component:PcComponent},
  { path: 'scan-usb',component:UsbComponent},
  { path: 'scan-mail',component:MailComponent},
  { path: 'fax',component:FaxComponent},

  { path: 'print-pc',component:PrintPcComponent},
  { path: 'print-usb',component:PrintUsbComponent},
  { path: 'print-cloud',component:CloudComponent},
  
  { path: 'copy',component:CopyComponent},
  { path: 'select-image',component:SelectImageComponent},

  {path:'fax-image', component:SelectImageScanfaxComponent},
  {path:'scanpc-image', component:SelectImageScanpcComponent},
  {path:'scanusb-image', component:SelectImageScanusbComponent},
  {path:'scanmail-image', component:SelectImageScanmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
