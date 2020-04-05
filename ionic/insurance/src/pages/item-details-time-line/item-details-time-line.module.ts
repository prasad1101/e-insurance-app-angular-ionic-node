import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailsPageTimeLine } from './item-details-time-line';


import { TimeLineLayout3Module } from '../../components/time-line/layout-3/time-line-layout-3.module';

@NgModule({
  declarations: [
    ItemDetailsPageTimeLine,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPageTimeLine),
    TimeLineLayout3Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ItemDetailsPageTimeLineModule { }
