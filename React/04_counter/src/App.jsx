import { useState } from 'react'
function App() {
  // let count = 0;
  const [count, setCount] = useState(0);
  const addValue = () => {
    // count += 1;
    // setCount(count + 1);
    setCount(prevCount => prevCount + 1);
    console.log('Count updated:', count);
  }
  const removeValue = () => {
    // count -= 1;
    // setCount(count - 1);
    setCount(prevCount => prevCount - 1);
    console.log('Count updated:', count);
  }
  return (
    <>
      <h1>React Counter: {count}</h1>
      <h2>Counter Value: {count}</h2>
      <button
        onClick={() => addValue()}> Add value </button>
      <button
        onClick={() => removeValue()}>Remove value</button>
      <footer>footer : {count}</footer>
    </>
  )
}

export default App
