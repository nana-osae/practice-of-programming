import { Box, Typography } from "@mui/material";
import TimeEntry from "./TimeEntry";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

function TimeEntries() {
  const { timeEntries } = useSelector((state: RootState) => state.timeEntries);

  return (
    <>
      {timeEntries.length === 0 ? (
        <Typography component="p"> No tasks at the moment </Typography>
      ) : (
        <Box>
          {timeEntries.map((entry) => (
            <TimeEntry key={entry.id} entry={entry} />
          ))}
        </Box>
      )}
    </>
  );
}

export default TimeEntries;
