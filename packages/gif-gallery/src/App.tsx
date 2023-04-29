import React from 'react';
import './App.css';
import { ButtonComponent, MyComponent, defineCustomElements } from 'react-library';

defineCustomElements();

function App() {
  return (
    <div className="App py-4">
      {/* <MyComponent first="Your" last="Name" />
      <button className='btn-primary'>Hola</button> */}
      <ButtonComponent status='active' text='Active Button' />
      <button className='bg-[#c3c3c3] dark:bg-[#57585D] dark:text-white px-3 py-1 rounded-md'>Hola</button>
    </div>
  );
}

export default App;
