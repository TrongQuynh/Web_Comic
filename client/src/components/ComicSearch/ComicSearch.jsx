import React from 'react'
import { useParams } from 'react-router-dom'

export default function ComicSearch() {

    const { search } = useParams();

    return (
        <div>ComicSearch</div>
    )
}
