import { Component } from '@angular/core';

import { SamplerServiceService } from './Service/sampler-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gif-finder';

  // public categories: string[] = [
  //   'actions',
  //   'adjectives',
  //   'animals',
  //   'anime',
  //   'art & design',
  //   'cartoon & comics',
  //   'celebrities',
  //   'decades',
  //   'emotions',
  //   'fashion & beauty',
  //   'food & drink',
  //   'gaming',
  //   'greetings',
  //   'holiday',
  //   'identity',
  //   'interests',
  //   'memes',
  //   'movies',
  //   'music',
  //   'nature',
  //   'news & politics',
  //   'reactions',
  //   'science',
  //   'sports',
  //   'stickers',
  //   'transportation',
  //   'tv',
  //   'weird'
  // ];

  // public filterData: { [category: string]: string; } = {
  //   'actions' : [ 'breaking up', 'cooking', 'crying', 'dancing', 'dreaming', '' ]
  //   'adjectives',
  //   'animals',
  //   'anime',
  //   'art & design',
  //   'cartoon & comics',
  //   'celebrities',
  //   'decades',
  //   'emotions',
  //   'fashion & beauty',
  //   'food & drink',
  //   'gaming',
  //   'greetings',
  //   'holiday',
  //   'identity',
  //   'interests',
  //   'memes',
  //   'movies',
  //   'music',
  //   'nature',
  //   'news & politics',
  //   'reactions',
  //   'science',
  //   'sports',
  //   'stickers',
  //   'transportation',
  //   'tv',
  //   'weird'
  // };

//   interface IPerson {
//     firstName: string;
//     lastName: string;
//  }
 
//  var persons: { [category: string]: object; } = {
//     "p1": { firstName: "F1", lastName: "L1" },
//     "p2": { firstName: "F2" }
//  };

/**
 *
 */

  // public categories: string[] = [
  //   'actions',
  //   'adjectives',
  //   'animals',
  //   'anime',
  //   'art & design',
  //   'cartoon & comics',
  //   'celebrities',
  //   'decades',
  //   'emotions',
  //   'fashion & beauty',
  //   'food & drink',
  //   'gaming',
  //   'greetings',
  //   'holiday',
  //   'identity',
  //   'interests',
  //   'memes',
  //   'movies',
  //   'music',
  //   'nature',
  //   'news & politics',
  //   'reactions',
  //   'science',
  //   'sports',
  //   'stickers',
  //   'transportation',
  //   'tv',
  //   'weird'
  // ];
  // public filterData: { [category: string]: string; } = {
  //   'actions' : [ 'breaking up', 'cooking', 'crying', 'dancing', 'dreaming', '' ]
  //   'adjectives',
  //   'animals',
  //   'anime',
  //   'art & design',
  //   'cartoon & comics',
  //   'celebrities',
  //   'decades',
  //   'emotions',
  //   'fashion & beauty',
  //   'food & drink',
  //   'gaming',
  //   'greetings',
  //   'holiday',
  //   'identity',
  //   'interests',
  //   'memes',
  //   'movies',
  //   'music',
  //   'nature',
  //   'news & politics',
  //   'reactions',
  //   'science',
  //   'sports',
  //   'stickers',
  //   'transportation',
  //   'tv',
  //   'weird'
  // };
  //   interface IPerson {
  //     firstName: string;
  //     lastName: string;
  //  }
  //  var persons: { [category: string]: object; } = {
  //     "p1": { firstName: "F1", lastName: "L1" },
  //     "p2": { firstName: "F2" }
  //  };
  /**
   *
   */

  public categories!: string[];


constructor(private sampler: SamplerServiceService) {

}

ngOnInit() {
  this.sampler.categories$?.subscribe((response) => {
    this.categories = response;
    console.log('From Observable: ', response);
  }, (error) => {

  });

  this.sampler.categorySubject1.subscribe((response) => {
    this.categories = response;
    console.log('From Subject: ', response);
  }, (error) => {

  })
}

public onCollapsedChange(event: any) {
  console.log('Logging onCollapsedChange', event);
}

public getCategoriesList(event: any) {
  console.log('Categories List via @Output Event Emitter: ', event);
}

}
