import React from 'react'
import { memo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import style from "./ComicPagination.module.css"

function ComicPagination({ currentpage, totalpage,onChangePage }) {

  currentpage = Number(currentpage);

  let items = [];
  // console.log({ currentpage, totalpage });

  if (currentpage > 1) {
    items.push(<Pagination.First key="first" onClick={()=>onChangePage(1)} />)
    items.push(<Pagination.Prev key="prev" onClick={()=>onChangePage(currentpage - 1)}></Pagination.Prev>);
  }

  let page = currentpage > 5 ? currentpage - 3 : 1;
  for (; page <= currentpage + 3 && page <= totalpage; page++) {
    let t = page;
    items.push(
        <Pagination.Item active={page === currentpage} key={page} onClick={()=>onChangePage(t)}>
          {page}
        </Pagination.Item>
    )
  }

  if (currentpage < totalpage) {
    items.push(<Pagination.Next key="next" onClick={()=>onChangePage(currentpage + 1)} />);
  }

  return (
    <Pagination>
      {items}
    </Pagination>
  )
}

export default memo(ComicPagination);