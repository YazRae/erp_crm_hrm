import { lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Dashboard, Login, NotFound, Signup } from "../app";
import { PrivetLayout, PublicLayout } from "../layouts";
import pages from "../pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<PublicLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="/" element={<Outlet />}>
          <Route index element={<Dashboard />} />
          {pages.map((page, key) => (
            <Route
              key={page.toLowerCase()}
              path={page.toLowerCase()}
              element={
                <PrivetLayout
                  element={lazy(() =>
                    import(
                      /* webpackChunkName: "[request]" */ `../pages/${page}.jsx`
                    )
                  )}
                />
              }
            />
          ))}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
