
import './App.css'

function App() {

  return (
    <div className='backdrop bg-bg grid place-items-center min-h-screen w-screen'>
      <div className="calculator flex flex-col h-[75%] w-[calc(100vh/2)] bg-bg justify-center">
      <Screens />
      <CalcBody />
      </div>
    </div>
  );
}


const Screens = () => {
  return (
  <div className=" bg-primary h-[20%] mx-5">
    <div id="screen" type="text" className="w-[100%] h-[40%] text-[1.25rem] px-1 font-ss py-1 overflow-x-auto overflow-y-hidden whitespace-nowrap bg-bg text-accent2">WELCOME !!!</div>
    <div id="display" type="text" className="w-[100%] h-[60%] text-[2.5rem] px-1 font-ss py-1 overflow-x-auto overflow-y-hidden whitespace-nowrap bg-bg text-fg text-end">0</div>
  </div>
  );
}

const CalcBody = () => {
  return (
    <div id="numpad" className="grid grid-cols-4 gap-2 p-5 h-[70%]">
      <div id="clear" className="bg-accent2 cursor-pointer hover:bg-accent px-1 py-4  rounded-lg text-center text-fg text-xl font-inter col-span-2 font-bold">CE</div>
      <div data-value="/" className="operator text-[1.5rem]">/</div>
      <div data-value="+" className="operator text-[2rem]">+</div>
      <div data-value="1" className="number   text-lg">1</div>
      <div data-value="2" className="number   text-lg">2</div>
      <div data-value="3" className="number   text-lg">3</div>
      <div data-value="-" className="operator text-[2rem]">-</div>
      <div data-value="4" className="number   text-lg">4</div>
      <div data-value="5" className="number   text-lg">5</div>
      <div data-value="6" className="number   text-lg">6</div>
      <div data-value="*" className="operator text-[2rem]">*</div>
      <div data-value="7" className="number   text-lg">7</div>
      <div data-value="8" className="number   text-lg">8</div>
      <div data-value="9" className="number   text-lg">9</div>
      <div data-value="=" className="bg-accent2 cursor-pointer hover:bg-accent py-4 rounded-lg text-center text-fg text-4xl font-inter row-span-2">=</div>
      <div data-value="0" className="number   text-2xl col-span-2">0</div>
      <div data-value="." className="number   text-2xl">.</div>
    </div>
  );
}

export default App
