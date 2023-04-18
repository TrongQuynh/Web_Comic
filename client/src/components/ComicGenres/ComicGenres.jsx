import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'

import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import ComicCart from '../ComicCart/ComicCart'
import ComicLoading from '../ComicLoading/ComicLoading'
import ComicPagination from '../Pagination/ComicPagination'
import style from './ComicGenres.module.css'

const DOMAIN_NAME_SERVER = require("../../Helper/domain").domain.name;

export default function ComicGenres() {
  // const DOMAIN_NAME_SERVER = "http://localhost:8080";
  const { category, filter, sortBy, page } = useParams();
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);
  const [genres, setGenres] = useState([]);

  const paginationData = {
    currentpage: page,
    totalpage: 119
  }

  useEffect(() => {
    (async () => {
      const rawRespone = await fetch(`${DOMAIN_NAME_SERVER}/api/en/comic-genres/${category}/${filter}/${sortBy}/${page}`);
      const data = await rawRespone.json();
      setComics(data);
    })()
    return () => {
      setComics([]);
    }
  }, [category, filter, sortBy, page])

  useEffect(() => {
    (async () => {
      const rawRespone = await fetch(`${DOMAIN_NAME_SERVER}/api/en/comic-genres-list`);
      const data = await rawRespone.json();
      console.log(data);
      console.log(category);
      setGenres(data);
    })()
  }, [])

  const onChangePage = useCallback((page)=>{
    console.log("Re-render Onchange Page");
    navigate(`/genres/${category}/${filter}/${sortBy}/${page}`);
  },[page]);

  return (
    <div className={`${style.comicContainer} container`}>
      <div className={style.leftSide}>
        <div className={style.leftHeader}>
          <h5>Gerens</h5>
        </div>
        <ul>
          {
            genres.length > 0 ?
              genres.map((genre, index) => {
                // console.log(`${genre} - ${category}: ${genre === category}`)
                return <li key={index}>
                  <Link to={`/genres/${genre}/${filter}/${sortBy}/1`} className={genre === category ? style.active : null}>{genre}</Link>
                </li>
              })
              : null
          }

        </ul>
      </div>
      <div className={style.rightSide}>
        <div className={style.categoryFilter}>
          <div className={`${style.filterPart} ${style.filter}`}>
            <span>Filter By: </span>
            {
              ["All", "Ongoing", "Completed"].map((fil, index) => <Link key={index} to={`/genres/${category}/${fil}/${sortBy}/1`} className={filter === fil ? style.filterActive : null}>{fil}</Link>)
            }

          </div>
          <div className={style.splitDevider}></div>
          <div className={`${style.filterPart} ${style.sort}`}>
            <span>Sort By: </span>
            {
              ["Popular", "Length", "Likes", "Latest Updated", "Newest"].map((el, index) => <Link key={index} to={`/genres/${category}/${filter}/${el}/1`}
                className={sortBy === el ? style.filterActive : null}>{el}</Link>)
            }
          </div>
        </div>
        <div className="categoryList">
          <Container style={{ margin: "20px 0" }}>
            {
              comics.length > 0 ? <>
                <Row>
                  {
                    (comics.map((comic) => (<Col key={comic.id} className={style.colItem} xs={3}><ComicCart {...comic} /></Col>)))
                  }
                </Row>
                {/* Pagination */}
                <Row>
                  <Col xs={12}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ display: "inline-block" }}>
                        <ComicPagination {...paginationData} onChangePage={onChangePage}/>
                      </div>
                    </div>
                  </Col>
                </Row>
              </> :
                <Row>
                  <Col xs={12}>
                    <ComicLoading />
                  </Col>
                </Row>

            }

          </Container>
        </div>
      </div>
      <div className={style.clear}></div>


    </div>
  )
}
