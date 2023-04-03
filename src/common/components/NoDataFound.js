import React from "react";

function NoDataFound({className}) {
  return (
    <div className={`w100 dflex justcenter ${className}`}>
      <div> No Data Found</div>
    </div>
  );
}

export default NoDataFound;
