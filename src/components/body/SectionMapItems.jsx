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
      addArchiveItemElement,
    } = this.props;
    return (
      <React.Fragment>
        {arrayElements?.map((item) => (
          <React.Fragment key={Math.random()}>
            <Item
              obj={item}
              editedItemElement={editedItemElement}
              deleteItemElement={deleteItemElement}
              addArchiveItemElement={addArchiveItemElement}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default SectionMapItems;
