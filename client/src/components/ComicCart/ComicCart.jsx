import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FaHotjar } from "react-icons/fa";

import style from "./ComicCart.module.css";
import { Helper } from '../../Helper';

export default function ComicCart(comic) {

  return (
    <Link to={`/comic/${comic.slug}/${comic.id}`} className={style.comicLink}>
      <Card style={{ width: '12rem' }}>
        <Card.Img variant="top" src={comic.thumbnail} height="235px" width="175px" />
        <Card.Body>
          {/* <Card.Text className={style.comicName}>{comic.comicName}</Card.Text> */}
          <p className={style.comicName}>{comic.comicName}</p>
          <p className={style.comicGenres}>{comic.comicGenres}</p>
          {
            comic.comicHotCount ? <><p className={style.comicHotCount}><FaHotjar className={style.hotIcon}/>{comic.comicHotCount}</p></> : null
          }
          <Button style={{ width: "100%" }} variant="primary">Read</Button>
        </Card.Body>
      </Card>
    </Link>
  )
}
