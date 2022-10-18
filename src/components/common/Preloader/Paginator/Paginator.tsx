import s from "./Paginator.module.css";
import React, { useState } from "react";
import cn from "classnames";

type PropsType = {
  onPageChanged?: (pageNumber: number) => void;
  currentPage?: number;
  totalUsersCount: number;
  pageSize: number;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  onPageChanged = () => {},
  currentPage = 1,
  totalUsersCount,
  pageSize,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  // let curP = props.currentPage;
  // let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
  // let curPL = curP + 5;
  // let slicedPages = pages.slice( curPF, curPL);

  return (
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              className={cn(
                {
                  [s.selectedPage]: currentPage === p,
                },
                s.pageNumber
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
