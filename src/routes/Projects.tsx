import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import Project from "./Project";
import SaveIcon from "@mui/icons-material/Save";
import { addProject, updateProject } from "../redux/slices/projectsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

function Projects() {
  const [projectName, setProjectName] = useState<string>("");
  const { projects } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const projectRef = useRef("" as any);

  useEffect(() => {
    if (id !== "") {
      setIsEdit(true);
      projectRef.current.focus();
    } else {
      setIsEdit(false);
    }
  }, [isEdit, id]);

  console.log(isEdit);

  function handleUpdateAndAddProject() {
    if (isEdit === true) {
      dispatch(updateProject(id, projectName));
      setId("");
    } else {
      dispatch(addProject(projectName));
    }
    setProjectName("");
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Add project"
          variant="standard"
          value={projectName}
          inputRef={projectRef as any}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProjectName(e.target.value)
          }
        />
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleUpdateAndAddProject}
        />
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ textAlign: "left" }}>
          Projects
        </Typography>
        <Divider />
        {projects.map((project: any) => (
          <Project
            key={project.id}
            project={project}
            setIsEdit={setIsEdit}
            setId={setId}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Projects;
