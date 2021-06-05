import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

import { SamplerServiceService } from './Service/sampler-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gif-finder';

  @ViewChild('innerLayout') innerLayout!: any;

  public categories: { key: string, value: string } [] = [];

  public getSubcategories: any;

  public selectedCategory: string = 'Trending';

  constructor(private sampler: SamplerServiceService) {

  }

  ngOnInit() {
    this.sampler.categorySubject.subscribe((response) => {
      let tempCategories = response.categories;
      this.getSubcategories = response?.subcategoriesFn;
      console.log('From Subject: ', response);
      this.associateIcons(tempCategories);
    }, (error) => {

    })
  }

  public getSubcategoryData(item: string) {
    this.selectedCategory = item;
    this.sampler.subcategorySubject.next(item);
  }

  private associateIcons(tempCategories: string[]) {
    tempCategories.forEach((value, index) => {
      switch(value) {
        case 'actions' : this.categories.push({ key: value, value: 'dingtalk' }); break;
        case 'adjectives': this.categories.push({ key: value, value: 'sketch' }); break;
        case 'animals': this.categories.push({ key: value, value: 'heart' }); break;
        case 'anime': this.categories.push({ key: value, value: 'thunderbolt' }); break;
        case 'art & design': this.categories.push({ key: value, value: 'ant-design' }); break;
        case 'cartoon & comics': this.categories.push({ key: value, value: 'robot' }); break;
        case 'celebrities': this.categories.push({ key: value, value: 'star' }); break;
        case 'decades': this.categories.push({ key: value, value: 'calendar' }); break;
        case 'emotions': this.categories.push({ key: value, value: 'smile' }); break;
        case 'fashion & beauty': this.categories.push({ key: value, value: 'shopping' }); break;
        case 'food & drink': this.categories.push({ key: value, value: 'coffee' }); break;
        case 'gaming': this.categories.push({ key: value, value: 'heat-map' }); break;
        case 'greetings': this.categories.push({ key: value, value: 'message' }); break;
        case 'holiday': this.categories.push({ key: value, value: 'gift' }); break;
        case 'identity': this.categories.push({ key: value, value: 'user' }); break;
        case 'interests': this.categories.push({ key: value, value: 'like' }); break;
        case 'memes': this.categories.push({ key: value, value: 'fire' }); break;
        case 'movies': this.categories.push({ key: value, value: 'play-square' }); break;
        case 'music': this.categories.push({ key: value, value: 'youtube' }); break;
        case 'nature': this.categories.push({ key: value, value: 'global' }); break;
        case 'news & politics': this.categories.push({ key: value, value: 'read' }); break;
        case 'reactions': this.categories.push({ key: value, value: 'like' }); break;
        case 'science': this.categories.push({ key: value, value: 'experiment' }); break;
        case 'sports': this.categories.push({ key: value, value: 'trophy' }); break;
        case 'stickers': this.categories.push({ key: value, value: 'gif' }); break;
        case 'transportation': this.categories.push({ key: value, value: 'car' }); break;
        case 'tv': this.categories.push({ key: value, value: 'desktop' }); break;
        case 'weird': this.categories.push({ key: value, value: 'meh' }); break;
      }
    });
  }

  public onCollapsedChange(event: boolean) {
    event ? this.innerLayout.elementRef.nativeElement.style.marginLeft = "82px" : 
    this.innerLayout.elementRef.nativeElement.style.marginLeft = "200px";
  }

}
