import { Component } from 'react';

import style from './Footer.module.css';

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className={style.footer}>
        <button className="footer__active">Активные</button>
        <button className="footer__completed">Выпоненные</button>
        <button className="footer__archive">Архив</button>
      </footer>
    );
  }
}
