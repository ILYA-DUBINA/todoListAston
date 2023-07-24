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
    });
  }

  saveItemText() {
    this.props.editedItemElement(
      this.props.obj.id,
      this.state.value,
      this.state.valueArea,
    );

    this.setState({
      open: false,
    });
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
    if (Object.keys(this.state.timer).length) {
      this.id = setTimeout(() => {
        this.setState({
          timer: calculateTimeLeft(this.props.obj.time),
        });
      }, 1000);
    }

    // console.log(this.id, Object.keys(this.state.timer).length);
  }
  componentWillUnmount() {
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
    return (
      <li className={style.content__item}>
        {!open ? (
          <h2 className="content__item-title">{title}</h2>
        ) : (
          <input
            className="header__title-search"
            type="text"
            value={value}
            onChange={getTitle}
          ></input>
        )}
        {!open ? (
          <p className="content__item-text">{description}</p>
        ) : (
          <textarea
            className="header__discription-text"
            type="text"
            value={valueArea}
            onChange={getDiscription}
          ></textarea>
        )}
        {!open ? (
          <>
            <button className="content__item-edited" onClick={openItemText}>
              редактировать
            </button>
            <button className="content__item-delete" onClick={deleteItem}>
              удалить
            </button>
            <button className="content__item-archive" onClick={setArchiveItem}>
              приостановить задачу
            </button>
            <button
              className="content__item-completed"
              onClick={setCompletedItem}
            >
              отметить как выполненную
            </button>
            <button className="content__item-time">
              поставить срок выполнения
            </button>
          </>
        ) : (
          <button className="content__save" onClick={saveItemText}>
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

        <div className={style.timer}>{timerComponents}</div>
      </li>
    );
  }
}
// Item.contextType = MyContext;
