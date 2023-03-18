import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import SliderShow from './components/SliderShow/SliderShow';
import ComicList from './components/ComicCart/ComicList';
import ComicDetail from './components/ComicDetail/ComicDetail';
import ComicView from './components/ComicView/ComicView';
import ComicGenres from './components/ComicGenres/ComicGenres';
import ComicRanking from './components/ComicRanking/ComicRanking';
import ComicSheet from './components/ComicSheet/ComicSheet';
import ComicSearch from './components/ComicSearch/ComicSearch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<App />}>
          <Route index path='/' element={<><SliderShow/> <ComicList/></>} />
          <Route path='/comic/:slug/:id' element={<ComicDetail/>}/>
          <Route path='/view/:slug/:chapterID/:comicID' element={<ComicView/>} />
          <Route path='/genres/:category/:filter/:sortBy/:page' element={<ComicGenres/>} />
          <Route path='/ranking' element={<ComicRanking isSearch={false}/>}/>
          <Route path='/sheet' element={<ComicSheet/>}/>
          <Route path='/search/:search' element={<ComicRanking isSearch={true}/>}/>
        </Route>
      </Routes>
    </Router>
    {/* <App /> */}
  </React.StrictMode>
);

