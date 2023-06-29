// ==UserScript==
// @name         BingBot
// @namespace    https://tampermonkey.net/
// @version      0.1
// @description  Script for search
// @author       Sokolova Anna
// @match        https://www.bing.com/*
// @match        https://ortholike.ru/*
// @match        https://www.rudenta.ru/*
// @match        https://www.dentalfantasy.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
"ortholike.ru": [   
  "Центр ортодонтии в Москве",
  "Андрей Жук клиника",
  "Самый крупный ортодонтический центр в России",
  "Здоровые и ровные зубы",
  "Элайнеры по доступной цене",
  "Виды брекет-систем",
  "Безлигатурные брекеты: плюсы и минусы "
],
  "rudenta.ru": [
  "Лечение зубов во сне с седацией",
  "Программа Год заботы о себе",
  "Лечение зубов под наркозом",
  "Клиника ТОП-3 в России",
  "Уникальные услуги лечения зубов"
],
"dentalfantasy.ru": [
  "Онлайн-консультация детского стоматолога",
  "Лидер российской детской стоматологии",
  "Даем гарантию на пломбы до смены зубов",
  "Стоматология Дентал Фэнтези",
  "Клиника, где деткам хорошо!"
]
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)]; //получили случайный сайт из обьекта
let links = document.links;
let search_icon = document.getElementById("search_icon");
let keywords = sites[site]; //получили набор ключевых фраз для конкретного сайта
let keyword = keywords[getRandom(0, keywords.length)];
let googleInput = document.getElementsByName("q")[0];

//Работаем с cookie
if (search_icon != undefined) {
  document.cookie = "site=" + site;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

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
} else if (location.hostname == site) {
  console.log("Мы на целевом сайте!");

  setInterval(() => {
    let index = getRandom(0, links.length);

    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.bing.com/";
    }
    if (links.length == 0) {
      location.href = site;
    } else if (links[index].href.indexOf(site) != -1) {
      links[index].click();
    }
  }, getRandom(3500, 5500));

  //работаем на странице поисковой выдачи

} else {
  let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes(site)) {
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
        clearInterval(elementExist);
    }
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

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
