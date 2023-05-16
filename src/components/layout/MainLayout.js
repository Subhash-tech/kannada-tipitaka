import { styled } from "@material-ui/core";
import { Outlet} from "react-router-dom";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
  borderRadius: "20px",
}));

const MainLayout = () => (
  <MainLayoutRoot>
      <Outlet/>
  </MainLayoutRoot>
);

export default MainLayout;
