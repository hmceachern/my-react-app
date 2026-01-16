import React, { useState } from 'react';
import Navigation from './Navigate';


const BuffCounter = () => {
  // 1. Define state to hold the list of elements (e.g., strings)
  const [items, setItems] = useState([{id: 1, BuffName: "Buff 1", maxRounds: 10, currRounds: 0}]);

  // 2. Create an event handler function
  const addElement = () => {
    // Add a new unique item to the items array in an immutable way
    const newItem = {id: items.length+1, BuffName: "New Buff", currRounds: 0, maxRounds: 10};
    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeElement = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId)
    setItems(updatedItems)
  }

  const changeBuffName = (idToUpdate, newName) => {
    setItems(prevItems => {
      return prevItems.map(todo => {
        // If the ID matches, create a new object with the updated property
        if (todo.id === idToUpdate) {
          return { ...todo, BuffName: newName };
        }
        // Otherwise, return the original item unchanged
        return todo;
      });
    })
  }

  const changecurrRounds = (idToUpdate, newRounds) => {
    setItems(prevItems => {
      return prevItems.map(todo => {
        // If the ID matches, create a new object with the updated property
        if (todo.id === idToUpdate) {
          return { ...todo, currRounds: newRounds };
        }
        // Otherwise, return the original item unchanged
        return todo;
      });
    })
  }

  const changemaxRounds = (idToUpdate, newRounds) => {
    setItems(prevItems => {
      return prevItems.map(todo => {
        // If the ID matches, create a new object with the updated property
        if (todo.id === idToUpdate) {
          return { ...todo, maxRounds: newRounds };
        }
        // Otherwise, return the original item unchanged
        return todo;
      });
    })
  }

  // 3. and 4. Render the button and the list
  return (
    <div>
      <Navigation />
      <h1>Counter for Buffs:</h1>
      <h2>Click to add new Buff Counter: </h2>
      <button onClick={addElement}>
        Add Element
      </button>

        {items.map((item, index) => (
            // Use a unique key for each dynamic element
            <div key={index}>
                Buff {item.id}
                <div>
                    <input id={item.id + '-name'} placeholder={item.BuffName} onChange={(e) => changeBuffName(item.id, e)}></input>
                </div>
                <div>
                    <input id={item.id + '-currRounds'} placeholder={item.currRounds} onChange={(e) => changecurrRounds(item.id, e)}></input><span> / </span> <input id={item.id + "-maxRounds"} placeholder={item.maxRounds} onChange={(e) => changemaxRounds(item.id, e)}></input> <button onClick={() => removeElement(item.id)}>X</button>
                </div>
            </div> 
        ))}
    </div>
  );
}

export default BuffCounter;
