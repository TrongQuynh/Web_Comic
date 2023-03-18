import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import style from "./ComicView.module.css";

import { useNavigate, useParams } from 'react-router-dom';
export default function ComicView() {
    const [isHaveNextChap, setIsHaveNextChap] = useState(false);
    const [images, setImgs] = useState([]);
    const DOMAIN_NAME_SERVER = "http://localhost:8080";
    let { slug, chapterID, comicID } = useParams();
    const navigate = useNavigate();
    console.log("Re-render Comic View: ")
    useEffect(() => {
        (async () => {
            const rawResponse = await fetch(`${DOMAIN_NAME_SERVER}/api/en/comic-chapter-view`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug, chapterID, comicID })
            });
            const content = await rawResponse.json();
            setImgs(content);
        })();
        return () => {
            console.log("Clear data view")
            setImgs([]);
        }
    }, [chapterID])

    useEffect(() => {
        (async () => {
            const rawResponse = await fetch(`${DOMAIN_NAME_SERVER}/api/en/comic-chapter-exist/${slug}/${comicID}`);
            const content = await rawResponse.json();
            const totalChapter = content.totalChapter;
            console.log(Number(chapterID) , Number(totalChapter) - 1);
            setIsHaveNextChap(Number(chapterID) < Number(totalChapter) - 1);

        })();
        return ()=>{
            setIsHaveNextChap(false);
        }

    }, [chapterID])

    const handleChangeChapter = (isNextChapter) => {
        let tmp = isNextChapter ? Number(chapterID) + 1 : Number(chapterID) - 1;
        navigate(`/view/${slug}/${tmp}/${comicID}`)
    }

    return (
        <>
            <div className={style.headerComicView}>
                <h4>{slug.replaceAll("-", " ")} - Chapter {chapterID}</h4>
            </div>
            <div className={`${style.comicContainer} container`}>
                <div className="readContainer">
                    {
                        images ?
                            (
                                images.length > 0 ? images.map((img, index) => {
                                    return (
                                        <div key={index} className={style.imageBox}>
                                            <img src={img} alt="" />
                                        </div>
                                    )
                                }) : <div style={{ textAlign: "center", height: "15em", marginTop: "6rem" }}>
                                    <img src='https://i.stack.imgur.com/kOnzy.gif' alt='' style={{ maxWidth: "50%", height: "100%" }} />
                                </div>
                            )
                            : <div style={{ textAlign: "center", height: "15em", marginTop: "6rem" }}>
                                <h5>Please Login</h5>
                            </div>


                    }
                </div>
                <div className={style.readFooter}>
                    <div className={`${style.btnLeftSide} ${Number(chapterID) === 1 ? style.disable : null}`}
                        title="Previous" onClick={() => handleChangeChapter(false)}>
                        <FaArrowLeft className={style.btnArrow} />
                    </div>
                    <div className={`${style.btnRightSide} ${isHaveNextChap? null : style.disable}`}
                        title="Next" onClick={() => handleChangeChapter(true)}>
                        <FaArrowRight className={style.btnArrow} />
                    </div>
                </div>
            </div>
        </>
    )
}
