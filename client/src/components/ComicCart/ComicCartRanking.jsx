import React from 'react'
import { Link } from 'react-router-dom'
import style from "./ComicCartRanking.module.css"

export default function ComicCartRanking(comic) {
  return (
    <div className={style.comicCart}>
        <Link to={comic.href} className={style.comicLink}>
            <div className={style.imgSide}>
                <img src={comic.thumbnail} alt="" />
                <div className={style.rankTag}>{comic.top}</div>
            </div>
            <div className={style.infoSide}>
                <p className={style.comicName}>{comic.comicName}</p>
                <p className={style.comicGenres}>
                    <span>{comic.comicGenres}</span>
                </p>
                <p className={`${style.comicDescript} ${style.overflowText}`}>
                    {comic.comicDescription ? comic.comicDescription : "No Description"}
                </p>
            </div>
            <div className={style.clear}></div>
        </Link>
    </div>
  )
}
