import React from 'react'
import { FaHeart, FaHotjar } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import style from "./ComicInfoSide.module.css";

import { LODING_GIFT } from "../../Helper/lodingGIF";
import ComicLoading from '../ComicLoading/ComicLoading';

function ComicInfoSide({ comicInfo }) {
    const navigate = useNavigate();
    const handleReadComic = () => {
        navigate(comicInfo.comicChapterList[0].href);
    }

    const handleAddFavoriteComic = () => {

    }

    return (
        <div style={{ margin: "1.5rem" }}>

            <div className={style.leftSide}>
                <img src={comicInfo.thumbnail ? comicInfo.thumbnail : LODING_GIFT} alt={comicInfo.comicName} />
            </div>
            <div className={style.rightSide}>
                {
                    Object.keys(comicInfo).length > 0 ?
                        (
                            <>
                                <div className={style.comicName}>
                                    <h5>{comicInfo.comicName}</h5>
                                </div>
                                <div className={style.comicGenres}>
                                    {
                                        comicInfo.comicGenres ?
                                            comicInfo.comicGenres.map((genre, index) => <span key={index}><Link to={`/genres/${genre}/All/Popular/1`}>{genre}</Link></span>)
                                            : null
                                    }
                                </div>
                                <div className={style.comicAuthor}>
                                    {
                                        comicInfo.comicAuthor ? <><b>Author: </b> <span >{comicInfo.comicAuthor}</span></> : null
                                    }

                                </div>
                                <div className="comicStatistical">
                                    {
                                        comicInfo.statistical ? <><FaHeart className={style.comicStatisticalIcons} /> <span>{comicInfo.statistical.heart}</span> </> : null
                                    }

                                    <span style={{ margin: "0 .7rem" }}></span>

                                    {
                                        comicInfo.statistical ? <>
                                            <FaHotjar className={style.comicStatisticalIcons} />
                                            <span>{comicInfo.statistical.hot}</span>
                                        </> : null
                                    }

                                </div>
                                <div className={`${style.comicDescript}`}>
                                    <p className={style.overflowText}>
                                        {comicInfo.comicDescription}
                                    </p>
                                </div>
                                <div className={style.comicAction}>
                                    <button id={style.btnReadNow} onClick={() => { handleReadComic() }}>Read Now</button>
                                    <button id={style.btnFavorite}>Favorite</button>
                                </div>
                            </>
                        )
                        :
                        <ComicLoading/>
                }
            </div>
            <div className={style.clear}></div>

        </div>
    )
}

export default ComicInfoSide