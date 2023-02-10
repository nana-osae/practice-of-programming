import { useNavigate, Navigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import "../sass/home.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  showUnauthorizedMessage,
  closeUnauthorizedMessage,
} from "../redux/slices/authSlice";
import { RootState } from "../redux/store";

function Home() {
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const { currentUser } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function navigateToAddNewTimeEntry() {
    if (currentUser.role === "Patient") {
      dispatch(showUnauthorizedMessage());
      setTimeout(() => {
        dispatch(closeUnauthorizedMessage());
      }, 3000);
    } else {
      navigate("/addentry");
    }
  }

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="home_container">
      <div style={{ position: "relative", top: 45, zIndex: -999 }}>
        <div className="background_image"></div>
      </div>
      <Box
        sx={{ position: "absolute", bottom: 1, right: 2, margin: 10 }}
        onClick={navigateToAddNewTimeEntry}
      >
        <StyledFab color="secondary" aria-label="add">
          <AddIcon />
        </StyledFab>
      </Box>
    </div>
  );
}

export default Home;
