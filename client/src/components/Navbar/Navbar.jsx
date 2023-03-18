import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import style from "./Navbar.module.css"
export default function Navbar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e)=>{
    e.preventDefault();
    setSearchText("")
    navigate(`/search/${searchText}`);
  }


  return (

    <div className={style.container}>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/genres/All/All/Popular/1">Genres</Link></li>
            <li><Link to="/ranking">Ranking</Link></li>
            <li><Link to="/sheet">History</Link></li>
            <li><Link to="/sheet">18+</Link></li>
         
            <li className={style.searchBar}>
              <div>
                <form onSubmit={(e)=> handleSearch(e)}> 
                <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder='Search comic' />
                <FaSearch className={style.iconSearch}/>
                </form>
              </div>
            </li>
        </ul>
    </div>
  )
}
