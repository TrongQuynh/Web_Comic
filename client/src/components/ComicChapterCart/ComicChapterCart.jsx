import React from 'react'
import { FaCommentAlt, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import style from "./ComicChapterCart.module.css";
export default function ComicChapterCart(chapterInfo) {
    const LODING_GIFT = "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif";
    return (
        <div className='chapterCart'>
            <Link to={chapterInfo.href} className={chapterInfo.isLocked ? style.disabledLink : null}>
                <div className={style.leftSide} >
                    <img src={chapterInfo.chapterThumbnail ? chapterInfo.chapterThumbnail : LODING_GIFT} className={chapterInfo.isLocked ? style.chapterLocked : null} alt={chapterInfo.chapterName} />
                    {
                        chapterInfo.isLocked ? <FaLock className={style.lockIcon} /> : null
                    }

                </div>
                <div className={style.rightSide}>
                    <h5 className={style.chapterName}>{chapterInfo.chapterName}</h5>
                    <p>
                        <span className={style.chapterReleaseTime}>{chapterInfo.releaseTime}</span>
                        <span className={style.chapterComment}>
                            <FaCommentAlt className={style.commentIcon} />
                        </span>
                        <span className={style.amountComment}>{chapterInfo.amountCommentOfChapter}</span>
                    </p>
                </div>
                <div className="clear"></div>
            </Link>
        </div>
    )
}
