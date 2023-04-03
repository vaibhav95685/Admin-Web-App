import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateStore } from "../../actions/storeActions";
import { updateNotificatonSettings } from "../../services";
import "./styles/myaccount.css";
import "./styles/notificationsettings.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationSettings = ({ store, updateStore }) => {
  const initialNotificationSettings = {
    itemSold: store.notifications.itemSold,
    bidActivity: store.notifications.bidActivity,
    auctionExpired: store.notifications.auctionExpired,
    successfulPurchase: store.notifications.successfulPurchase,
  };

  const [notificationSettings, setNotificationSettings] = useState(
    initialNotificationSettings
  );
  const [isSettingsChanged, setIsSettingsChanged] = useState(false);

  useEffect(() => {
    if (
      initialNotificationSettings.itemSold === notificationSettings.itemSold &&
      initialNotificationSettings.bidActivity ===
        notificationSettings.bidActivity &&
      initialNotificationSettings.auctionExpired ===
        notificationSettings.auctionExpired &&
      initialNotificationSettings.successfulPurchase ===
        notificationSettings.successfulPurchase
    ) {
      setIsSettingsChanged(false);
    } else {
      setIsSettingsChanged(true);
    }
  }, [notificationSettings]);

  const checkToggleFalse = () => {
    console.log(notification1, store.notifications.itemSold);
    console.log(notification2, store.notifications.bidActivity);
    console.log(notification3, store.notifications.auctionExpired);
    console.log(notification5, store.notifications.successfulPurchase);
    if (
      notification1 == store.notifications.itemSold &&
      notification2 == store.notifications.bidActivity &&
      notification3 == store.notifications.auctionExpired &&
      notification5 == store.notifications.successfulPurchase
    ) {
      setSaveActive(false);
    } else {
      setSaveActive(true);
    }
  };

  const handleSubmit = async () => {
    const data = {
      notifications: { ...notificationSettings },
    };
    const storeResponse = await updateNotificatonSettings(
      store._id,
      data,
      store.token
    );

    if (storeResponse.success) {
      toast.info("Notification Settings Updated.");
      setIsSettingsChanged(false);
      updateStore({ store: storeResponse.responseData });
    } else {
      toast.info("Internal server error. Please try again later.");
    }
  };

  return (
    <>
      <div className="myAccountFormContainer">
        <div className="notificationContainer">
          <div className="myStoreHeading1">Notification Settings</div>
          <div className="notificationTypeContainer">
            <div className="notificationTypeEach">
              <div>
                <div className="notificationTypeTitle">Item Sold</div>
                <div className="notificationTypeDescription">
                  When someone purchase your item
                </div>
              </div>
              {!notificationSettings.itemSold && (
                <div
                  className="myStoreSocialMediaToggleButton"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      itemSold: true,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaToggler"></div>
                </div>
              )}
              {notificationSettings.itemSold && (
                <div
                  className="myStoreSocialMediaToggleButtonActive"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      itemSold: false,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaTogglerActive"></div>
                </div>
              )}
            </div>
            <div className="notificationTypeEach">
              <div>
                <div className="notificationTypeTitle">Bid Activity</div>
                <div className="notificationTypeDescription">
                  When someone bids on your item
                </div>
              </div>
              {!notificationSettings.bidActivity && (
                <div
                  className="myStoreSocialMediaToggleButton"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      bidActivity: true,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaToggler"></div>
                </div>
              )}
              {notificationSettings.bidActivity && (
                <div
                  className="myStoreSocialMediaToggleButtonActive"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      bidActivity: false,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaTogglerActive"></div>
                </div>
              )}
            </div>
            <div className="notificationTypeEach">
              <div>
                <div className="notificationTypeTitle">Auction Expired</div>
                <div className="notificationTypeDescription">
                  When one of your item auction expired
                </div>
              </div>
              {!notificationSettings.auctionExpired && (
                <div
                  className="myStoreSocialMediaToggleButton"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      auctionExpired: true,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaToggler"></div>
                </div>
              )}
              {notificationSettings.auctionExpired && (
                <div
                  className="myStoreSocialMediaToggleButtonActive"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      auctionExpired: false,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaTogglerActive"></div>
                </div>
              )}
            </div>
            <div className="notificationTypeEach">
              <div>
                <div className="notificationTypeTitle">Successful Purchase</div>
                <div className="notificationTypeDescription">
                  When you successfully purchased item
                </div>
              </div>
              {!notificationSettings.successfulPurchase && (
                <div
                  className="myStoreSocialMediaToggleButton"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      successfulPurchase: true,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaToggler"></div>
                </div>
              )}
              {notificationSettings.successfulPurchase && (
                <div
                  className="myStoreSocialMediaToggleButtonActive"
                  onClick={() => {
                    setNotificationSettings({
                      ...notificationSettings,
                      successfulPurchase: false,
                    });
                  }}
                >
                  <div className="myStoreSocialMediaTogglerActive"></div>
                </div>
              )}
            </div>
          </div>
          {isSettingsChanged && (
            <div className="formsaveButtonContainer">
              <div className=" notificationSaveButton" onClick={handleSubmit}>
                Save
              </div>
            </div>
          )}
          {!isSettingsChanged && (
            <div
              className="formsaveButtonContainer"
              style={{ opacity: "0.55" }}
            >
              <div className=" notificationSaveButton">Save</div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.store.store,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (data) => dispatch(updateStore(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSettings);
