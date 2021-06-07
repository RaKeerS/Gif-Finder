# Gif-Finder
This is a web app created to be utilized in order to fetch the Gif Images from the [GIPHY Images Repository](https://giphy.com/). 
It offers different categories and also a custom search tool in order to find what you exactly need! 

The application is made such that it fetches the categories list from the [GIPHY Images Repository](https://giphy.com/) and hence, 
the category side bar is always upto date.

At present, the application can only fetch <=120 gifs i.e. 24 gifs per page (or lesser than that), this is a sort of restriction at the moment, 
as the API doesn't allow to mass fetch the gifs in one call.

## Technologies Used
The entire application is created using [Angular 11](https://angular.io/) framework, 
with a wrapper of [NG-Zorro](https://ng.ant.design/docs/introduce/en) which is an Angular UI component library.

Made use of the [Giphy SDKs](https://github.com/Giphy/giphy-js) package which facilitated the API functionality.

At the moment the application makes use of the API key which was generated when I registered into the GIPHY Images website.
It might expire in a while, so, it's better to follow the instructions present in the Docs for [Giphy SDKs](https://github.com/Giphy/giphy-js) package. 

## Project Dependencies
You would require to install NodeJS in order to install all the project packages.
[Link for NodeJS installation](https://nodejs.org/en/)

1) Once done, head over to the project folder until you find 'package.json' file.
2) Open the NodeJS Bash or Command Prompt at this directory location, type npm install and let the node handle all package installations.

## Some Examples 

1. Home Screen you will be greeted with

![Home Screen](https://user-images.githubusercontent.com/22376097/120898826-53c17900-c64a-11eb-92b5-2475cfccb6a5.png)

2. Category Selected from the list 

![Category Example 1](https://user-images.githubusercontent.com/22376097/120899003-1dd0c480-c64b-11eb-930e-12a1bbd92882.png)

![Category Example 2](https://user-images.githubusercontent.com/22376097/120899035-4bb60900-c64b-11eb-9e0b-8bc46356dfdc.png)

3. Using Search Functionality

![Search Results 1](https://user-images.githubusercontent.com/22376097/120899057-7011e580-c64b-11eb-9cf9-d21754ff8a8a.png)

![Search Results 2](https://user-images.githubusercontent.com/22376097/120899088-92a3fe80-c64b-11eb-939f-fcaf81590e4b.png)

4. Errors

![Screenshot (598)](https://user-images.githubusercontent.com/22376097/120899115-b23b2700-c64b-11eb-95d7-6e82e8c2c39a.png)

5. Page Not Found

![Page Not Found](https://user-images.githubusercontent.com/22376097/120898919-bb77c400-c64a-11eb-8436-57bf7ca15991.png)

## License

This project is licensed under the MIT License.

## Futurescope

* Might add more functionality. 
* Improve UI a bit. 
* If the API facilitates mass fetching of gifs, then I can tweak the current functionality to display more gifs.


