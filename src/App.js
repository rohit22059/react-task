import './App.css';
import  Navbar  from './components/Navbar';
import { Home, Electronics, Books } from './components/pages/';
import Slider from './components/Slider';
import data from "./components/slides";

function App() {
  return (
    <div className="app">
    <Navbar />
      <div className="center">
        <Slider data={data} activeSlide={5} />
      </div>
    </div>
  );
}

export default App;
