import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addtasktospecificProject } from "../redux/slices/projectsSlice";
import { RootState } from "../redux/store";

type Props = {
  openDialog: boolean;
  onClose: () => void;
  entry: any;
};

function ProjectsDialog({ onClose, openDialog, entry }: Props) {
  const handleClose = () => {
    onClose();
  };

  const { projects } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  return (
    <Dialog onClose={handleClose} open={openDialog}>
      <DialogTitle>Select Project</DialogTitle>
      <List sx={{ pt: 0 }}>
        {projects.map((project) => (
          <div key={project.id}>
            <ListItem disableGutters>
              <ListItemButton
                onClick={() =>
                  dispatch(addtasktospecificProject(entry, project.id))
                }
              >
                <ListItemText primary={project.projectName} />
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </Dialog>
  );
}

export default ProjectsDialog;
