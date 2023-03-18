import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import ComicCartRanking from '../ComicCart/ComicCartRanking'
import ComicLoading from '../ComicLoading/ComicLoading';
import style from "./ComicRanking.module.css"
import { useParams } from 'react-router-dom';

export default function ComicRanking({isSearch}) {

    const DOMAIN_NAME_SERVER = "http://localhost:8080";
    const { search } = useParams();
    const [comics, setComics] = useState([]);
    console.log("re-render serach")
    useEffect(() => {
        (async () => {
            const rawRespone = await fetch(`${DOMAIN_NAME_SERVER}/api/en/${isSearch ? `comic-search/${search}` : "comic-in-ranking"}`);
            const data = await rawRespone.json();
            setComics(data);
        })();
    }, [search]);
    return (
        <div className={`${style.comicContainer} container`}>
            <div className={style.breadcrumb}>
                <span className={style.breadcrumb_Home}>Home</span> 
                <FaAngleRight className={style.arrowIcon} /> 
                <span className={style.currentBreadcrumb}>{isSearch ? "Search" : "Ranking"}</span>
            </div>
            <div className="comicList">
                <Row>
                    {
                        comics.length > 0 ?
                            comics.map((comic, index) => {
                                return (
                                    <Col xs={6} key={index}>
                                        <ComicCartRanking {...comic} />
                                    </Col>
                                )
                            })
                            :
                            <Col xs={12} >
                                <ComicLoading />
                            </Col>
                    }

                </Row>
            </div>
        </div>
    )
}
