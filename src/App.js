import React, { useEffect, useState } from "react";
import './styles.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(items));
  }, [items]);

  const add = (e) => {
    e.preventDefault();
    setItems([...items, { id: uuidv4(), newItem }]);
    setNewItem("");
  }

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  return (
    <div className="App">
      <form className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input type="text" id="item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        </div>
        <button className="btn" onClick={add}>Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.completed} />{item.newItem}
            </label>
            <button className="btn btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
