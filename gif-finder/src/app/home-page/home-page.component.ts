import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { GiphyFetch } from '@giphy/js-fetch-api'

import { LiquidCacheConfig, LiquidCacheService } from 'ngx-liquid-cache';

import { SamplerServiceService } from '../Service/sampler-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ContentType } from '../content-type-enum';

import { IGif } from '@giphy/js-types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Output() categoriesList = new EventEmitter<string[]>();

  public searchKeyword: string = "";
  
  private tempSearchKeyword: string = "";

  private tempCategory: string = '';
  
  public gifData: any;

  public contentType: ContentType = ContentType.NONE;

  readonly gf = new GiphyFetch('q0CwrgPwQZWJmqjr9rDhKNYFVYDpojyh');

  readonly specificConf: LiquidCacheConfig = { duration: 60 };

  public totalCount: number = 50;
  
  public initial: number = 1;

  private currentCategory: string = ''; 

  public isSpinning: boolean = false;

  public isEmpty: boolean = false;

  constructor(private cache: LiquidCacheService, private sampler: SamplerServiceService, private message: NzMessageService) {
    this.sampler.subcategorySubject.subscribe((response) => {
      this.currentCategory = response;
      this.getSubcategoriesGifs(response, 1);
      console.log('Response from Home Component: ', response);
    }, (error) => {
      console.log('Error from Home Component: ', error);
    })
  }

  ngOnInit(): void {
    this.init();
    this.getTrendingGifs(1);
  }

  public async init(): Promise<void> {
    try {
      const { data: categories } = await this.gf.categories();
      console.log('CategoriesList', categories);
      let categoriesList: string[] = [];
      categories.forEach((category: any) => {
        console.log(category) // ICategory
        categoriesList.push(category.name);
      });

      let crossBindData = { categories: categoriesList, subcategoriesFn: async (category: string) => { await this.gf.subcategories(category, { limit: 10, offset: 24, }) } }

      this.sampler.categorySubject.next(crossBindData);
    } catch (error) {
      this.message.create('error', error);
    }
  }

  /* This function gets called on any change in pagination index*/
  public async pageChange(event: any) {
    console.log(event);   

    switch(this.contentType) {
      case ContentType.TREND: this.getTrendingGifs(event); break;
      case ContentType.SEARCH: this.getSearchedGifs(null, event); break;
      case ContentType.SUBCATEGORY: this.getSubcategoriesGifs(this.currentCategory, event); break;
    }
  }

  /* Used to fetch trending gifs from giphy repository */
  public async getTrendingGifs(page: number) {
    this.isSpinning = true;
    const id = this.message.loading('In progress...', { nzDuration: 0 }).messageId;
    if (this.contentType == ContentType.TREND && this.cache.get('gifData' + page))
    {
      let cacheData: object = this.cache.getCacheObject('gifData' + page).value;
      console.log('Cached Value:', cacheData);
      this.gifData = cacheData;
    } 
    else {
      try {
        let tempData = await (await this.gf.trending({ limit: 24, offset: (((page - 1) * 24) + 1) })).data;
        tempData.length > 0 ? this.gifData = tempData : null;
        console.log('Response: ', tempData);
        console.log('Trending Gifs: ', this.gifData);
        this.commonOperation(tempData, page);
      } catch (error) {
        console.log('Error occurred: ' + error);
        this.message.create('error', error);
      }
    }
    this.contentType = ContentType.TREND;
    this.isSpinning = false;
    this.message.remove(id);
  }

  /* Used to fetch gifs for the searched ketword from giphy repository */
  public async getSearchedGifs(event: any, page: number) {
    this.isSpinning = true;
    const id = this.message.loading('In progress...', { nzDuration: 0 }).messageId;
    if (event != null) { this.totalCount = 0; } // Without this, the pagination index isn't changing on UI from any value greater than default value, back to the default value again on this.gifData value change.
    if (this.contentType == ContentType.SEARCH && this.tempSearchKeyword.trim().length > 0 && this.tempSearchKeyword.trim().toLowerCase() == this.searchKeyword.trim().toLowerCase() && this.cache.get('gifData' + page))
    {
      let cacheData: object = this.cache.getCacheObject('gifData' + page).value;
      console.log('Cached Value:', cacheData);
      this.gifData = cacheData;
    } 
    else {
      try {
        this.tempSearchKeyword = this.searchKeyword;
        let tempData = await (await this.gf.search(this.searchKeyword, { limit: 24, offset: (((page - 1) * 24) + 1), sort: 'relevant', })).data;
        tempData.length > 0 ? this.gifData = tempData : null;
        console.log('Response: ', tempData);
        console.log('Searched Gifs: ', this.gifData);
        this.commonOperation(tempData, page);
      } catch (error) {
        console.log('Error occurred: ' + error);
        this.message.create('error', error);
      }
    }    
    this.contentType = ContentType.SEARCH;
    this.isSpinning = false;
    this.message.remove(id);
  }

  /* Used to fetch gifs under a certain category selected from side nav bar */
  public async getSubcategoriesGifs(category: string, page: number) {
    this.isSpinning = true;
    const id = this.message.loading('In progress...', { nzDuration: 0 }).messageId;
    if (this.contentType == ContentType.SUBCATEGORY && this.currentCategory == this.tempCategory && this.cache.get('gifData' + page))
    {
      let cacheData: object = this.cache.getCacheObject('gifData' + page).value;
      console.log('Cached Value:', cacheData);
      this.gifData = cacheData;
    } 
    else {
      try {
        let tempDataCollector = await (await this.gf.subcategories(category.replace(/ +/g, "").trim(), { limit: 24, offset: (((page - 1) * 24) + 1) })).data;
        let tempData: (IGif | undefined)[] = [];
        tempDataCollector.forEach((value, index) => {
          tempData.push(value.gif);
        })
        tempData.length > 0 ? this.gifData = tempData : null;
        console.log('Subcategory Gifs: ', this.gifData);
        this.commonOperation(tempData, page);
      } catch (error) {
        console.log('Error occurred: ' + error);
        this.message.create('error', error);
      }
    }
    this.contentType = ContentType.SUBCATEGORY;
    this.isSpinning = false;
    this.message.remove(id);
  }

  /* common operation to be performed on the response data received */
  private commonOperation(gifData: any, page: number) {
    if (gifData.length == 0)
    {
      page - 1 != 0 ? this.totalCount = 10 * (page - 1) : null;
      this.isEmpty = true;
      console.log('Sorry, no results found!');
      this.message.create('error', 'Sorry, no results found!');
    }
    else if(gifData.length < 24)
    {
      this.totalCount = 10 * page;
      this.isEmpty = false;
      this.cache.set('gifData' + page, gifData, this.specificConf);
    }
    else {
      this.totalCount = 50;
      this.isEmpty = false;
      this.cache.set('gifData' + page, gifData, this.specificConf);
    }
  }

}
