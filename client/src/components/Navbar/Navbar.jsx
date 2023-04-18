import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import style from "./Navbar.module.css"

import { ADULT_TAB, GENRES_TAB, HISTORY_TAB, HOME_TAB, RANKING_TAB } from "../../Helper/tabName";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentTab, setCurrentTab] = useState(HOME_TAB);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText("")
    navigate(`/search/${searchText}`);
  }

  const handleChangeTab = (tab) => {
    setCurrentTab(tab);

    // Set Title page
    document.title = tab;
  }


  return (

    <div className={style.container}>
      <ul>
        <li><Link to="/" className={currentTab === HOME_TAB ? style.active : ""} onClick={() => handleChangeTab(HOME_TAB)}>Home</Link></li>
        <li><Link to="/genres/All/All/Popular/1" className={currentTab === GENRES_TAB ? style.active : ""} onClick={() => handleChangeTab(GENRES_TAB)}>Genres</Link></li>
        <li><Link to="/ranking" className={currentTab === RANKING_TAB ? style.active : ""} onClick={() => handleChangeTab(RANKING_TAB)}>Ranking</Link></li>
        <li><Link to="/sheet" className={currentTab === HISTORY_TAB ? style.active : ""} onClick={() => handleChangeTab(HISTORY_TAB)}>History</Link></li>
        <li><Link to="/sheet" className={currentTab === ADULT_TAB ? style.active : ""} onClick={() => handleChangeTab(ADULT_TAB)}>18+</Link></li>

        <li className={style.searchBar}>
          <div>
            <form onSubmit={(e) => handleSearch(e)}>
              <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search comic' />
              <FaSearch className={style.iconSearch} />
            </form>
          </div>
        </li>
      </ul>
    </div>
  )
}
