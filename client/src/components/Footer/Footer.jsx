import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaFacebook, FaYoutube, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import style from "./Footer.module.css";

export default function Footer() {
    return (
        <div style={{ background: "#E8EAEC", margin: "0px" }}>
            <div className="container" style={{ textAlign: "center" }}>
                <Container>
                    <Row>
                        <Col xs={12}><h3>Daily Picks</h3></Col>
                    </Row>
                    <Row style={{ textAlign: "center", width: "365px", margin: "auto" }}>
                        <Col xs={3}><FaFacebook className={style.footerIcon} /></Col>
                        <Col xs={3}><FaYoutube className={style.footerIcon} /></Col>
                        <Col xs={3}><FaTwitter className={style.footerIcon} /></Col>
                        <Col xs={3}><FaInstagramSquare className={style.footerIcon} /></Col>
                    </Row>
                    <Row>
                        <p className={style.innerLink}>
                            <a href="https://comicscreator.webcomicsapp.com/#/home">Publish</a>
                            <i></i>
                            <a href="/server/service">Terms</a>
                            <i></i>
                            <a href="/server/privacy">Privacy</a>
                            <i></i>
                            <a href="/wiki/All/1">Wiki</a>
                            <i></i>
                            <a href="/keywords/AA/1">Keyword</a>
                            <i></i>
                            <a href="/tags">Tags</a>
                            <i></i>
                            <a href="/site">Sitemap</a>
                            <i></i>
                            <a href="https://blog.webcomicsapp.com/" rel="noreferrer" target="_blank">Blog</a>
                        </p>
                    </Row>
                    <Row>
                        <Col xs={12} className={style.logo}>Han Comics</Col>
                    </Row>
                    <Row style={{paddingBottom:"20px"}}></Row>
                </Container>
            </div>
        </div>
    )
}
