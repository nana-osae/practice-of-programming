import { Box, Divider, Switch } from "@mui/material";
import React from "react";
import { toggleMode, toggleDisable } from "../redux/slices/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Settings() {
  const { lightAndDarkmood, disableVibrationOnNotification } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          p: 2,
        }}
      >
        <Box>Dark mode:</Box>
        <Box>
          <Switch
            checked={lightAndDarkmood}
            onChange={() => dispatch(toggleMode())}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          p: 2,
        }}
      >
        <Box>Disable vibration:</Box>
        <Box>
          <Switch
            checked={disableVibrationOnNotification}
            onChange={() => dispatch(toggleDisable())}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
