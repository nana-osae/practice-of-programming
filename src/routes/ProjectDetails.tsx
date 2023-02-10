import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function ProjectDetails() {
  const { projects } = useSelector((state: RootState) => state.projects);
  return (
    <Box>
      {projects.map((project) => (
        <Accordion key={project.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{project.projectName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {project.projectChildren.map((children: any) => (
                <ListItem key={children.id} sx={{ mb: 1 }}>
                  <ListItemButton>
                    <ListItemText>
                      <Typography variant="h6"> {children.task} </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default ProjectDetails;
