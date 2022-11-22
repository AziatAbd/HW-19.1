import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  const addTodo = (e) => {
    setValue(e.target.value);
  };

  const addTodoPost = async () => {
    await fetch("https://fake-api-backend.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({ name: value }),
      headers: { "Content-Type": "application/json" },
    });
    getTodo();
  };

  const getTodo = async () => {
    const response = await fetch(
      "https://fake-api-backend.herokuapp.com/users"
    );
    const data = await response.json();

    console.log(data);

    const updatedData = data.filter((item) => {
      return { name: item.name, id: item.id };
    });
    setTodo(updatedData);
  };

  function submitHandler(e) {
    e.preventDefault();

    addTodoPost();

    setValue("");
  }
  const deleteTodo = async (id) => {
    await fetch(`https://fake-api-backend.herokuapp.com/users/${id}`, {
      method: "DELETE",
    });

    getTodo();
  };

  useEffect(() => {
    getTodo();
  }, []);

  const [newValue, setNewValue] = useState("");
  const [id, setId] = useState(null);

  const getValueId = (value, id) => {
    setNewValue(value);
    setId(id);
  };

  const changeTodo = async (id) => {
    await fetch(`https://fake-api-backend.herokuapp.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: newValue }),
      headers: { "Content-type": "application/json" },
    });
    getTodo();
  };
  const sendNewData = (id) => {
    newValue.map((item) => {
      if (item.id === id) {
        item.value = newValue;
      }
      return item;
    });
    setId(null);
    changeTodo(id);
  };

  return (
    <>
      <form className="App" onSubmit={submitHandler}>
        <input type="text" value={value} onChange={addTodo} />
        <button>Send</button>
      </form>
      <ul>
        {todo.map((el) => {
          return (
            <div key={el.id}>
              {el.id === id ? (
                <div>
                  <input
                    onChange={(e) => setNewValue(e.target.value)}
                    value={value}
                  />
                  <button onClick={() => sendNewData(el.id)}>save</button>
                </div>
              ) : (
                <div>{el.name}</div>
              )}

              <button onClick={() => getValueId(el.id, el.name)}>edit</button>
              <button onClick={() => deleteTodo(el.id)}>delete</button>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default App;
