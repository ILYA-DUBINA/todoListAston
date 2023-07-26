import { Component } from 'react';

import { debounce } from '../function';

import style from './HeaderSearch.module.css';

class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueError: false,
      valueArea: '',
      openDescriptionValue: false,
      openTimerValue: false,
      years__number: 0,
      months__number: 0,
      days__number: 0,
      hours__number: 0,
      minutes__number: 0,
      seconds__number: 0,
      height: false,
    };
    this.getTitle = this.getTitle.bind(this);
    this.getDiscription = this.getDiscription.bind(this);
    this.getValueInputs = this.getValueInputs.bind(this);
    this.openDescription = this.openDescription.bind(this);
    this.openTimer = this.openTimer.bind(this);
    this.setTimeTask = this.setTimeTask.bind(this);
    this.valueDebounce = debounce(this.props.changeValueWord, 500);
  }

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
  getValueInputs(e) {
    e.preventDefault();
    if (this.state.value.length < 2) {
      this.setState({
        valueError: true,
      });
    } else {
      this.props.createArrayElements({
        title: this.state.value,
        description: this.state.valueArea,
        years: this.state.years__number,
        months: this.state.months__number,
        days: this.state.days__number,
        hours: this.state.hours__number,
        minutes: this.state.minutes__number,
        seconds: this.state.seconds__number,
      });
      this.setState({
        value: '',
        valueArea: '',
        openDescriptionValue: false,
        openTimerValue: false,
        years__number: 0,
        months__number: 0,
        weeks__number: 0,
        days__number: 0,
        hours__number: 0,
        minutes__number: 0,
        seconds__number: 0,
        height: false,
        valueError: false,
      });
    }
  }

  openDescription(e) {
    e.preventDefault();
    this.setState({
      openDescriptionValue: true,
      height: false,
    });
  }
  openTimer(e) {
    e.preventDefault();
    this.setState({
      openTimerValue: true,
      height: true,
    });
  }

  setTimeTask(e) {
    this.setState({
      [e.target.className]: e.target.value,
    });
  }

  render() {
    let {
      getDiscription,
      getTitle,
      getValueInputs,
      openDescription,
      openTimer,
      setTimeTask,
      valueDebounce,
    } = this;
    let {
      value,
      valueArea,
      openDescriptionValue,
      openTimerValue,
      years__number,
      months__number,
      days__number,
      hours__number,
      minutes__number,
      seconds__number,
      height,
      valueError,
    } = this.state;
    console.log(this.props);
    return (
      <header className={style.header}>
        <div className={style.header__title}>
          <h2 className={style.header__title_name}>
            Новый колонист, Добро пожаловать на планету &ldquo;Райская
            земля&ldquo;! <br /> Для комфортного проживания на данной планете мы
            рекомендуем продумать ваши задачи, если их нет в списке текущих
            задач.
          </h2>
          <div className={style.header__title_search}>
            <h3 className={style.search__title}>
              Название задачи или поиск по названию
            </h3>
            <input
              className={
                valueError
                  ? style.search__input + ' ' + style.search__input_error
                  : style.search__input
              }
              type="text"
              value={value}
              onChange={(e) => {
                getTitle(e);
                valueDebounce(e);
              }}
            ></input>
            {valueError && (
              <p className={style.search__error}>
                Данные введены не корректно! Название должно быть и состоять не
                менее чем из 2 символов.
              </p>
            )}
          </div>
        </div>
        <div className={style.header__content}>
          {!openDescriptionValue ? (
            <div
              className={
                (style.header__openDescrition,
                style.example,
                height ? style.height : null)
              }
            >
              <a
                href="#"
                className={style.header__openDescrition_content}
                onClick={openDescription}
              >
                Для описания вашей задачи смелее нажимайте!
              </a>
              <div className={style.header__openDescrition_outer}></div>
            </div>
          ) : (
            <div className={style.header__description}>
              <h3 className="header__description-name">Описание задачи</h3>
              <textarea
                className="header__description-text"
                type="text"
                value={valueArea}
                onChange={getDiscription}
              ></textarea>
            </div>
          )}
          {!openTimerValue ? (
            <div className={(style.header__openTime, style.example)}>
              <a
                href="#"
                className={style.header__openTime_content}
                onClick={openTimer}
              >
                Для установки времени выполнения жмите!
              </a>
              <div className={style.header__openTime_outer}></div>
            </div>
          ) : (
            <div className={style.header__time}>
              <h3 className="header__time_title">Срок выполнения</h3>
              <div className={style.header__time_date}>
                <div className="header__time_years">
                  <h4 className="years__title">Годы</h4>
                  <input
                    className="years__number"
                    type="number"
                    min="0"
                    value={years__number}
                    onChange={setTimeTask}
                    onFocus={(e) => (e.target.value = '')}
                  />
                </div>
                <div className="header__time_months">
                  <h4 className="months__title">Месяцы</h4>
                  <input
                    className="months__number"
                    type="number"
                    min="0"
                    value={months__number}
                    onChange={setTimeTask}
                    onFocus={(e) => (e.target.value = '')}
                  />
                </div>
                <div className="header__time_days">
                  <h4 className="days__title">Дни</h4>
                  <input
                    className="days__number"
                    type="number"
                    min="0"
                    value={days__number}
                    onChange={setTimeTask}
                    onFocus={(e) => (e.target.value = '')}
                  />
                </div>
                <div className="header__time_hours">
                  <h4 className="hours__title">Часы</h4>
                  <input
                    className="hours__number"
                    type="number"
                    min="0"
                    value={hours__number}
                    onChange={setTimeTask}
                    onFocus={(e) => (e.target.value = '')}
                  />
                </div>
                <div className="header__time_minutes">
                  <h4 className="minutes__title">Минуты</h4>
                  <input
                    className="minutes__number"
                    type="number"
                    min="0"
                    value={minutes__number}
                    onChange={setTimeTask}
                    onFocus={(e) => (e.target.value = '')}
                  />
                </div>
                <div className="header__time_seconds">
                  <h4 className="seconds__title">Секунды</h4>
                  <input
                    className="seconds__number"
                    type="number"
                    min="0"
                    value={seconds__number}
                    onChange={setTimeTask}
                    onFocus={(e) => (e.target.value = '')}
                  />
                </div>
              </div>
            </div>
          )}
          <div className={height ? style.height__create : null}></div>
          <div className={style.header__create}>
            <a
              href="#"
              className={style.header__create_task}
              onClick={getValueInputs}
            >
              Создать новую задачу
            </a>
            <div className={style.header__create_outer}></div>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderSearch;
