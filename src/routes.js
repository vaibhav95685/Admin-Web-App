import React from "react";
import "./assets/styles/pagination.css";
import "./assets/styles/Theme/input.css";
import "./assets/styles/Theme/dropdown.css";
import "./assets/styles/Theme/table.css";
import "./assets/styles/Theme/position.css";
import "./assets/styles/Theme/text.css";
import "./assets/styles/Theme/measurement.css";
import "./assets/styles/Theme/colors.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import RequireAuth from "./common/components/RequireAuth";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { connect } from "react-redux";
import { history } from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import BillingPage from "./modules/Billing";
import DashBoard from "./modules/dashboard";
import ManageContent from "./modules/manageContent";
import BlockedUser from "./modules/manageContent/blockedUser";
import DelistedCollection from "./modules/manageContent/delistedColection";
import RemovedNfts from "./modules/manageContent/removedNfts";
import ReportedCollections from "./modules/manageContent/reportedCollection";
import ReportedNfts from "./modules/manageContent/reportedNfts";
import MyAccount from "./modules/myaccount";
import GeneralSettingsAccount from "./modules/myaccount/generalSettingsAccount";
import NotificationSettings from "./modules/myaccount/notificationSettings";
import MyItems from "./modules/myitems";
import MyStore from "./modules/mystore";
import AdvancedSetting from "./modules/mystore/advancedSetting";
import Appearance from "./modules/mystore/appearance";
import ManageMetaSpace from "./modules/mystore/manageMetaSpace";
import Billing from "./modules/mystore/billing";
import Blog from "./modules/mystore/blog";
import GeneralSetting from "./modules/mystore/generalSetting";
import WalletPage from "./modules/MetaMask";
import NftPreviewPage from "./modules/preview/nftPreview";
import StorePreview from "./modules/preview/storePreview";
import CollectionPreview from "./modules/preview/collectionPreview";
import MyItemsNft from "./modules/myitems/myitemsNft";
import MyItemsCollection from "./modules/myitems/myitemsCollection";
import MyNfts from "./modules/myitems/Nfts"
import MyCollections from "./modules/myitems/Collection"

class Routes extends BaseComponent {
  componentDidMount() {}

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Switch>
          <Route exact path="/" element={<WalletPage />} />
          <Route
            exact
            path="/billing"
            element={
              <RequireAuth>
                <MyStore />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="my-store"
            element={
              <RequireAuth>
                <MyStore />
              </RequireAuth>
            }
          >
            <Route
              path="general-settings"
              element={
                <RequireAuth>
                  <GeneralSetting />
                </RequireAuth>
              }
            />
            <Route
              path="advanced-settings"
              element={
                <RequireAuth>
                  <AdvancedSetting />
                </RequireAuth>
              }
            />
            <Route
              path="appearance"
              element={
                <RequireAuth>
                  <Appearance />
                </RequireAuth>
              }
            />
            <Route
              path="manage-metaSpace"
              element={
                <RequireAuth>
                  <ManageMetaSpace />
                </RequireAuth>
              }
            />
            <Route
              path="blog"
              element={
                <RequireAuth>
                  <Blog />
                </RequireAuth>
              }
            />
            <Route
              path="billing"
              element={
                <RequireAuth>
                  <Billing />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            exact
            path="my-items"
            element={
              <RequireAuth>
                <MyItems />
              </RequireAuth>
            }
          >
            <Route
              path="nfts"
              element={
                <RequireAuth>
                  <MyItemsNft />
                </RequireAuth>
              }
            />
            <Route
              path="collections"
              element={
                <RequireAuth>
                  <MyItemsCollection />
                </RequireAuth>
              }
            />
             <Route
              path="my-nfts"
              element={
                <RequireAuth>
                  <MyNfts />
                </RequireAuth>
              }
            />
             <Route
              path="my-collections"
              element={
                <RequireAuth>
                  <MyCollections />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            exact
            path="my-account"
            element={
              <RequireAuth>
                <MyAccount />
              </RequireAuth>
            }
          >
            <Route
              path="general-settings"
              element={
                <RequireAuth>
                  <GeneralSettingsAccount />
                </RequireAuth>
              }
            />
            <Route
              path="notification-settings"
              element={
                <RequireAuth>
                  <NotificationSettings />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            exact
            path="/dashboard"
            element={
              <RequireAuth>
                <DashBoard />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="manage-content"
            element={
              <RequireAuth>
                <ManageContent />
              </RequireAuth>
            }
          >
            <Route
              path="reported-collections"
              element={
                <RequireAuth>
                  <ReportedCollections />
                </RequireAuth>
              }
            />
            <Route
              path="delisted-collection"
              element={
                <RequireAuth>
                  <DelistedCollection />
                </RequireAuth>
              }
            />
            <Route
              path="reported-nfts"
              element={
                <RequireAuth>
                  <ReportedNfts />
                </RequireAuth>
              }
            />
            <Route
              path="removed-nfts"
              element={
                <RequireAuth>
                  <RemovedNfts />
                </RequireAuth>
              }
            />
            <Route
              path="blocked-user"
              element={
                <RequireAuth>
                  <BlockedUser />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
          <Route exact path="/nft-preview" element={<NftPreviewPage />} />
          <Route
            exact
            path="/collection-preview"
            element={<CollectionPreview />}
          />
          <Route exact path="/store-preview" element={<StorePreview />} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

// const mapStateToProps = state => {
//   return { user: state.user };
// };
// export default connect(mapStateToProps)(Routes);
export default Routes;
