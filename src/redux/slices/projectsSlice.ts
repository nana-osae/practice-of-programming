import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as any[],
  },
  reducers: {
    addProject: {
      reducer: (state, action: PayloadAction<any>) => {
        state.projects.push(action.payload);
      },
      prepare: (projectName: string) => {
        return {
          payload: {
            id: nanoid(),
            projectName,
            projectChildren: [],
          },
        };
      },
    },
    deleteProject: {
      reducer: (state, action: PayloadAction<any>) => {
        let index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        state.projects.splice(index, 1);
      },
      prepare: (id: string) => {
        return {
          payload: { id },
        };
      },
    },
    addtasktospecificProject: {
      reducer: (state, action: PayloadAction<any>) => {
        let index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        state.projects[index].projectChildren.push(action.payload.taskObject);
      },
      prepare: (taskObject: string, id: string) => {
        return {
          payload: {
            taskObject,
            id,
          },
        };
      },
    },
    updateProject: {
      reducer: (state, action: PayloadAction<any>) => {
        const indexOfProjectToBeEdited = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        state.projects[indexOfProjectToBeEdited] = action.payload;
      },
      prepare: (id: string, projectName: string) => {
        return {
          payload: {
            id,
            projectName,
            projectChildren: [],
          },
        };
      },
    },
  },
});

export const {
  addProject,
  deleteProject,
  addtasktospecificProject,
  updateProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
