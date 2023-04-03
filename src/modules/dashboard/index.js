import React, { useEffect, useState } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import "./styles/dashboard.css";
import Navbar from "../../common/components/navbar";
import TopBar from "../../common/components/topbar";
import {
  getTopCollections,
  getTopNfts,
  getTotalNftCreated,
  getTotalRevenue,
  getTotalUserCount,
  getSoldNftCount,
  getSoldNftGraph,
} from "../../services";
import AssetProfilePic from "../../assets/profile3.jpeg";
import { ResponsiveLine } from "@nivo/line";
import { connect } from "react-redux";
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import Chart from "react-apexcharts";
import { defaultAssetImage, momentDate, momentDate3 } from "../../utility";
import Pagination from "../../common/components/Pagination";

const DashBoard = ({ authToken }) => {
  const [totalRevenue, setTotalRevenue] = useState("");
  const [totalNftSold, setTotalNftSold] = useState("");
  const [totalUserCount, setTotalUserCount] = useState("");
  const [totalNftCreated, setTotalNftCreated] = useState("");
  const [topNfts, setTopNfts] = useState([]);
  // const [graphData, setGraphData] = useState([]);
  const [topCollections, setTopCollections] = useState([]);
  const [graphPeriod, setGraphPeriod] = useState(1);

  //  Pagination
  const [showLimitedRows, setShowLimitedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [clickedPage, setClickedPage] = useState(1);
  const rowsInPage = 8;
  const changePage = (clicked) => {
    setClickedPage(clicked);
  };

  // --- Top Collection pagination

  const [showLimitedRowsCol, setShowLimitedRowsCol] = useState([]);
  const [totalPagesCol, setTotalPagesCol] = useState(0);
  const [clickedPageCol, setClickedPageCol] = useState(1);
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setyAxisData] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false,
      },
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      // categories: xAxisData,
    },
    fill: {
      colors: "#016DD9",
      opacity: 0.5,
      type: "gradient",
      gradient: {
        shade: "normal",
        type: "vertical",
        shadeIntensity: 0.7,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.75,
        opacityTo: 0,
        stops: [0, 99.9, 100],
        colorStops: [],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [90, 40, 45, 50, 49, 60, 70, 91],
      // data: yAxisData,
    },
  ]);
  // useSTate
  const rowsInPageCol = 8;
  const changePageCol = (clicked) => {
    setClickedPageCol(clicked);
  };

  useEffect(() => {
    const responseData = topCollections;
    const totalPages = Math.ceil(responseData.length / rowsInPageCol);
    setTotalPagesCol(totalPages);
    setShowLimitedRowsCol(responseData.slice(0, rowsInPageCol));
  }, [topCollections]);

  useEffect(() => {
    const responseData = topCollections;
    const start = (clickedPageCol - 1) * rowsInPageCol;
    const end = clickedPageCol * rowsInPageCol;
    setShowLimitedRowsCol(responseData.slice(start, end));
  }, [clickedPageCol]);

  // -----------------

  useEffect(async () => {
    await getTotalRevenue(setTotalRevenue);
    await getSoldNftCount(setTotalNftSold);
    await getTotalUserCount(setTotalUserCount, authToken);
    await getTotalNftCreated(setTotalNftCreated);
    await getTopNfts(setTopNfts);
    await getTopCollections(setTopCollections);
    // await getSoldNftGraph();
    const graph = await getSoldNftGraph(graphPeriod);
    let xdata = [];
    let ydata = [];
    graph.map((item) => {
      xdata.push(item.addedOn);
      ydata.push(parseFloat(item.totalVolume).toFixed(2));
    });
    setXAxisData(xdata);
    // setYAxisData(ydata)
    console.log(graph, "<<<<graph");
    setSeries([{ ...series, data: ydata }]);
    // setSeries([
    //   {
    //     ...series,
    //     data: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    //   },
    // ]);
    // setOptions({ ...options, categories: xdata });
    setOptions({
      ...options,
      xaxis: { categories: xdata },
    });
  }, [graphPeriod]);
  // ---

  useEffect(() => {
    const responseData = topNfts;
    const totalPages = Math.ceil(responseData.length / rowsInPage);
    setTotalPages(totalPages);
    setShowLimitedRows(responseData.slice(0, rowsInPage));
  }, [topNfts]);

  useEffect(() => {
    const responseData = topNfts;
    const start = (clickedPage - 1) * rowsInPage;
    const end = clickedPage * rowsInPage;
    setShowLimitedRows(responseData.slice(start, end));
  }, [clickedPage]);

  // graphEffect
  // useEffect(async () => {
  //   const graph = await getSoldNftGraph();
  //   if (graphPeriod === '1m') {
  //     const Data = {
  //       xaxis: graph.threeMonth.map(item => momentDate3(item._id.addedOn)),
  //       yaxis: graph.threeMonth.map(item => item.totalVolume),
  //     };
  //     setOptions({
  //       ...options,
  //       xaxis: { categories: Data.xaxis },
  //     });
  //     setSeries([
  //       {
  //         ...series,
  //         data: Data.yaxis,
  //       },
  //     ]);
  //     console.log({ Data });
  //   } else if (graphPeriod === '6m') {
  //     const Data = {
  //       xaxis: graph.sixMonth.map(item => momentDate3(item._id.addedOn)),
  //       yaxis: graph.sixMonth.map(item => item.totalVolume),
  //     };
  //     setOptions({
  //       ...options,
  //       xaxis: { categories: Data.xaxis },
  //     });
  //     setSeries([
  //       {
  //         ...series,
  //         data: Data.yaxis,
  //       },
  //     ]);
  //     console.log({ Data });
  //   } else if (graphPeriod === '1y') {
  //     const Data = {
  //       xaxis: graph.Year.map(item => momentDate3(item._id.addedOn)),
  //       yaxis: graph.Year.map(item => item.totalVolume),
  //     };
  //     setOptions({
  //       ...options,
  //       xaxis: { categories: Data.xaxis },
  //     });
  //     setSeries([
  //       {
  //         ...series,
  //         data: Data.yaxis,
  //       },
  //     ]);
  //     console.log({ Data });
  //   }
  // }, [graphPeriod]);

  // apex char graph stuff

  // console.log(series);
  return (
    <div className="dashboardContainer">
      <TopBar activepage={"dashboard"} />
      <div className="dashboardMainContainer">
        <Navbar activepage={"dashboard"} />
        <div className="dashBoardInnerContainer">
          <div className="myStoreHeading1 dashboard-div">
            Dashboard
          </div>
          <div className="statisticsContainer">
            <div className="statisticsEach statisticsEach1">
              <div className="staticTitle">Total NFT created</div>
              <div className="staticNumber">{totalNftCreated?.length!==0 ? totalNftCreated :0}</div>
            </div>
            <div className="statisticsEach statisticsEach2">
              <div className="staticTitle">Total NFT sold</div>
              <div className="staticNumber">{totalNftSold?.length !==0 ? totalNftSold :0}</div>
            </div>
            <div className="statisticsEach statisticsEach3">
              <div className="staticTitle">Total Revenue</div>
              <div className="staticNumber">{totalRevenue?.length!==0 ? totalRevenue :0}</div>
            </div>
            <div className="statisticsEach statisticsEach4">
              <div className="staticTitle">Total Users</div>
              <div className="staticNumber">{totalUserCount?.length!==0 ? totalUserCount :0}</div>
            </div>
          </div>
          <div
            className="myStoreHeading1"
            style={{ paddingTop: " 4.722222222222222vh" }}
          >
            NFT Sold
          </div>
          <div className="graphContainer">
            <div className="graphTimePeriod">
              <div
                className={`graphTimePeriodEach ${
                  graphPeriod === "1m" && "graphTimePeriodEach--active"
                }`}
                onClick={() => setGraphPeriod(1)}
              >
                1 M
              </div>
              <div
                className={`graphTimePeriodEach ${
                  graphPeriod === "6m" && "graphTimePeriodEach--active"
                }`}
                onClick={() => setGraphPeriod(6)}
              >
                6 M
              </div>
              <div
                className={`graphTimePeriodEach ${
                  graphPeriod === "1y" && "graphTimePeriodEach--active"
                }`}
                onClick={() => setGraphPeriod(12)}
              >
                1 Y
              </div>
            </div>
            <div className="dashbordGraphContainer">
              {/* {MyResponsiveLine()} */}
              <Chart
                options={options}
                series={series}
                type="area"
                width="96%"
                height="100%"
              />
            </div>
          </div>
          <div className="myStoreHeading1">Top Collections</div>
          <div className="dashBoardTopCollectionListContainer ">
            <div className="dashBoardTopCollectionHeaderContainer">
              <div className="dashBoardTopCollectionListColumn1">
                <div className="manageContentListColumntitle">Collection</div>
              </div>
              <div className="dashBoardTopCollectionListColumn2">
                <div className="manageContentListColumntitle">Volume</div>
              </div>
              <div className="dashBoardTopCollectionListColumn3">
                <div className="manageContentListColumntitle">Owners</div>
              </div>
              <div className="dashBoardTopCollectionListColumn4">
                <div className="manageContentListColumntitle">Items</div>
              </div>
            </div>
            {showLimitedRowsCol.map((item, key) => (
              <div
                className="dashBoardTopCollectionHeaderContainer"
                key={item._id}
                style={{ background: key % 2 == 0 && "#00000014" }}
              >
                <div className="dashBoardTopCollectionListColumn1 words-break">
                  {/* <img src={AssetProfilePic} alt='' /> */}
                  <img
                    src={
                      item?.collection[0]?.imageUrl !== ""
                        ? item?.collection[0]?.imageUrl
                        : defaultAssetImage
                    }
                    alt=""
                  />
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {/* King of seven seas */}
                    {item?.collection[0]?.name}
                  </div>
                </div>
                <div className="dashBoardTopCollectionListColumn2">
                  <div className="manageContentListColumntitle manageContentgrey">
                    {item?.totalVolume}
                  </div>
                </div>
                <div className="dashBoardTopCollectionListColumn3">
                  <div className="manageContentListColumntitle manageContentgrey ">
                    {item?.collection[0]?.owner.length}
                  </div>
                </div>
                <div className="dashBoardTopCollectionListColumn4">
                  <div className="manageContentListColumntitle manageContentgrey">
                    {item?.items}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPagesCol} changePage={changePageCol} />
          <div className="myStoreHeading1">Top NFTs</div>
          <div className="dashBoardTopCollectionListContainer dashBoardLastTable">
            <div className="dashBoardTopCollectionHeaderContainer">
              <div className="dashBoardTopNftsListColumn1">
                <div className="manageContentListColumntitle">Name</div>
              </div>
              <div className="dashBoardTopNftsListColumn2">
                <div className="manageContentListColumntitle">Price</div>
              </div>
              <div className="dashBoardTopNftsListColumn3">
                <div className="manageContentListColumntitle">Likes</div>
              </div>
            </div>
            {/* {
            [
              {
                content: {
                  name: "asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj",
                },
              },
              {
                content: {
                  name: "asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj",
                },
              },
              {
                content: {
                  name: "asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj asdlkfjlasjdflkasjdflajsdlkfjalksdjflasdkj",
                },
              },
            ].map((item, key) => ( */}
            {showLimitedRows.map((item,key) => (
              <div
                className="dashBoardTopCollectionHeaderContainer"
                key={item?._id}
                style={{ background: key % 2 == 0 && "#00000014" }}
              >
                <div className="dashBoardTopNftsListColumn1">
                  <img
                    width="40px"
                    height="40px"
                    src={
                      item?.content?.imageUrl !== ""
                        ? item?.content?.imageUrl
                        : defaultAssetImage
                    }
                    alt=""
                  />
                  <div className="manageContentListColumntitle manageContentgrey words-break">
                    {item?.content?.name}
                  </div>
                </div>
                <div className="dashBoardTopNftsListColumn2">
                  <div className="manageContentListColumntitle manageContentgrey">
                    {`${item?.content?.salesInfo?.price} 
                    
                    ${item?.content?.salesInfo?.currency}`}
                  </div>
                </div>
                <div className="dashBoardTopNftsListColumn3">
                  <div className="manageContentListColumntitle manageContentgrey">
                    {item?.likes?.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} changePage={changePage} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.store.store.token,
  };
};

export default connect(mapStateToProps)(DashBoard);

// nevo graph data
// const [data, setData] = useState([
//   {
//     id: 'france',
//     color: 'hsl(240,100%,50%)',
//     data: [
//       {
//         x: 'plane',
//         y: 91,
//       },
//       {
//         x: 'helicopter',
//         y: 97,
//       },
//       {
//         x: 'boat',
//         y: 268,
//       },
//       {
//         x: 'train',
//         y: 203,
//       },
//       {
//         x: 'subway',
//         y: 239,
//       },
//       {
//         x: 'bus',
//         y: 157,
//       },
//       {
//         x: 'car',
//         y: 279,
//       },
//       {
//         x: 'moto',
//         y: 104,
//       },
//       {
//         x: 'bicycle',
//         y: 2,
//       },
//       {
//         x: 'horse',
//         y: 168,
//       },
//       {
//         x: 'skateboard',
//         y: 82,
//       },
//       {
//         x: 'others',
//         y: 6,
//       },
//     ],
//   },
// ]);

// <ResponsiveLine
//               data={data}
//               margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//               xScale={{ type: 'point' }}
//               yScale={{
//                 type: 'linear',
//                 min: 'auto',
//                 max: 'auto',
//                 stacked: true,
//                 reverse: false,
//               }}
//               yFormat=' >-.2f'
//               curve='natural'
//               axisTop={null}
//               axisRight={null}
//               axisBottom={{
//                 orient: 'bottom',
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//                 legend: 'transportation',
//                 legendOffset: 36,
//                 legendPosition: 'middle',
//               }}
//               axisLeft={{
//                 orient: 'left',
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//                 legend: 'count',
//                 legendOffset: -40,
//                 legendPosition: 'middle',
//               }}
//               colors={{ scheme: 'category10' }}
//               pointSize={10}
//               pointColor={{ theme: 'background' }}
//               pointBorderWidth={2}
//               pointBorderColor={{ from: 'serieColor' }}
//               pointLabelYOffset={-12}
//               enableArea={true}
//               enableCrosshair={false}
//               useMesh={true}
//               // legends={[]}
//             />
