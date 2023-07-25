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
      // time: calculateTimeLeft(),
    };
    // this.id;
    this.createArrayElements = this.createArrayElements.bind(this);
    this.editedItemElement = this.editedItemElement.bind(this);
    this.deleteItemElement = this.deleteItemElement.bind(this);
    this.addArchiveItemElement = this.addArchiveItemElement.bind(this);
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
  addArchiveItemElement(id) {
    this.setState(({ arrayElements }) => {
      let indexElement = arrayElements.findIndex((item) => item.id === id);
      let obj = arrayElements[indexElement];
      let newObj = {
        ...obj,
        archive: !obj.archive,
      };

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
  componentDidMount() {
    let arrayStorage = JSON.parse(localStorage.getItem('arr'));

    this.setState({
      arrayElements:
        arrayStorage.length === 0 ? this.state.arrayElements : arrayStorage,
    });
  }
  componentDidUpdate() {
    localStorage.setItem('arr', JSON.stringify(this.state.arrayElements));
    // this.id = setTimeout(() => {
    //   this.setState({
    //     time: calculateTimeLeft(),
    //   });
    // }, 1000);
  }
  // componentWillUnmount() {
  // localStorage.setItem('arr', JSON.stringify(this.state.arrayElements));
  // clearTimeout(this.id);
  // }

  render() {
    // console.log(this.state.arrayElements);
    let { arrayElements } = this.state;
    let {
      createArrayElements,
      editedItemElement,
      deleteItemElement,
      addArchiveItemElement,
    } = this;

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
        <HeaderSearch createArrayElements={createArrayElements} />
        {/* <MyContext.Provider value={editedItemElement}> */}
        <SectionItems
          arrayElements={arrayElements}
          editedItemElement={editedItemElement}
          deleteItemElement={deleteItemElement}
          addArchiveItemElement={addArchiveItemElement}
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
        <Footer />
      </div>
    );
  }
}
