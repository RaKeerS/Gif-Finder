import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { GiphyFetch } from '@giphy/js-fetch-api'

import { LiquidCache, LiquidCacheConfig, LiquidCacheService } from 'ngx-liquid-cache';

import { SamplerServiceService } from '../Service/sampler-service.service';

import { ContentType } from '../content-type-enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  // API Key: q0CwrgPwQZWJmqjr9rDhKNYFVYDpojyh

  @Output() categoriesList = new EventEmitter<string[]>();

  public searchKeyword: string = "";
  
  private tempSearchKeyword: string = "";
  
  public gifData: any;

  public contentType: ContentType = ContentType.NONE;

  readonly gf = new GiphyFetch('q0CwrgPwQZWJmqjr9rDhKNYFVYDpojyh');

  readonly specificConf: LiquidCacheConfig = { duration: 60 };

  public totalCount: number = 50;
  
  public initial: number = 1;

  constructor(private cache: LiquidCacheService, private sampler: SamplerServiceService) {

  }

  ngOnInit(): void {
    // this.initialLoading();
    this.getTrendingGifs(1);
    this.init();
  }

  public async init(): Promise<void> {
    const { data: categories } = await this.gf.categories();
    console.log('CategoriesList', categories);
    let categoriesList: string[] = [];
    categories.forEach((category: any) => {
      console.log(category) // ICategory
      categoriesList.push(category.name);
    });

    this.sampler.categories$ = new Observable<any>((observer) => {
      observer.next(categoriesList);

      return {
        unsubscribe: () => {
  
        },
        getSubCategories : () => {
  
        }
      }
    });

    this.sampler.categories$?.subscribe((response) => {
      let categories = response;
    }, (error) => {
  
    })

    this.sampler.emitData(categoriesList);

    this.sampler.categorySubject1.next(categoriesList);

    this.categoriesList.emit(categoriesList);


    // await this.gf.subcategories('tv', { limit: 10, offset: 25, })

    // const { data: categories1 } = await this.gf.categories();
    // console.log('Categories', categories);
    // categories1.forEach((category: any) => {
    //     console.log(category) // ICategory
    // })
  }

  // @LiquidCache('gifData1')
  public async initialLoading() {
    if (this.cache.get('gifData' + 1))
    {
      let cacheData: object = this.cache.getCacheObject('gifData' + 1).value;
      console.log('Cached Value:', cacheData);
      this.gifData = cacheData;
    } 
    else {
      try {
        this.gifData = await (await this.gf.trending({ limit: 24 })).data;
        console.log(this.gifData);
        this.cache.set('gifData'+ 1, this.gifData, this.specificConf);
      } catch (error) {
        console.log('Error occurred: ' + error);
      }
    }
  }

  public async findGif(event: any) {
    this.contentType = ContentType.SEARCH;
    if (this.tempSearchKeyword.trim.length > 0 && this.tempSearchKeyword != this.searchKeyword && this.cache.get('gifData' + 1))
    {
      let cacheData: object = this.cache.getCacheObject('gifData' + 1).value;
      console.log('Cached Value:', cacheData);
      this.gifData = cacheData;
    } 
    else {
      try {
        this.tempSearchKeyword = this.searchKeyword;
        this.gifData = await (await this.gf.search(this.searchKeyword, { limit: 24, sort: 'relevant', type: 'stickers' })).data;
        console.log(this.gifData);
        this.cache.set('gifData', this.gifData, this.specificConf);
      } catch (error) {
        console.log('Error occurred: ' + error);
      }
    }
  }

  // public getGifs(event: any) {
  //   this.getSearchedGifs(event);
  // }

  // Assuming to invoke getSingleUser(1), the result 
  // will be stored in the cache system with key 'user1'
  // @LiquidCache('gifData{event}')
  public async pageChange(event: any) {
    console.log(event);   

    switch(this.contentType) {
      case ContentType.TREND: this.getTrendingGifs(event); break;
      case ContentType.SEARCH: this.getSearchedGifs(null, event); break;
      case ContentType.POPULAR: this.getPopularGifs(event); break;
    }
    

    

    //javascript, jQuery

    // var xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${this.gf}&limit=24`);

    // xhr.done(function(data) { console.log("success got data", data); });
  }

  public async getTrendingGifs(page: number) {
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
      }
    }
    this.contentType = ContentType.TREND;
  }

  public async getSearchedGifs(event: any, page: number) {
    if (event != null) { this.totalCount = 0; } // Without this, the pagination index isn't changing on UI from any value greater than default value, back to the default value again on this.gifData value change.
    if (this.contentType == ContentType.SEARCH && this.tempSearchKeyword.trim().length > 0 && this.tempSearchKeyword.trim().toLowerCase() != this.searchKeyword.trim().toLowerCase() && this.cache.get('gifData' + page))
    {
      let cacheData: object = this.cache.getCacheObject('gifData' + page).value;
      console.log('Cached Value:', cacheData);
      this.gifData = cacheData;
    } 
    else {
      try {
        this.tempSearchKeyword = this.searchKeyword;
        let tempData = await (await this.gf.search(this.searchKeyword, { limit: 24, offset: (((page - 1) * 24) + 1), sort: 'relevant', type: 'stickers' })).data;
        tempData.length > 0 ? this.gifData = tempData : null;
        console.log('Response: ', tempData);
        console.log('Searched Gifs: ', this.gifData);
        this.commonOperation(tempData, page);
      } catch (error) {
        console.log('Error occurred: ' + error);
        console.log('Error occurred: ' + error);
      }
    }    
    this.contentType = ContentType.SEARCH;
  }

  public async getPopularGifs(page: number) {
    if (this.contentType == ContentType.POPULAR && this.cache.get('gifData' + page))
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
        console.log('Popular Gifs: ', this.gifData);
        this.commonOperation(tempData, page);
      } catch (error) {
        console.log('Error occurred: ' + error);
      }
    }
    this.contentType = ContentType.POPULAR;
  }

  private commonOperation(gifData: any, page: number) {
    if (gifData.length == 0)
    {
      this.totalCount = 10 * (page - 1);
      console.log('Sorry, no results found!');
    }
    else if(gifData.length < 24)
    {
      this.totalCount = 10 * page
    }
    else {
      this.totalCount = 50;
      this.cache.set('gifData' + page, gifData, this.specificConf);
    }
  }

}
