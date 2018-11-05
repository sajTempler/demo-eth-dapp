import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountImportPage } from './account-import';

@NgModule({
  declarations: [
    AccountImportPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountImportPage),
  ],
})
export class AccountImportPageModule {}
