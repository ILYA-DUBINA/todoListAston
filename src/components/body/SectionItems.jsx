import { Component } from 'react';

import SectionMapItems from './SectionMapItems';
import style from './SectionItems.module.css';

export default class SectionItems extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      arrayElements,
      editedItemElement,
      deleteItemElement,
      addArchiveItemElementAndMarkAsCompletedItemElement,
    } = this.props;
    return (
      <section className={style.section__items}>
        <ul className={style.section__items_content}>
          <SectionMapItems
            arrayElements={arrayElements}
            editedItemElement={editedItemElement}
            deleteItemElement={deleteItemElement}
            addArchiveItemElementAndMarkAsCompletedItemElement={
              addArchiveItemElementAndMarkAsCompletedItemElement
            }
          />
        </ul>
      </section>
    );
  }
}
