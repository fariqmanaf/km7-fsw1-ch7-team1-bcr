import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import NavigationBar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SideNavigationBar from "../components/SideNav";
import "../app.css";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Navbar */}
      <NavigationBar />

      {/* Sidebar and Content Wrapper */}
      <div style={{ display: "flex" }}>
        {/* Main Content */}
        <Container fluid style={{ flex: 1 }}>
          <Outlet />
        </Container>
      </div>

      <TanStackRouterDevtools />

      {/* React Toastify */}
      <ToastContainer theme="colored" />
    </>
  ),
});
