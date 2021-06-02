import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroAntdModule } from './ng-zorro-antd/ng-zorro-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxLiquidCacheModule, LiquidCacheConfig, LiquidCacheStorageTypes } from 'ngx-liquid-cache';

import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common'; 
import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SamplerServiceService } from './Service/sampler-service.service';


registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

const liquidCacheConfig: LiquidCacheConfig = {
  duration: 60,
  storageType: LiquidCacheStorageTypes.localStorage
};


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxLiquidCacheModule.forRoot(liquidCacheConfig),
  ],
  providers: [SamplerServiceService, { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
