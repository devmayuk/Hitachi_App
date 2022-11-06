import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const ViewSetting = ({setParentRows}) => {
  const [tags, setTags] = React.useState([
    // { id: 'Image_cat_1', text: 'Image_cat_1' },
    // { id: 'Value_cat_1', text: 'Value_cat_1' }
  ]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
    setParentRows(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    setParentRows([...tags, tag]);
    console.log(tag);
    console.log(tags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
    setParentRows(newTags);
    console.log(tags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
      <div>
        <ReactTags
          tags={tags}
          placeholder="Press enter to add row"
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
          editable
        >   
        </ReactTags>
      </div>
  );
};

export default ViewSetting;
