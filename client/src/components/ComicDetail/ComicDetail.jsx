import React, { useEffect, useState } from 'react'
import style from "./ComicDetail.module.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHeart, FaHotjar } from "react-icons/fa";
import ComicChapterCart from '../ComicChapterCart/ComicChapterCart';
import ComicCart from '../ComicCart/ComicCart';
import { Link, useParams } from 'react-router-dom';
import ComicLoading from '../ComicLoading/ComicLoading';
import { Helper } from '../../Helper';

export default function ComicDetail() {
    const DOMAIN_NAME_SERVER = "http://localhost:8080";
    const LODING_GIFT = "https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif";
    const [comics, setComics] = useState([]);
    const [comicInfo, setComicInfo] = useState({});
    const helper = new Helper();

    useEffect(() => {
        fetch(`${DOMAIN_NAME_SERVER}/api/en/comic-recommend-for-you`)
            .then(respone => respone.json())
            .then(data => {
                setComics(data)
            });
    }, []);

    const { slug, id } = useParams();

    useEffect(() => {
        if (comicInfo.id) {
            helper.setLocalStorage("comics", {
                id: comicInfo.id,
                comicName: comicInfo.comicName,
                thumbnail: comicInfo.thumbnail,
                comicGenres: comicInfo.comicGenres,
                slug
            });
        }

    }, [comicInfo])

    useEffect(() => {
        (async () => {
            const rawResponse = await fetch(`${DOMAIN_NAME_SERVER}/api/en/comic-detail-info`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slug, id })
            });
            const content = await rawResponse.json();
            console.log({ slug, id });
            console.log("Update new data");
            setComicInfo(content);
        })();
        return () => {
            console.log("Clear old data");
            setComicInfo([]);
        }
    }, [slug, id]);

    return (
        <div className={style.comicDetail}>
            <div className={style.blurBackground}>
                <img src={comicInfo.blurThumbnail} alt="" />
                <div className={style.comicImgMask}></div>
            </div>

            {/* Comic infor */}
            <div className={`${style.comicContainer} ${style.comicRender} container`}>
                <div className="breadcrumb"></div>
                <div className={style.comicInfo}>
                    <div style={{ margin: "1.5rem" }}>
                        <div className={style.leftSide}>
                            <img src={comicInfo.thumbnail ? comicInfo.thumbnail : LODING_GIFT} alt={comicInfo.comicName} />
                        </div>
                        <div className={style.rightSide}>
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
                            <div className={style.comicDescript}>
                                <p>
                                    {comicInfo.comicDescription}
                                </p>
                            </div>
                        </div>
                        <div className={style.clear}></div>
                        <div className="btnList"></div>
                    </div>
                </div>
            </div>

            {/* Chapter List */}
            <div className={`${style.comicContainer} ${style.comicList} container`}>
                <Tabs
                    defaultActiveKey="chapters"
                    id="uncontrolled-tab-example"
                    className="mb-3">
                    <Tab eventKey="chapters" title="Chapters">
                        {
                            Object.keys(comicInfo).length > 0 ?
                                <>
                                    <div className={style.chapterBannerLine}>
                                        <h5>
                                            {comicInfo.comicChapterList ? `Chapters up to Chapter ${comicInfo.comicChapterList.length}` : null}
                                            <span className={style.updateDetail}>{comicInfo.updateDetail}</span>
                                        </h5>

                                    </div>
                                    <div className={style.chapterList}>
                                        <Row>
                                            {
                                                comicInfo.comicChapterList ?
                                                    comicInfo.comicChapterList.map((chapter, index) => {
                                                        return <Col key={index} xs={4} className={style.chapterBox}><ComicChapterCart {...chapter} /></Col>
                                                    })
                                                    :
                                                    null
                                            }

                                        </Row>
                                    </div>
                                </> : <ComicLoading />
                        }
                    </Tab>
                    <Tab eventKey="profile" title="Comments">
                        <h5 style={{ textAlign: "center", margin: "1.5rem" }}>No Comments</h5>
                    </Tab>
                </Tabs>

            </div>

            {/* For you Section */}
            <div className={`${style.comicContainer} ${style.comicForYou} container`}>

                <Row>
                    <Col xs={12}><h3 className={style.headerRecommend}>For You</h3></Col>
                </Row>
                <Row>
                    {
                        comics.length > 0 ?
                            comics.map((comic, index) => {
                                return (<Col key={index} xs={2} style={{ margin: "10px 0" }}><ComicCart {...comic} /></Col>)
                            })
                            : <Col xs={12} style={{ maxHeight: "15rem", textAlign: "center" }} ><ComicLoading /></Col>
                    }

                </Row>

            </div>

        </div>
    )
}
