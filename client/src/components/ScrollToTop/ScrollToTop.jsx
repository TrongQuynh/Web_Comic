import React, { useEffect, useState } from 'react'

import style from "./ScrollToTop.module.css";

function ScrollToTop() {
    const [isShowScrollTopBTN, setShowScrollTopBTN] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",function(){
            setShowScrollTopBTN(window.scrollY > 100);
        })
    },[]);

    const handleScrollToTop = ()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

    return (
        <div>
            {
                isShowScrollTopBTN && (<button className={style.button} onClick={()=>{handleScrollToTop()}}>↑</button>)
            }
        </div>
    )
}

export default ScrollToTop;