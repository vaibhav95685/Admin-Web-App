import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BillingPlan, BillingYearly } from "../../services";
import "./styles/myStore.css";
import "./styles/myStoreBilling.css";
import { useDispatch, useSelector } from "react-redux";

const Billing = () => {
  const [upgradePlan, setUpgradePlan] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [activePlan, setActivePlan] = useState("basic-monthly");
  const [Allplans, setAllplans] = useState([]);
  const [monthlyPlan, setmonthlyPlan] = useState([]);
  const [yearlyPlan, setyearlyPlan] = useState([]);
  const { store } = useSelector((state) => state.store);
  useEffect(() => {
    BillingPlan(setmonthlyPlan, store?.token);
    BillingYearly(setyearlyPlan, store?.token);
    // BillingYearly(setyearlyPlan, store?.token);
  }, []);
  useEffect(() => {
    // BillingPlan(setmonthlyPlan, store?.token);
  }, []);
  console.log(Allplans);
  // useEffect(() => {
  //   setmonthlyPlan(Allplans?.filter((item) => item?.billingCycle == "monthly"));
  //   setyearlyPlan(Allplans?.filter((item) => item?.billingCycle == "yearly"));
  // }, [Allplans, yearlyPlan]);
  console.log(Allplans);

  return (
    <div className="myStoreFormContainer">
      {upgradePlan === false && (
        <div className="myStoreBillingPage">
          <div className="myStoreHeading1">Billing</div>
          <div className="billingDetailsContainer">
            <div className="billingDetails">
              <div className="billingDetailsTitle">Current Plan</div>
              <div className="billingDetailscontent">Standard Monthly</div>
            </div>
            <div className="billingDetails">
              <div className="billingDetailsTitle">Amount</div>
              <div className="billingDetailscontent">$50</div>
            </div>
            <div className="billingDetails">
              <div className="billingDetailsTitle">Next Billing Amount</div>
              <div className="billingDetailscontent">$50</div>
            </div>
            <div className="billingDetails">
              <div className="billingDetailsTitle">Next Billing Date</div>
              <div className="billingDetailscontent">12/02/22</div>
            </div>
          </div>
          <div className="formsecondarytext billingSecondaryText">
            For premium features upgrade your plan
          </div>
          <div
            className="myStoreBillingsaveButtonContainer"
            style={{ marginTop: "2.0370370370370368vh" }}
          >
            <div
              className="myStoreBillingsaveButton upgradePlanButton "
              onClick={() => setUpgradePlan(true)}
            >
              Upgrade Plan
            </div>
          </div>
        </div>
      )}
      {upgradePlan === true && (
        <div className="myStoreUpgradeBillingContainer">
          <div className="myStoreHeading1 upgradeyourplan">
            Upgrade your Plan
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
              // className="billingPeriod"
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
              {monthlyPlan.map((item, key) => {
                return (
                  <NavLink
                    to="/my-store/general-settings"
                    // className="plansEach"
                    className={`plansEach  ${
                      activePlan === "basic-annual" && "plansEach-active"
                    }`}
                  >
                    <div className="plansEachCircle"></div>
                    <div
                      className={`plansHeading  ${
                        activePlan === "basic-annual" && "plansHeading-active"
                      }`}
                    >
                      {item?.planName}
                    </div>
                    <div
                      className={`plansHeading2  ${
                        activePlan === "basic-annual" && "plansHeading-active"
                      }`}
                    >
                      $ {item?.price}/{item.billingCycle}
                    </div>
                    <div
                      className={`chooseplanButton  ${
                        activePlan === "basic-annual" &&
                        "chooseplanButton-active"
                      }`}
                    >
                      {activePlan === "basic-annual"
                        ? "CURRENT PLAN"
                        : "CHOOSE PLAN"}
                    </div>
                    <div
                      className={`planFeature  ${
                        activePlan === "basic-annual" && "plansHeading-active"
                      }`}
                    >
                      {item.description}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          ) : (
            <div className="plansContainer">
              {yearlyPlan?.map((item, key) => {
                return (
                  <NavLink
                    to="/my-store/general-settings"
                    // className="plansEach"
                    className={`plansEach  ${
                      activePlan === "basic-annual" && "plansEach-active"
                    }`}
                  >
                    <div className="plansEachCircle"></div>
                    <div
                      className={`plansHeading  ${
                        activePlan === "basic-annual" && "plansHeading-active"
                      }`}
                    >
                      {item?.planName}
                    </div>
                    <div
                      className={`plansHeading2  ${
                        activePlan === "basic-annual" && "plansHeading-active"
                      }`}
                    >
                      $ {item?.price}/{item.billingCycle}
                    </div>
                    <div
                      className={`chooseplanButton  ${
                        activePlan === "basic-annual" &&
                        "chooseplanButton-active"
                      }`}
                    >
                      {activePlan === "basic-annual"
                        ? "CURRENT PLAN"
                        : "CHOOSE PLAN"}
                    </div>
                    <div
                      className={`planFeature  ${
                        activePlan === "basic-annual" && "plansHeading-active"
                      }`}
                    >
                      {item.description}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Billing;
