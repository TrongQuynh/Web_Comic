import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap/esm'
import style from "./ComicSheet.module.css";
import ComicCart from '../ComicCart/ComicCart';
import { Helper } from '../../Helper';
import ComicLoading from '../ComicLoading/ComicLoading';

export default function ComicSheet() {
  const helper = new Helper();
  const [comics, setComics] = useState([]);
  const [isShowFavorite, setIsShowFavorite] = useState(true);
  useEffect(() => {
    setComics(helper.getLocalStorage("comics"));
  }, []);

  return (
    <div className={`${style.comicContainer} container`}>
      <div className={style.libraryHeader}>
        <h4 style={{ textAlign: "center" }}>Library</h4>
        <div className={style.subHeader}>
          <div>
            <ul>
              <li onClick={() => setIsShowFavorite(true)} className={isShowFavorite ?style.tabActive : null}>
                Favorite
              </li>
              <li>
                <div className={style.sliceDevider}></div>
              </li>
              <li onClick={() => setIsShowFavorite(false)} className={!isShowFavorite ?style.tabActive : null}>
                Recent
              </li>
            </ul>
          </div>
        </div>
      </div>

      {
        isShowFavorite ?
          <div className={`${style.libraryContainer} ${style.favorSide}`}>
            <img src="/emptyBox.webp" alt="" />
            <p>Log in to view Favorited comics.</p>
            <span className={style.btnLogin}>Log in</span>
          </div>
          :
          <div className={`${style.libraryContainer} ${style.recentSide}`}>
            <div className={style.totalHeader}>
              <span>{comics ? comics.length : 0}</span> Comics
            </div>
            <div className={style.comicList}>
              <Row>

                {
                  comics ?
                    comics.map((comic, index) => {
                      return (
                        <Col key={index} xs={2}>
                          <ComicCart {...comic} />
                        </Col>
                      )
                    }) : <Col xs={12}> No comics Here </Col>
                }
              </Row>
            </div>
          </div>
      }

    </div>
  )
}
