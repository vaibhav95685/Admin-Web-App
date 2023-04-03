import React, { useState } from "react";
import leftarrow from "../../assets/images/leftarrow.svg";
import rightarrow from "../../assets/images/rightarrow.svg";
function Pagination({ totalPages = 0, changePage = () => {} }) {
  const [clickedBut, setClickedBut] = useState(1);
  let showPage = [];
  const setTheData = () => {
    for (let i = 1; i <= totalPages; ++i) {
      showPage.push(i);
    }
  };
  setTheData();
  console.log(totalPages, "<<<pagination");
  return (
    <>
      {totalPages != 1 && totalPages != 0 && (
        <div className=" w100 pagination bgwhite mt14 ">
          <div className="dflex-end  mr14">
            <img src={rightarrow} className="curspointer" />
            {Array.from(Array(totalPages).keys()).map((item, key) => {
              return (
                <div
                  className={`paginationnumber ${
                    clickedBut == item + 1
                      ? "bgblue textwhite"
                      : "bgwhite textcol7e"
                  }`}
                  key={key}
                  onClick={() => {
                    changePage(item + 1);
                    setClickedBut(item + 1);
                  }}
                >
                  {item + 1}
                </div>
              );
            })}
            <img
              className="curspointer"
              src={leftarrow}
              onClick={() => {
                // alert("ll");
                if (clickedBut != Array.from(Array(totalPages).keys()).length) {
                  changePage(clickedBut + 1);

                  setClickedBut(clickedBut + 1);
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
