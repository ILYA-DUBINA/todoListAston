import React, { Component } from 'react';

import style from './App.module.css';
import HeaderSearch from './components/header/HeaderSearch';
import SectionItems from './components/body/SectionItems';
import {
  getOneItemElement,
  generateWords,
  // countdownTimer,
  // calculateTimeLeft,
} from './components/function';
import Footer from './components/footer/Footer';

// export const MyContext = React.createContext(function f() {});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayElements: [
        getOneItemElement({
          title: 'Постройка дома',
          description: generateWords(20),
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
        getOneItemElement({
          title: 'Выбор профессии и/или переквалификация',
          description: generateWords(15),
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
        getOneItemElement({
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
      // filter: null,
      // time: calculateTimeLeft(),
    };
    // this.id;
    this.createArrayElements = this.createArrayElements.bind(this);
    this.editedItemElement = this.editedItemElement.bind(this);
    this.deleteItemElement = this.deleteItemElement.bind(this);
    this.addNameFilter = this.addNameFilter.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    this.changeValueWord = this.changeValueWord.bind(this);
    this.showActiveCompletedArchiveElements =
      this.showActiveCompletedArchiveElements.bind(this);
    this.addArchiveItemElementAndMarkAsCompletedItemElement =
      this.addArchiveItemElementAndMarkAsCompletedItemElement.bind(this);
  }
  createArrayElements(objValue) {
    let obj = getOneItemElement(objValue);
    console.log(obj, objValue);
    this.setState(({ arrayElements }) => {
      const newArr = [...arrayElements, obj];

      return {
        arrayElements: newArr,
      };
    });
  }
  editedItemElement(id, title, description) {
    this.setState(({ arrayElements }) => {
      let indexElement = arrayElements.findIndex((item) => item.id === id);
      let obj = arrayElements[indexElement];
      let newObj = {
        ...obj,
        title: title,
        description: description,
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
      let newArr = arrayElements.filter((item) => item.id !== id);
      return {
        arrayElements: newArr,
      };
    });
  }
  addArchiveItemElementAndMarkAsCompletedItemElement(id, text) {
    this.setState(({ arrayElements }) => {
      let indexElement = arrayElements.findIndex((item) => item.id === id);
      let obj = arrayElements[indexElement];
      let newObj = {
        ...obj,
        [text]: !obj[text],
      };
      console.log(newObj, text, !obj[text]);
      let newArr = [
        ...arrayElements.slice(0, indexElement),
        newObj,
        ...arrayElements.slice(indexElement + 1, arrayElements.length),
      ];
      console.log(newArr, indexElement);

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
    let newArr = arr.filter((item) =>
      text === 'active' ? !item['archive'] && !item['completed'] : item[text],
    );

    return !text ? arr : newArr;
  }
  changeValueWord(text) {
    this.setState({
      word: text.target.value,
    });
  }
  searchByTitle(arr, text) {
    if (!text) {
      return arr;
    }

    return arr.filter((item) => {
      return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
  }
  // filter(items, filter) {
  //   if (filter === undefined) {
  //     return items.filter((item) => !item.completed);
  //   }
  //   if (filter === 'completed') {
  //     return items.filter((item) => item.completed);
  //   }
  //   return items;
  // }

  componentDidMount() {
    let arrayStorage = JSON.parse(localStorage.getItem('arr'));
    console.log('mount');
    this.setState({
      arrayElements:
        arrayStorage.length === 0 ? this.state.arrayElements : arrayStorage,
    });
  }
  componentDidUpdate() {
    localStorage.setItem('arr', JSON.stringify(this.state.arrayElements));
    console.log('update');
  }

  render() {
    // console.log(this.state.arrayElements);
    let { arrayElements, name, word } = this.state;
    let {
      createArrayElements,
      editedItemElement,
      deleteItemElement,
      showActiveCompletedArchiveElements,
      addArchiveItemElementAndMarkAsCompletedItemElement,
      addNameFilter,
      searchByTitle,
      changeValueWord,
    } = this;

    const allSearchArrayElements = searchByTitle(arrayElements, word);
    const allArrayElements = showActiveCompletedArchiveElements(
      name,
      allSearchArrayElements,
    );
    console.log(allArrayElements, allSearchArrayElements);
    // const timerComponents = Object.keys(time).map((interval) => {
    //   if (!time[interval]) {
    //     return;
    //   }

    //   return (
    //     <span key={Math.random()}>
    //       {time[interval]} {interval}{' '}
    //     </span>
    //   );
    // });
    // console.log(this.id, time, timerComponents);
    return (
      <div className={style.App}>
        <HeaderSearch
          createArrayElements={createArrayElements}
          changeValueWord={changeValueWord}
        />
        {/* <MyContext.Provider value={editedItemElement}> */}
        <SectionItems
          arrayElements={allArrayElements}
          editedItemElement={editedItemElement}
          deleteItemElement={deleteItemElement}
          addArchiveItemElementAndMarkAsCompletedItemElement={
            addArchiveItemElementAndMarkAsCompletedItemElement
          }
        />
        {/* {timerComponents} */}
        {/* <div className={style.timer}>
          <div className={style.timer__items}>
            <div className={(style.timer__item, style.timer__days)}>00</div>
            <div className={(style.timer__item, style.timer__hours)}>00</div>
            <div className={(style.timer__item, style.timer__minutes)}>00</div>
            <div className={(style.timer__item, style.timer__seconds)}>00</div>
          </div>
        </div> */}
        {/* </MyContext.Provider> */}
        <Footer addNameFilter={addNameFilter} />
      </div>
    );
  }
}
