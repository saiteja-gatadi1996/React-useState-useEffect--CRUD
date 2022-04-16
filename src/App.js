import React, { useState, useEffect } from 'react';

const getLocalStorage = () => {
  let getData = localStorage.getItem('list');
  if (getData) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      return <h1>No data found.. Please enter value</h1>;
    } else if (text && isEditing) {
      const newData = data.map((item) => {
        return { ...item, title: text };
      });
      setData(newData);

      setText('');
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: text };
      setData([...data, newItem]);
      setText('');
    }
  };

  const editItem = (id) => {
    const findItem = data.find((item) => item.id === id);
    setIsEditing(true);
    setText(findItem.title);
  };

  const removeItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(data));
  }, [data]);

  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required={true}
          maxLength='10'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      <div>
        {data.map(({ id, title }) => (
          <div key={id} className='container'>
            <div className='data-container'>
              <h4>{title}</h4>
            </div>
            <div className='btn-container'>
              <button type='button' onClick={() => editItem(id)}>
                Edit
              </button>
              <button type='button' onClick={() => removeItem(id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
