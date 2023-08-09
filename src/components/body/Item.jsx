import { Component } from 'react';

import { calculateTimeLeft } from '../function';
import { ContextValue } from '../../App';

import style from './Item.module.css';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.obj.title,
      valueArea: this.props.obj.description,
      open: false,
      timer: {},
      count: 0,
      item__days: '',
      item__hours: '',
      item__minutes: '',
      item__seconds: '',
    };
    this.id;
    this.openItemText = this.openItemText.bind(this);
    this.saveItemText = this.saveItemText.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setArchiveItem = this.setArchiveItem.bind(this);
    this.setCompletedItem = this.setCompletedItem.bind(this);
    this.setTimeTaskItem = this.setTimeTaskItem.bind(this);
  }
  openItemText() {
    this.setState({
      open: true,
    });
  }
  saveItemText() {
    if (this.state.value < 2) {
      this.props.deleteItemElement(this.props.obj.id);
    } else {
      this.props.editedItemElement({
        id: this.props.obj.id,
        value: this.state.value,
        valueArea: this.state.valueArea,
        days__number: this.state.item__days,
        hours__number: this.state.item__hours,
        minutes__number: this.state.item__minutes,
        seconds__number: this.state.item__seconds,
      });
      this.setState({
        open: false,
      });
    }
  }
  deleteItem() {
    this.props.deleteItemElement(this.props.obj.id);
  }
  setArchiveItem() {
    this.props.addArchiveItemElementAndMarkAsCompletedItemElement(
      this.props.obj.id,
      'archive',
    );
  }
  setCompletedItem() {
    this.props.addArchiveItemElementAndMarkAsCompletedItemElement(
      this.props.obj.id,
      'completed',
    );
  }
  setTimeTaskItem(e) {
    this.setState({
      [e.target.className]: e.target.value,
    });
  }
  componentDidMount() {
    this.setState({
      timer:
        calculateTimeLeft(this.state.timer) &&
        calculateTimeLeft(this.props.obj.time),
    });
  }
  componentDidUpdate() {
    let count = 0;
    if (Object.keys(this.state.timer).length) {
      this.id = setTimeout(() => {
        this.setState({
          timer: calculateTimeLeft(this.props.obj.time),
          count: count++,
        });
        count++;
      }, 1000);
      this.props.obj.archive && clearTimeout(this.id);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.id);
  }
  render() {
    let { title, description, archive, completed } = this.props.obj;
    let {
      open,
      value,
      valueArea,
      timer,
      item__days,
      item__hours,
      item__minutes,
      item__seconds,
    } = this.state;
    let {
      openItemText,
      saveItemText,
      deleteItem,
      setArchiveItem,
      setCompletedItem,
      setTimeTaskItem,
    } = this;
    const timerComponents = Object.keys(timer).map((interval) => {
      if (!timer[interval]) {
        return '00' + ' ' + interval + ' ';
      }
      return (
        <span key={Math.random()}>
          {timer[interval] < 10
            ? '0' + timer[interval] + ' ' + interval + ' '
            : timer[interval] + ' ' + interval + ' '}
        </span>
      );
    });
    return (
      <ContextValue.Consumer>
        {({ theme }) => (
          <li
            className={theme ? style.content + ' ' + style.red : style.content}
          >
            {completed ? (
              <div className={style.content__completed}>
                <div className={style.content__completed_text}>
                  <svg
                    width="163px"
                    height="163px"
                    viewBox="-102.4 -102.4 1228.80 1228.80"
                    className={style.text__image}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    stroke="#000000"
                    strokeWidth="0.01024"
                    transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z"
                        fill="#43A047"
                      />
                    </g>
                  </svg>
                  <h2 className={style.text__title}>
                    Поздравляю! Задача &ldquo;{title}&ldquo; выполнена успешно.
                  </h2>
                </div>
                <div className={style.content__completed_buttons}>
                  <button
                    className={style.buttons__resume}
                    onClick={setCompletedItem}
                  >
                    Возобновить задачу
                  </button>
                  <button
                    className={style.buttons__delete}
                    onClick={deleteItem}
                  >
                    Удалить задачу
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                  {!open ? null : (
                    <div className={style.item__time}>
                      <h3 className={style.item__time_title}>
                        Срок выполнения
                      </h3>
                      <div className={style.item__time_date}>
                        <div className={style.item__time_days}>
                          <h4 className={style.days__title}>Дни</h4>
                          <input
                            className="item__days"
                            type="number"
                            min="0"
                            value={item__days}
                            onChange={setTimeTaskItem}
                            onFocus={(e) => (e.target.value = '')}
                          />
                        </div>
                        <div className={style.item__time_hours}>
                          <h4 className={style.hours__title}>Часы</h4>
                          <input
                            className="item__hours"
                            type="number"
                            min="0"
                            value={item__hours}
                            onChange={setTimeTaskItem}
                            onFocus={(e) => (e.target.value = '')}
                          />
                        </div>
                        <div className={style.item__time_minutes}>
                          <h4 className={style.minutes__title}>Минуты</h4>
                          <input
                            className="item__minutes"
                            type="number"
                            min="0"
                            value={item__minutes}
                            onChange={setTimeTaskItem}
                            onFocus={(e) => (e.target.value = '')}
                          />
                        </div>
                        <div className={style.item__time_seconds}>
                          <h4 className={style.seconds__title}>Секунды</h4>
                          <input
                            className="item__seconds"
                            type="number"
                            min="0"
                            value={item__seconds}
                            onChange={setTimeTaskItem}
                            onFocus={(e) => (e.target.value = '')}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {!open ? (
                    <h2 className={style.content__item_title}>{title}</h2>
                  ) : (
                    <textarea
                      className="value"
                      type="text"
                      value={value}
                      onChange={setTimeTaskItem}
                      placeholder="название задачи"
                    ></textarea>
                  )}
                  {!open ? (
                    <p className={style.content__item_text}>{description}</p>
                  ) : (
                    <textarea
                      className="valueArea"
                      type="text"
                      value={valueArea}
                      onChange={setTimeTaskItem}
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
                    </div>
                  ) : (
                    <button
                      className={style.content__save}
                      onClick={saveItemText}
                    >
                      Сохранить изменения
                    </button>
                  )}
                  {archive ? (
                    <div className={style.content__item_block}>
                      <svg
                        className={style.block__svg}
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          stroke: 'rgba(255, 0, 0, 0.9)',
                          strokeWidth: 10,
                        }}
                      >
                        <line x1="0" y1="0" x2="100%" y2="100%" />
                        <line x1="0" y1="100%" x2="100%" y2="0" />
                      </svg>
                      <h2 className={style.block__title}>
                        Задача добавлена в архив
                      </h2>
                      <button
                        className={style.block__active}
                        onClick={setArchiveItem}
                      >
                        Возобновить задачу
                      </button>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </li>
        )}
      </ContextValue.Consumer>
    );
  }
}
