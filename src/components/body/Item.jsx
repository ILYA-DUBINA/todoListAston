/* eslint-disable prettier/prettier */
import { Component } from 'react';

import { calculateTimeLeft } from '../function';

import style from './Item.module.css';

// import { MyContext } from '../../App';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.obj.title,
      valueArea: this.props.obj.description,
      open: false,
      timer: calculateTimeLeft(this.props.obj.time),
      idTimer: 0,
    };
    // this.MyContext = MyContext;
    this.id;
    this.openItemText = this.openItemText.bind(this);
    this.saveItemText = this.saveItemText.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getDiscription = this.getDiscription.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setArchiveItem = this.setArchiveItem.bind(this);
    this.setCompletedItem = this.setCompletedItem.bind(this);
  }

  openItemText() {
    this.setState({
      open: true,
      idTimer: this.id,
    });
  }

  saveItemText() {
    if (this.state.value < 2) {
      this.props.deleteItemElement(this.props.obj.id);
    } else {
      this.props.editedItemElement(
        this.props.obj.id,
        this.state.value,
        this.state.valueArea,
      );

      this.setState({
        open: false,
      });

      // this.id = this.state.idTimer;
    }
  }
  deleteItem() {
    this.props.deleteItemElement(this.props.obj.id);
  }
  setArchiveItem() {
    this.props.addArchiveItemElement(this.props.obj.id);
  }
  setCompletedItem() {}

  getTitle(e) {
    this.setState({
      value: e.target.value,
    });
  }
  getDiscription(e) {
    this.setState({
      valueArea: e.target.value,
    });
  }

  componentDidMount() {
    this.setState({
      timer: calculateTimeLeft(this.props.obj.time),
    });
  }
  componentDidUpdate() {
    // this.id = this.state.idTimer && this.id;
    if (Object.keys(this.state.timer).length) {
      this.id = setTimeout(() => {
        // if (!this.state.open) {
        this.setState({
          timer: calculateTimeLeft(this.props.obj.time),
        });
        // }
      }, 1000);
      // console.log(
      //   this.id,
      //   this.state.timer,
      //   this.state.idTimer,
      //   this.props.obj.time,
      // );
      // this.state.open && clearTimeout(this.id);
    }
    // this.state.open && clearInterval(this.id);
    // console.log(this.id, Object.keys(this.state.timer).length);
  }
  componentWillUnmount() {
    // this.state.open &&
    //   (clearTimeout(this.id),
    //   this.setState({
    //     idTimer: this.id,
    //   }));
    clearTimeout(this.id);
  }

  // componentDidMount() {
  //   let value = this.context;
  //   console.log(value);
  //   /* perform a side-effect at mount using the value of MyContext */
  // }
  // componentDidUpdate() {
  //   let value = this.context;
  //   console.log(value);
  //   /* ... */
  // }
  // componentWillUnmount() {
  //   let value = this.context;
  //   console.log(value);
  //   /* ... */
  // }

  render() {
    // let v = this.context;

    let { title, description, archive } = this.props.obj;
    let { open, value, valueArea, timer } = this.state;
    let {
      openItemText,
      saveItemText,
      getTitle,
      getDiscription,
      deleteItem,
      setArchiveItem,
      setCompletedItem,
    } = this;

    const timerComponents = Object.keys(timer).map((interval) => {
      if (!timer[interval]) {
        return;
      }

      return (
        <span key={Math.random()}>
          {timer[interval]} {' ' + interval + ' '}
        </span>
      );
    });
    // console.log(redTimer);
    return (
      <li className={style.content}>
        <div
          className={
            archive
              ? style.content__timer + ' ' + style.redTimer
              : style.content__timer
          }
        >
          {timerComponents.length ? (
            <>
              <h3 className={style.content__timer_title}>
                До конца выполнения текущей задачи осталось:
              </h3>
              <span className={style.content__timer_number}>
                {timerComponents}
              </span>
            </>
          ) : null}
        </div>
        <div
          className={
            timerComponents.length && !open && !archive
              ? style.content__item + ' ' + style.fire
              : style.content__item
          }
        >
          {!open ? (
            <h2 className={style.content__item_title}>{title}</h2>
          ) : (
            <textarea
              className={style.header__title_search}
              type="text"
              value={value}
              onChange={getTitle}
              placeholder="название задачи"
            ></textarea>
          )}
          {!open ? (
            <p className={style.content__item_text}>{description}</p>
          ) : (
            <textarea
              className={style.header__discription_text}
              type="text"
              value={valueArea}
              onChange={getDiscription}
              placeholder="описание задачи"
            ></textarea>
          )}
          {!open ? (
            <div className={style.content__item_buttons}>
              <button
                className={style.content__item_edited}
                onClick={openItemText}
              >
                редактировать
              </button>
              <button
                className={style.content__item_delete}
                onClick={deleteItem}
              >
                удалить
              </button>
              <button
                className={style.content__item_archive}
                onClick={setArchiveItem}
              >
                приостановить задачу
              </button>
              <button
                className={style.content__item_completed}
                onClick={setCompletedItem}
              >
                отметить как выполненную
              </button>
              <button className={style.content__item_time}>
                поставить срок выполнения
              </button>
            </div>
          ) : (
            <button className={style.content__save} onClick={saveItemText}>
              Сохранить изменения
            </button>
          )}
          {archive ? (
            <div className={style.content__item_block}>
              <svg
                className={style.block__svg}
                xmlns="http://www.w3.org/2000/svg"
                style={{ stroke: 'rgba(255, 0, 0, 0.9)', strokeWidth: 10 }}
              >
                <line x1="0" y1="0" x2="100%" y2="100%" />
                <line x1="0" y1="100%" x2="100%" y2="0" />
              </svg>
              <h2 className={style.block__title}>Задача добавлена в архив</h2>
              <button className={style.block__active} onClick={setArchiveItem}>
                Возобновить задачу?!
              </button>
            </div>
          ) : null}
          {archive ? (
            <div className={style.content__item_block}>
              {/* <svg
                className={style.block__svg}
                xmlns="http://www.w3.org/2000/svg"
                style={{ stroke: 'rgba(255, 0, 0, 0.9)', strokeWidth: 10 }}
              >
                <line x1="0" y1="0" x2="100%" y2="100%" />
                <line x1="0" y1="100%" x2="100%" y2="0" />
              </svg> */}
              <h2 className={style.block__title}>
                Поздравляю! Задача {title} выполнена.
              </h2>
              <button className={style.block__active}>
                Возобновить задачу?!
              </button>
            </div>
          ) : null}
        </div>
      </li>
    );
  }
}
// Item.contextType = MyContext;
