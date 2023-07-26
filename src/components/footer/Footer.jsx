import { Component } from 'react';

import active from '../../images/active.png';
import completed from '../../images/completed.png';
import archive from '../../images/archive.png';

import style from './Footer.module.css';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { addNameFilter } = this.props;
    return (
      <footer className={style.footer}>
        <div className={style.footer__active}>
          <div className={style.footer__active_image}>
            <img
              className={style.image__img}
              src={active}
              alt="картинка активной звезды"
            />
          </div>
          <button
            className={style.footer__active_button}
            onClick={() => addNameFilter('active')}
          >
            Активные
          </button>
        </div>
        <div className={style.footer__completed}>
          <div className={style.footer__completed_image}>
            <img
              className={style.image__img}
              src={completed}
              alt="картинка черной дыры"
            />
          </div>
          <button
            className={style.footer__completed_button}
            onClick={() => addNameFilter('completed')}
          >
            Выпоненные
          </button>
        </div>
        <div className={style.footer__archive}>
          <div className={style.footer__archive_image}>
            <img
              className={style.image__img}
              src={archive}
              alt="картинка пульсара"
            />
          </div>
          <button
            className={style.footer__archive_button}
            onClick={() => addNameFilter('archive')}
          >
            Архив
          </button>
        </div>
      </footer>
    );
  }
}
