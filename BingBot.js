// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script for search
// @author       Sokolova Anna
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let search_icon = document.getElementById("search_icon");
let keywords = ["Центр ортодонтии в Москве", "Андрей Жук клиника", "Самый крупный ортодонтический центр в России"];
let keyword = keywords [getRandom(0, keywords.length)];

if (search_icon != undefined) {
document.getElementsByName("q")[0].value = keyword;
search_icon.click();
} else {

for (let i = 0; i < links.length; i++) {
if (links[i].href.includes("ortholike.ru")) {
let link = links[i];
console.log("Нашёл строку" + link);
link.click();
break;
  }
}
}

function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}
