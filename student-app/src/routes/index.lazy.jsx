import NavigationBar from "../components/Navbar";
import SideNavigationBar from "../components/SideNav";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      {
        user.role_id === 1
          ? navigate({ to: "/admin/cars" })
          : navigate({ to: "/cars" });
      }
    }
  }, [navigate, user]);

  return (
    <>
      <div>
        <NavigationBar />
        <SideNavigationBar />
        <h1>HALOOOO</h1>
      </div>
    </>
  );
}
