import React, { useEffect, useState } from "react";
import "./styles/billing.css";
import TopBar from "../../common/components/topbar";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addStore } from "../../actions/storeActions";
import { BillingPlan, BillingYearly, getTenantStore } from "../../services";
import { useDispatch, useSelector } from "react-redux";

// const BillingPage = ({ user, walletAddress, walletBalance, addStore }) => {
const BillingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [Allplans, setAllplans] = useState([]);
  const [monthlyPlan, setmonthlyPlan] = useState([]);
  const [yearlyPlan, setyearlyPlan] = useState([]);

  const { store } = useSelector((state) => state.store);

  useEffect(() => {
    BillingPlan(setmonthlyPlan, store?.token);
    BillingYearly(setyearlyPlan, store?.token);
  }, []);
  // useEffect(() => {
  //   setmonthlyPlan(Allplans.filter(item=>item.billingCycle=="monthly"))
  //   setyearlyPlan(Allplans.filter(item=>item.billingCycle=="yearly"))
  // }, [Allplans]);
  // console.log(Allplans);

  return (
    <div className="billingpageContainer">
      <TopBar topicons={false} />
      <div className="billingPageMainContainer">
        <div className="billingPageHeading1">Select Your Plan</div>
        <div className="billingPageHeading2">
          Select your plan according to your needs
        </div>
        <div className="billingPeriodContainer">
          <div
            onClick={() => {
              setBillingPeriod("monthly");
            }}
            className={`billingPeriod ${
              billingPeriod === "monthly" && "billingPeriod--active"
            }`}
          >
            Monthly
          </div>
          <div
            // className='billingPeriod'
            onClick={() => {
              setBillingPeriod("annual");
            }}
            className={`billingPeriod ${
              billingPeriod === "annual" && "billingPeriod--active"
            }`}
          >
            Annual
          </div>
        </div>
        {billingPeriod === "monthly" ? (
          <div className="plansContainer">
            {monthlyPlan?.map((item, key) => {
              return (
                <NavLink to="/my-store/general-settings" className="plansEach">
                  <div className="plansEachCircle"></div>
                  <div className="plansHeading">{item.planName}</div>
                  <div className="plansHeading2">
                    ${item.price}/{item.billingCycle}
                  </div>
                  <div className="chooseplanButton">CHOOSE PLAN</div>
                  <div className="planFeature">{item.description}</div>
                  {/* <div className="planFeature">Lorem ipsum dolor sit</div>
                  <div className="planFeature">Lorem ipsum dolor sit</div> */}
                </NavLink>
              );
            })}
            <div className="Nodata">
              {monthlyPlan?.length == 0 && (
                <div className="Nodata"> No Data</div>
              )}
            </div>
          </div>
        ) : (
          <div className="plansContainer">
            {yearlyPlan?.map((item, key) => {
              return (
                <NavLink to="/my-store/general-settings" className="plansEach">
                  <div className="plansEachCircle"></div>
                  <div className="plansHeading">{item.planName}</div>
                  <div className="plansHeading2">
                    ${item.price}/{item.billingCycle}
                  </div>
                  <div className="chooseplanButton">CHOOSE PLAN</div>
                  <div className="planFeature">{item.description}</div>
                  {/* <div className="planFeature">Lorem ipsum dolor sit</div>
                  <div className="planFeature">Lorem ipsum dolor sit</div> */}
                </NavLink>
              );
            })}

            <div className="Nodata">
              {yearlyPlan?.length == 0 && (
                <div className="Nodata"> No Data</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     user: state.user.user,
//     walletAddress: state.user.walletAddress,
//     walletBalance: state.user.walletBalance,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addStore: data => dispatch(addStore(data)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BillingPage);
export default BillingPage;
