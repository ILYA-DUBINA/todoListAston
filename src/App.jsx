import React, { Component } from 'react';

import style from './App.module.css';
import HeaderSearch from './components/header/HeaderSearch';
import SectionItems from './components/body/SectionItems';
// import {
//   getOneItemElement,
//   generateWords,
//   getSecondsDate,
//   getArrayDate,
// } from './components/function';
import Footer from './components/footer/Footer';
import ContextComponent from './components/body/ContextComponent';
import background from './images/background.jpg';
import backgroundHell from './images/backgroundHell.jpg';

export let ContextValue = React.createContext({
  theme: '',
  toggleTheme: () => {},
});

const words = [
  'Got',
  'ability',
  'shop',
  'recall',
  'fruit',
  'easy',
  'dirty',
  'giant',
  'shaking',
  'ground',
  'weather',
  'lesson',
  'almost',
  'square',
  'forward',
  'bend',
  'cold',
  'broken',
  'distant',
  'adjective.',
];
function getRandomWord(firstLetterToUppercase = false) {
  const word = words[getRandomNumber(0, words.length - 1)];
  return firstLetterToUppercase
    ? word.charAt(0).toUpperCase() + word.slice(1)
    : word;
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
export function getArrayDate(seconds) {
  let secondsToday = Math.floor(new Date().getTime() / 1000);
  let t = new Date(Date.UTC(1970, 0, 1));
  t.setUTCSeconds(seconds + secondsToday);
  return [
    t.getFullYear(),
    t.getMonth(),
    t.getDate(),
    t.getHours(),
    t.getMinutes(),
    t.getSeconds(),
  ];
}
export function getSecondsDate(days, hours, minutes, seconds) {
  return days * 86400 + hours * 3600 + minutes * 60 + seconds * 1;
}
export function generateWords(length = 10) {
  return (
    [...Array(length)]
      .map((_, i) => getRandomWord(i === 0))
      .join(' ')
      .trim() + '.'
  );
}
// export function getOneItemElement({
//   title,
//   description,
//   days,
//   hours,
//   minutes,
//   seconds,
// }) {
//   let numberRandom = getRandomNumber(0, 1000) + getRandomNumber(1000, 5000);
//   let sumSec = getSecondsDate(days, hours, minutes, seconds);
//   let resultArrayDate = getArrayDate(sumSec);
//   return {
//     id: numberRandom,
//     title: title,
//     description: description,
//     time: resultArrayDate,
//     archive: false,
//     completed: false,
//   };
// }
export function calculateTimeLeft(arr) {
  const difference =
    +new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}
export function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayElements: [
        this.getOneItemElement({
          title: 'Постройка дома',
          description: generateWords(20),
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
        this.getOneItemElement({
          title: 'Выбор профессии и/или переквалификация',
          description: generateWords(15),
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
        this.getOneItemElement({
          title: 'Создание семьи',
          description: generateWords(),
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
      ],
      storageUnplag: false,
      name: '',
      word: '',
      theme: '',
    };
    this.createArrayElements = this.createArrayElements.bind(this);
    this.editedItemElement = this.editedItemElement.bind(this);
    this.deleteItemElement = this.deleteItemElement.bind(this);
    this.addNameFilter = this.addNameFilter.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    this.changeValueWord = this.changeValueWord.bind(this);
    this.changeThemeAllContent = this.changeThemeAllContent.bind(this);
    this.getOneItemElement = this.getOneItemElement.bind(this);
    this.showActiveCompletedArchiveElements =
      this.showActiveCompletedArchiveElements.bind(this);
    this.addArchiveItemElementAndMarkAsCompletedItemElement =
      this.addArchiveItemElementAndMarkAsCompletedItemElement.bind(this);
  }
  getOneItemElement({ title, description, days, hours, minutes, seconds }) {
    let numberRandom = getRandomNumber(0, 1000) + getRandomNumber(1000, 5000);
    let sumSec = getSecondsDate(days, hours, minutes, seconds);
    let resultArrayDate = getArrayDate(sumSec);
    return {
      id: numberRandom,
      title: title,
      description: description,
      time: resultArrayDate,
      archive: false,
      completed: false,
    };
  }
  createArrayElements(objValue) {
    let obj = this.getOneItemElement(objValue);
    this.setState(({ arrayElements }) => {
      const newArr = [...arrayElements, obj];
      return {
        arrayElements: newArr,
      };
    });
  }
  editedItemElement(objEdited) {
    this.setState(({ arrayElements }) => {
      let indexElement = arrayElements?.findIndex(
        (item) => item.id === objEdited.id,
      );
      let obj = arrayElements[indexElement];
      let arrayData = getSecondsDate(
        objEdited.days__number,
        objEdited.hours__number,
        objEdited.minutes__number,
        objEdited.seconds__number,
      );
      let arrayDataOther = getArrayDate(arrayData);
      let newObj = {
        ...obj,
        title: objEdited.value,
        description: objEdited.valueArea,
        time: arrayDataOther,
      };
      let newArr = [
        ...arrayElements.slice(0, indexElement),
        newObj,
        ...arrayElements.slice(indexElement + 1, indexElement.length - 1),
      ];
      return {
        arrayElements: newArr,
      };
    });
  }
  deleteItemElement(id) {
    this.setState(({ arrayElements }) => {
      let newArr = arrayElements?.filter((item) => item.id !== id);
      return {
        arrayElements: newArr,
      };
    });
  }
  addArchiveItemElementAndMarkAsCompletedItemElement(id, text) {
    this.setState(({ arrayElements }) => {
      let indexElement = arrayElements?.findIndex((item) => item.id === id);
      let obj = arrayElements[indexElement];
      let newObj = {
        ...obj,
        [text]: !obj[text],
      };
      let newArr = [
        ...arrayElements.slice(0, indexElement),
        newObj,
        ...arrayElements.slice(indexElement + 1, arrayElements.length),
      ];
      return {
        arrayElements: newArr,
      };
    });
  }
  addNameFilter(name) {
    this.setState({
      name,
    });
  }
  showActiveCompletedArchiveElements(text, arr) {
    let newArr = arr?.filter((item) =>
      text === 'active' ? !item['archive'] && !item['completed'] : item[text],
    );
    return !text ? arr : newArr;
  }
  changeValueWord(text) {
    this.setState({
      word: text ? text.target.value : false,
    });
  }
  searchByTitle(arr, text) {
    if (!text) {
      return arr;
    }
    return arr?.filter((item) => {
      return item?.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
  }
  changeThemeAllContent() {
    this.setState(({ theme }) => {
      return { theme: theme === 'red' ? '' : 'red' };
    });
  }
  componentDidMount() {
    let arrayStorage = JSON.parse(localStorage.getItem('arr'));
    this.setState({
      arrayElements:
        arrayStorage?.length === 0 ? this.state.arrayElements : arrayStorage,
    });
  }
  componentDidUpdate() {
    localStorage.setItem('arr', JSON.stringify(this.state.arrayElements));
  }

  render() {
    let { arrayElements, name, word, theme } = this.state;
    let {
      createArrayElements,
      editedItemElement,
      deleteItemElement,
      showActiveCompletedArchiveElements,
      addArchiveItemElementAndMarkAsCompletedItemElement,
      addNameFilter,
      searchByTitle,
      changeValueWord,
      changeThemeAllContent,
    } = this;
    const allSearchArrayElements = searchByTitle(arrayElements, word);
    const allArrayElements = showActiveCompletedArchiveElements(
      name,
      allSearchArrayElements,
    );
    return (
      <ContextValue.Provider
        value={{
          theme: theme,
          toggleTheme: changeThemeAllContent,
        }}
      >
        <>
          <div className={style.App__image}>
            <img
              className={style.App__image_img}
              src={theme ? backgroundHell : background}
              alt="картинка фона"
            />
          </div>
          <div className={style.App}>
            <HeaderSearch
              createArrayElements={createArrayElements}
              changeValueWord={changeValueWord}
            />
            <ContextComponent />
            <SectionItems
              arrayElements={allArrayElements}
              editedItemElement={editedItemElement}
              deleteItemElement={deleteItemElement}
              addArchiveItemElementAndMarkAsCompletedItemElement={
                addArchiveItemElementAndMarkAsCompletedItemElement
              }
            />
            <Footer addNameFilter={addNameFilter} />
          </div>
        </>
      </ContextValue.Provider>
    );
  }
}
