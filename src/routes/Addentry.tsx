import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { InputAdornment } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDispatch } from "react-redux";
import { add, edit, updateEntry } from "../redux/slices/timeEntriesSlice";

function Addentry() {
  const [targetDate, setTargetDate] = useState<Dayjs>(dayjs());
  const [description, setDescription] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      dispatch(edit(id));
    }
  }, [dispatch, id, editMode]);

  function addTimeEntry() {
    editMode === true && id
      ? dispatch(updateEntry(id, targetDate, description, task))
      : dispatch(add(targetDate, description, task));
    setDescription("");
    setTask("");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={targetDate}
          onChange={(newValue: any) => {
            setTargetDate(newValue);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
        />
      </LocalizationProvider>
      <TextField
        multiline
        rows={3}
        sx={{ mt: 2 }}
        label="What are you working on?"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
        value={description}
      />
      <TextField
        label="Task"
        variant="outlined"
        id="string"
        sx={{ mt: 2 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTask(e.target.value)
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AssignmentIcon />
            </InputAdornment>
          ),
        }}
        value={task}
      />
      {
        <Button
          variant="contained"
          sx={{ mt: 3, p: 1 }}
          onClick={addTimeEntry}
          startIcon={<SaveIcon />}
        >
          {editMode === true ? "Update" : "Add A Task"}
        </Button>
      }
    </Box>
  );
}

export default Addentry;
