/* eslint-disable react/prop-types */

import './App.css'
import { useRef } from 'react'

function App() {
  // refs for calc arithmetic screen and result screen
  const displayRef = useRef(null)
  const screenRef = useRef(null)
  return (
    // body of the calculator
    <div className='backdrop bg-bg grid place-items-center min-h-screen w-screen'>
      <div className="calculator flex flex-col h-[75%] w-[calc(100vh/2)] bg-bg justify-center">
      <Screens displayRef={displayRef} screenRef={screenRef} />
      <CalcBody displayRef={displayRef} screenRef={screenRef}  />
      </div>
    </div>
  );
}


const Screens = ({ displayRef, screenRef }) => {
  return (
  // the calculator screens
  <div className=" bg-primary h-[20%] mx-5">
    <div ref={ screenRef } id="screen" type="text" className="w-[100%] h-[40%] text-[1.25rem] px-1 font-ss py-1 overflow-x-auto overflow-y-hidden whitespace-nowrap bg-bg text-accent2">WELCOME !!!</div>
    <div ref={ displayRef } id="display" type="text" className="w-[100%] h-[60%] text-[2.5rem] px-1 font-ss py-1 overflow-x-auto overflow-y-hidden whitespace-nowrap bg-bg text-fg text-end">0</div>
  </div>
  );
}

const CalcBody = ({ displayRef, screenRef }) => {
  const buttonRef = useRef(null)
  const operators = ["/", "*", "+", "-"];

  const handleClickEvents = (event) => {
    // wait until ref is loaded
    if (buttonRef.current.contains(event.target) && displayRef.current && screenRef.current) {
      console.log(event.target.id);
      let displayContent = displayRef.current.textContent;
      let screenContent = screenRef.current.textContent;
      // clear all screens
      if (event.target.id === 'clear') {
        displayRef.current.textContent = '0';
        screenRef.current.textContent = '0';
      }
      // keep the zero if only 0 is present
      if (displayContent === '0' && event.target.id === 'zero') {
        screenRef.current.textContent = '0'
        // if there is a valid number besides 0 then append new numbers to the displays
      } else if ((!isNaN(event.target.dataset.value) || (event.target.id === 'decimal'
        && !displayContent.includes('.'))) && displayContent !== '0') {
        displayContent = [displayContent, event.target.dataset.value];
        displayContent = displayContent.join('');
      
        screenContent = [screenContent, event.target.dataset.value];
        screenContent = screenContent.join('');

        displayRef.current.textContent = displayContent;
        screenRef.current.textContent = screenContent;
        // if 0 is present replace it with a valid number
      } else if (!isNaN(event.target.dataset.value)) {
        displayRef.current.textContent = event.target.dataset.value;
        screenRef.current.textContent = event.target.dataset.value;
        // prevents repeated operators, while only allowing - as a second optional operator
      } else if (operators.includes(event.target.dataset.value) && screenContent.slice(-1) !== event.target.dataset.value &&
        !(operators.includes(screenContent.slice(-1)) && operators.includes(screenContent.slice(-2, -1)))) {
        if ((operators.includes(screenContent.slice(-1)) && event.target.dataset.value === '-') || !isNaN(screenContent.slice(-1))) {
          screenContent = [screenContent, event.target.dataset.value];
          screenContent = screenContent.join('');
          screenRef.current.textContent = screenContent;
        } else {
          screenContent = screenContent.split('')
          screenContent.splice(-1, 1, event.target.dataset.value)
          screenContent = screenContent.join('')
          screenRef.current.textContent = screenContent;
        }
      } else if (operators.includes(event.target.dataset.value) && screenContent.slice(-1) === '-' && operators.includes(screenContent.slice(-2, -1))) {
        screenContent = screenContent.split('')
        screenContent.splice(-2, 2, event.target.dataset.value)
        screenContent = screenContent.join('')
        screenRef.current.textContent = screenContent;
      }
    }
  }
  return (
    <div ref={ buttonRef } onClick={handleClickEvents} id="numpad" className="grid grid-cols-4 gap-2 p-5 h-[70%]">
      <div id="clear" className="bg-accent2 cursor-pointer hover:bg-accent px-1 py-4  rounded-lg text-center text-fg text-xl font-inter col-span-2 font-bold">CE</div>
      <div id="divide"   data-value="/" className="operator text-[1.5rem]">/</div>
      <div id="add"      data-value="+" className="operator text-[2rem]">+</div>
      <div id="one"      data-value="1" className="number   text-lg">1</div>
      <div id="two"      data-value="2" className="number   text-lg">2</div>
      <div id="three"    data-value="3" className="number   text-lg">3</div>
      <div id="subtract" data-value="-" className="operator text-[2rem]">-</div>
      <div id="four"     data-value="4" className="number   text-lg">4</div>
      <div id="five"     data-value="5" className="number   text-lg">5</div>
      <div id="six"      data-value="6" className="number   text-lg">6</div>
      <div id="multiply" data-value="*" className="operator text-[2rem]">*</div>
      <div id="seven"    data-value="7" className="number   text-lg">7</div>
      <div id="eight"    data-value="8" className="number   text-lg">8</div>
      <div id="nine"     data-value="9" className="number   text-lg">9</div>
      <div id="equals"   data-value="=" className="bg-accent2 cursor-pointer hover:bg-accent py-4 rounded-lg text-center text-fg text-4xl font-inter row-span-2">=</div>
      <div id="zero"     data-value="0" className="number   text-2xl col-span-2">0</div>
      <div id="decimal"  data-value="." className="number   text-2xl">.</div>
    </div>
  );
}

export default App
