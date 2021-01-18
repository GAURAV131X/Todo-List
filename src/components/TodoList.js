import React, { useEffect, useState } from "react";
// import "./../styles/App.css";
import ListItem from "./ListItem";
import Axios from "axios";

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);
  const addItem = () => {
    //post request
    // var data = JSON.stringify({"task":"Hello there 3"});

    // var config = ;

    Axios({
      method: "post",
      url: "http://localhost:5050/api/todo/",
      headers: {
        "Content-Type": "application/json",
      },
      data: { task: newItem },
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    items.push(newItem);
    setItems([...items]);
    setNewItem("");
    setLoading(true);
  };

  const newItemChange = (evt) => {
    setNewItem(evt.target.value);
  };

  const deleteHandler = (itemIdx) => {
    const idToDelete = items[itemIdx]._id;
    Axios.delete(`http://localhost:5050/api/todo/${idToDelete}`).then((r) => {
      console.log("Got successfully DELETE");
      items.splice(itemIdx, 1);
      setItems([...items]);
    });
  };

  const editHandler = (editedValue, itemIdx) => {
    const idToEdit = items[itemIdx]._id;
    Axios({
      method: "put",
      url: `http://localhost:5050/api/todo/${idToEdit}`,
      headers: {},
      data: { task: editedValue },
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    items[itemIdx] = editedValue;
    setItems([...items]);
    setLoading(true);
  };

  useEffect(() => {
    Axios.get("http://localhost:5050/api/todo/").then(function (response) {
      console.log(response.data);

      setItems(response.data);
      setLoading(false);
    });
  }, [loading]);

  return (
    <div id="main">
      <textarea
        id="task"
        onChange={newItemChange}
        placeholder="new task"
        value={newItem}
      ></textarea>
      <button id="btn" onClick={addItem} disabled={newItem.trim().length === 0}>
        Add Item
      </button>

      {items.map((item, idx) => (
        //   console.log(item)
        <ListItem
          item={item.task}
          key={`${item.task}_${item._id}`}
          idx={idx}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      ))}
      
    </div>
  );
}
export default TodoList;
