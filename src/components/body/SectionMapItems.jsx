import React, { Component } from 'react';

import Item from './Item';

class SectionMapItems extends Component {
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
      <React.Fragment>
        {arrayElements?.map((item) => (
          <React.Fragment key={Math.random()}>
            <Item
              obj={item}
              editedItemElement={editedItemElement}
              deleteItemElement={deleteItemElement}
              addArchiveItemElementAndMarkAsCompletedItemElement={
                addArchiveItemElementAndMarkAsCompletedItemElement
              }
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default SectionMapItems;
