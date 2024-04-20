import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../layout";
import { HomePage, SignInPage } from "../pages";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
      </Route>
      <Route
        path="/signin"
        element={
          <GuestRoute>
            <SignInPage />
          </GuestRoute>
        }
      />
    </Routes>
  );
};

export default Router;
