import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { TimeEntries } from "../../models";
import { Dayjs } from "dayjs";

export const timeEntriesSlice = createSlice({
  name: "timeEntries",
  initialState: {
    timeEntries: [] as TimeEntries[],
    timeEntry: null as any | TimeEntries,
    completedList: [] as any[],
  },
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<TimeEntries>) => {
        state.timeEntries.push(action.payload);
      },
      prepare: (targetDate: Dayjs, description: string, task: string) => {
        return {
          payload: {
            id: nanoid(),
            targetDate,
            description,
            task,
          },
        };
      },
    },
    edit: {
      reducer: (state, action: PayloadAction<any>) => {
        state.timeEntry = state.timeEntries.find(
          (entry) => entry.id === action.payload.id
        );
      },
      prepare: (id: string) => {
        return {
          payload: { id },
        };
      },
    },
    deleteEntry: {
      reducer: (state, action: PayloadAction<any>) => {
        let index = state.timeEntries.findIndex(
          (entry) => entry.id === action.payload.id
        );
        state.timeEntries.splice(index, 1);
      },
      prepare: (id: string) => {
        return {
          payload: { id },
        };
      },
    },
    addToCompletedList: {
      reducer: (state, action: PayloadAction<any>) => {
        let exist = state.completedList.find(
          (entry) => entry.id === action.payload.id
        );
        if (exist) {
          return;
        } else {
          state.completedList.push(action.payload);
        }
      },
      prepare: (entryObject: any) => {
        return {
          payload: {
            ...entryObject,
          },
        };
      },
    },
    deleteTimedOutTask: {
      reducer: (state, action: PayloadAction<any>) => {
        let index = state.completedList.findIndex(
          (entry) => entry.id === action.payload.id
        );
        state.completedList.splice(index, 1);
      },
      prepare: (id: string) => {
        return {
          payload: { id },
        };
      },
    },
    updateEntry: {
      reducer: (state, action: PayloadAction<TimeEntries>) => {
        const indexOfEntrybeingEdited = state.timeEntries.findIndex(
          (entry) => entry.id === action.payload.id
        );
        state.timeEntries[indexOfEntrybeingEdited] = action.payload;
      },
      prepare: (
        id: string,
        targetDate: Dayjs,
        description: string,
        task: string
      ) => {
        return {
          payload: {
            id,
            targetDate,
            description,
            task,
          },
        };
      },
    },
  },
});

export const {
  add,
  edit,
  deleteEntry,
  addToCompletedList,
  deleteTimedOutTask,
  updateEntry,
} = timeEntriesSlice.actions;

export default timeEntriesSlice.reducer;
