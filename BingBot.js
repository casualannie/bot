// ==UserScript==
// @name         BingBot
// @namespace    https://tampermonkey.net/
// @version      0.1
// @description  Script for search
// @author       Sokolova Anna
// @match        https://www.bing.com/*
// @match        https://ortholike.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let search_icon = document.getElementById("search_icon");
let keywords = [
  "Центр ортодонтии в Москве",
  "Андрей Жук клиника",
  "Самый крупный ортодонтический центр в России",
  "Здоровые и ровные зубы",
  "Элайнеры по доступной цене",
  "Виды брекет-систем",
  "Безлигатурные брекеты: плюсы и минусы"
];
let keyword = keywords[getRandom(0, keywords.length)];
let googleInput = document.getElementsByName("q")[0];

//Работаем на главной странице поисковика
if (search_icon != undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    googleInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      search_icon.click(); //кликаем и идем в выдачу
    }
  }, 500);

  //работаем на целевом сайте
} else if (location.hostname == "ortholike.ru") {
  console.log("Мы на целевом сайте!");

  setInterval(() => {
    let index = getRandom(0, links.length);

    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.bing.com/";
    }
    if (links.length == 0) {
      location.href = "https://ortholike.ru/";
    } else if (links[index].href.indexOf("ortholike.ru") != -1) {
      links[index].click();
    }
  }, getRandom(3500, 5500));

  //работаем на странице поисковой выдачи

} else {
  let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("ortholike.ru")) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашёл строку" + link);
      setTimeout(() => {
        link.click();
      }, getRandom(3500, 5500));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let element = document.querySelector(".sb_pagS");
         
      if (element.innerText == "5") {
        nextBingPage = false;
        location.href = "https://www.bing.com/";
    }
      clearInterval(elementExist);
  }, 100)

  if (nextBingPage) {
    setTimeout(() => {
    let nextpage = document.querySelector(".sb_pagN");
    nextpage.click();
    }, getRandom(5000, 7000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
