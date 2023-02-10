import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    personelUsers: [] as any[],
    patientUsers: [] as any[],
    currentUser: null as null | any,
    error: {
      loginMessage: "",
      registerMessage: "",
      unauthorizedMessage: "",
    } as any,
  },
  reducers: {
    registerAsPersonel: {
      reducer: (state, action: PayloadAction<any>) => {
        let existUser = state.personelUsers.find(
          (user) => user.email === action.payload.email
        );
        if (existUser) {
          state.error.registerMessage = "user already exists";
        } else {
          state.error.registerMessage = "";
          state.personelUsers.push(action.payload);
        }
      },
      prepare: (personelData: any) => {
        return {
          payload: {
            id: nanoid(),
            ...personelData,
            personelChildren: [],
          },
        };
      },
    },
    registerAsPatient: {
      reducer: (state, action: PayloadAction<any>) => {
        let existUser = state.patientUsers.find(
          (user) => user.email === action.payload.email
        );
        if (existUser) {
          state.error.registerMessage = "user already exists";
        } else {
          state.error.registerMessage = "";
          state.patientUsers.push(action.payload);
        }
      },
      prepare: (patientData: any) => {
        return {
          payload: {
            id: nanoid(),
            ...patientData,
          },
        };
      },
    },
    loginInUser: {
      reducer: (state, action: PayloadAction<any>) => {
        let userExists = state.personelUsers
          .concat(state.patientUsers)
          .find(
            (user) =>
              user.email === action.payload.email &&
              user.password === action.payload.password
          );
        if (!userExists) {
          state.error.loginMessage = "user does not exist";
        } else {
          state.error.loginMessage = "";
          state.currentUser = userExists;
        }
      },
      prepare: (userData: any) => {
        return {
          payload: {
            ...userData,
          },
        };
      },
    },
    logOutUser: (state) => {
      state.currentUser = null;
    },
    assignPatientToSpecificPersonel: {
      reducer: (state, action: PayloadAction<any>) => {
        let index = state.personelUsers.findIndex(
          (user) => user.id === action.payload.id
        );
        state.personelUsers[index].personelChildren.push(
          action.payload.userObject
        );
      },
      prepare: (userObject: any, id: string) => {
        return {
          payload: {
            userObject,
            id,
          },
        };
      },
    },
    showUnauthorizedMessage: (state) => {
      state.error.unauthorizedMessage =
        "you are not authorized to access this page";
    },
    closeUnauthorizedMessage: (state) => {
      state.error.unauthorizedMessage = "";
    },
  },
});

export const {
  registerAsPatient,
  registerAsPersonel,
  loginInUser,
  logOutUser,
  showUnauthorizedMessage,
  closeUnauthorizedMessage,
} = authSlice.actions;

export default authSlice.reducer;
