import React, { useEffect, useState } from "react";
//Material UI Elements
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Box, Button, Container, Typography } from "@mui/material";
// Material UI Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

//from redux
import {
  deleteEntry,
  addToCompletedList,
} from "../redux/slices/timeEntriesSlice";
import { useDispatch, useSelector } from "react-redux";

// Timer Hook
import { useTimer } from "react-timer-hook";
import dayjs from "dayjs";
import { Navigate, useNavigate } from "react-router-dom";
import ProjectsDialog from "../components/ProjectsDialog";
import { RootState } from "../redux/store";

type Props = {
  entry: any;
};

function TimeEntry({ entry }: Props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { currentUser } = useSelector((state: RootState) => state.users);
  const { disableVibrationOnNotification } = useSelector(
    (state: RootState) => state.settings
  );

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const dispatch = useDispatch();

  function handleDelete(id: string) {
    return dispatch(deleteEntry(id));
  }

  const { days, seconds, minutes, hours, start, pause } = useTimer({
    expiryTimestamp: dayjs(entry.targetDate) as any,
    onExpire: () => console.warn("onExpire called"),
  });

  navigator.serviceWorker.register("sw.js"); // regsiter service worker

  useEffect(() => {
    function showNotification() {
      if (days + hours + minutes + seconds <= 0) {
        disableVibrationOnNotification === false && navigator.vibrate(2000);
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("System Notification", {
            body: ` ${entry.task} has to be done`,
            tag: "systems-notification",
          });
        });
        dispatch(addToCompletedList(entry));
        dispatch(deleteEntry(entry.id));
      }
    }
    showNotification();
  }, [
    entry.task,
    hours,
    days,
    minutes,
    seconds,
    dispatch,
    entry,
    disableVibrationOnNotification,
  ]);

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!currentUser) return <Navigate to="/auth/login" />;

  return (
    <Container maxWidth="sm" sx={{ mt: 1 }}>
      <Paper sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>{entry.task}</Box>
          <Box sx={{ display: "flex" }}>
            <Typography>{days}</Typography>:<Typography>{hours}</Typography>:
            <Typography>{minutes}</Typography>:
            <Typography>{seconds}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button onClick={start}>
              <PlayArrowIcon />
            </Button>
            <Button onClick={pause}>
              <PauseIcon />
            </Button>
          </Box>
        </Box>
        <Box>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={() => handleDelete(entry.id)}>
                        delete entry
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate(`/addentry/${entry.id}`)}
                      >
                        edit entry
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        add to completed tasks
                      </MenuItem>
                      <MenuItem onClick={handleClickOpenDialog}>
                        add to project
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <ProjectsDialog
            entry={entry}
            openDialog={openDialog}
            onClose={handleCloseDialog}
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default TimeEntry;
