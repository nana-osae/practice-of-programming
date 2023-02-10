import React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper, Button, Typography } from "@mui/material";
import { deleteProject } from "../redux/slices/projectsSlice";
import { useDispatch } from "react-redux";
import { blue, deepOrange, teal, indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

type Props = {
  project: any;
  setIsEdit:React.Dispatch<React.SetStateAction<boolean>>;
  setId:React.Dispatch<React.SetStateAction<string>>;
};

function Project({ project, setIsEdit, setId}: Props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

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


  let dispatch = useDispatch();
  let navigate = useNavigate();

  const colors = [blue[400], indigo[600], teal[600], deepOrange[600]];

  function getColor(arr: any[]) {
    return arr[Math.floor(Math.random() * 4)];
  }

  return (
    <Paper
      sx={{ display: "flex", justifyContent: "space-between", mt: 2, p: 2 }}
    >
      <Box>
        <CircleIcon sx={{ fontSize: 10, color: getColor(colors) }} />
      </Box>
      <Button variant="text">
        <Typography
          sx={{ ml: 2, mr: 2 }}
          onClick={() => navigate(`/projects/details/${project.id}`)}
        >
          {project.projectName}
        </Typography>
      </Button>
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
                    <MenuItem
                      onClick={() => dispatch(deleteProject(project.id))}
                    >
                      <DeleteOutlineIcon /> Delete
                    </MenuItem>
                    <MenuItem
                    onClick={() => {
                      setIsEdit((prev) => !prev)
                      setId(project.id)

                    }}
                    >
                      <EditIcon/> Edit
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Paper>
  );
}

export default Project;
