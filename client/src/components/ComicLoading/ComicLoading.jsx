import React from 'react'

export default function ComicLoading() {
    const SNAIL_LOADING_GIFT = "https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700";
    return (
        <div style={{ maxHeight: "15rem", textAlign: "center" }}><img src={SNAIL_LOADING_GIFT} alt='' style={{ maxHeight: "100%", height: "15rem" }} /></div>
    )
}
