import ReactPaginate from "react-paginate";
import { useState } from "react";

import classes from "./Pagination.module.css";
import { Score } from "../../types/types";

type ItemListProps = {
  scoreData: Score[];
};

function ItemList({ scoreData }: ItemListProps) {
  return (
    <ul>
      {scoreData &&
        scoreData.map((data: Score, index: number) => {
          return (
            <li key={index}>
              <div className={classes.score_entry}>
                <p>
                  {index + 1}. {data.name}
                </p>
                <p>{data.score} Städte</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

type PaginationProps = {
  itemsPerPage: number;
  items: Score[];
};

function Pagination({ itemsPerPage, items }: PaginationProps) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  function handlePageClick(event: any): void {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  }

  return (
    <div className={classes.score_content}>
      <ItemList scoreData={currentItems} />
      {itemsPerPage > 7 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<<"
          className={classes.pagination_container}
          activeClassName={classes.active_page}
        />
      )}
    </div>
  );
}

export default Pagination;
