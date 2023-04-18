import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ComicCart from './ComicCart';

import style from "./ComicList.module.css";

import {FaAngleRight} from "react-icons/fa";

const DOMAIN_NAME_SERVER = require("../../Helper/domain").domain.name;


export default function ComicList() {
  // const DOMAIN_NAME_SERVER = "http://localhost:8080/";
  const [comicTypes, setComicTypes] = useState([]);

  useEffect(() => {
    fetch(`${DOMAIN_NAME_SERVER}/api/en/comic-home-page`).then(res => res.json())
      .then(data => {
        console.log(data);
        setComicTypes(data);
        return data;
      })


  }, []);

  return (
    <div className='container'>
      {
        comicTypes.map((comicType, index) => {
          return (
            <Container key={index} style={{ margin: "50px 0" }}>
              <Row>
                <Col xs={11}><h3 className={style.collectionName}>{comicType.type}</h3></Col>
                <Col xs={1}><p className={style.btnMore}>More</p><FaAngleRight /></Col>
              </Row>
              <Row>
                {comicType.comicList.map((comic, index) => {
                  return (
                    <Col xs={2} key={comic.id}><ComicCart {...comic} /></Col>
                  )
                })}
              </Row>
            </Container>
          )
        })
      }
    </div>
  )
}
