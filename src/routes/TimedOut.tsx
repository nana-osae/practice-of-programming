import { Box, Paper, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteTimedOutTask } from "../redux/slices/timeEntriesSlice";


function CompletedProjects() {
  const { completedList } = useSelector(
    (state: RootState) => state.timeEntries
  );
  const dispatch = useDispatch();

  if (completedList.length === 0)
    return <Typography component="p">no timeouts for now</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {completedList.map((element: any) => (
        <Paper elevation={1} key={element.id} sx={{ p: 2 }}>
          <Typography component="p">TaskId: {element.id}</Typography>
          <Typography component="p">Task: {element.task}</Typography>
          <Typography component="p">
            Description: {element.description}
          </Typography>
          <Typography component="p">
            Date to be completed: {element.targetDate.toString()}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ m: 1 }}
            onClick={() => dispatch(deleteTimedOutTask(element.id))}
          >
            <DeleteIcon />
          </Button>
        </Paper>
      ))}
    </Box>
  );
}

export default CompletedProjects;
