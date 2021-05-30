import { Component, OnInit } from '@angular/core';

import { GiphyFetch } from '@giphy/js-fetch-api'

import { LiquidCache } from 'ngx-liquid-cache';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  // API Key: q0CwrgPwQZWJmqjr9rDhKNYFVYDpojyh

  public searchKeyword: string = "";
  
  public gifData: any;

  readonly gf = new GiphyFetch('q0CwrgPwQZWJmqjr9rDhKNYFVYDpojyh');

  constructor() { }

  ngOnInit(): void {
    this.initialLoading();
  }

  @LiquidCache('gifData1')
  public async initialLoading() {
    try {
      this.gifData = await (await this.gf.trending({ limit: 24 })).data;
      console.log(this.gifData);
    } catch (error) {
      console.log('Error occurred: ' + error);
    }
  }

  public findGif(event: any) {

  }

  // Assuming to invoke getSingleUser(1), the result 
  // will be stored in the cache system with key 'user1'
  @LiquidCache('gifData{event}')
  public async pageChange(event: any) {
    console.log(event);
    try {
      this.gifData = await (await this.gf.trending({ limit: 24, offset: (((event - 1) * 24) + 1) })).data;
      console.log(this.gifData);
    } catch (error) {
      console.log('Error occurred: ' + error);
    }
  }

}
