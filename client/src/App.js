
import { Outlet } from 'react-router-dom';
import './App.css';
import ComicList from './components/ComicCart/ComicList';
import ComicDetail from './components/ComicDetail/ComicDetail';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import SliderShow from './components/SliderShow/SliderShow';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  console.log("Out let is run");
  return (
    <div className="container1">
      <Header />
      <Navbar />
        {/* <SliderShow />
        <ComicList /> */}
      <Outlet/>  
      {/* <ComicDetail/> */}
      <ScrollToTop/>
      <Footer />
    </div>
  );
}

export default App;
