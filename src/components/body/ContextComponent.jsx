import React, { Component } from 'react';

import context from '../../images/context.png';
import contextReverce from '../../images/contextReverse.png';
import { ContextValue } from '../../App.jsx';

import style from './ContextComponent.module.css';

export default class ContextComponent extends Component {
  constructor(props) {
    super(props);
    this.changeTheme = this.changeTheme.bind(this);
  }
  changeTheme() {}
  render() {
    return (
      <ContextValue.Consumer>
        {({ theme, toggleTheme }) => (
          <div className={style.context}>
            <div className={style.context__button}>
              <div className={style.context__button_image}>
                <img
                  className={style.image__img}
                  src={theme ? contextReverce : context}
                  alt="картинка солнца"
                />
              </div>
              <button
                className={
                  theme
                    ? style.context__button_change + ' ' + style.red
                    : style.context__button_change
                }
                onClick={toggleTheme}
              >
                Изменить темy
              </button>
            </div>
          </div>
        )}
      </ContextValue.Consumer>
    );
  }
}
