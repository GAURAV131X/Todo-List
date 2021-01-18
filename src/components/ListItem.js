import React from "react";
import { useState } from "react";

function ListItem(props) {
  const [editedItem, setEditedItem] = useState(props.item);
  const [editMode, setEditMode] = useState(false);

  const editedItemChange = (evt) => {
    setEditedItem(evt.target.value);
  };
  const saveEditedItem = () => {
    props.editHandler(editedItem, props.idx);
    setEditMode(false);
  };
  return (
    <div className="list">
      {editMode ? (
        <>
          <textarea
            className="editTask"
            onChange={editedItemChange}
            placeholder="edit task"
            value={editedItem}
          ></textarea>
          <button
            className="saveTask"
            onClick={saveEditedItem}
            disabled={editedItem.trim().length === 0}
          >
            Save
          </button>
        </>
      ) : (
        <>
          {props.item}
          <button className="edit" onClick={() => setEditMode(true)}>
            Edit
          </button>
          <button
            className="delete"
            onClick={() => props.deleteHandler(props.idx)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ListItem;