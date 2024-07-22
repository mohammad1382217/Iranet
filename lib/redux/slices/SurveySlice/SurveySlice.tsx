/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAddSurveyOptionsThunk,
  fetchAddSurveyThunk,
  fetchSurveyByIdThunk,
  fetchSurveyMemberThunk,
  fetchSurveyOptionsThunk,
  fetchSurveyResultThunk,
  fetchSurveyThunk,
} from "./thunk";

const initialState: SurveySliceState = {
  SurveyDatum: [],
  isEdit: false,
  uuid: "",
  SurveyData: {
    title: "",
    text: "",
    start_time: "",
    end_time: "",
  },
  survey_options: [],
  survayTitle: "",
  updateSurveyData: {
    title: "",
    text: "",
    start_time: "",
    end_time: "",
    status: "",
    options: [],
    store_logo: "",
    store_name: "",
  },
  surveyMembers: [],
  surveyResults: { data: {}, member_count: 0 },
  activeStep: 0,
  SurveyDataAdmin: [
    {
      key: 1,
      store_name: "فروشگاه شماره 1",
      title: "نظر سنجی عید نوروز",
      text: "",
      start_time: "1400/10/10 - 1404/04/04",
      status: "متوقف شده",
    },
    {
      key: 2,
      store_name: "فروشگاه شماره 1",
      title: "عنوان نظرسنجی شماره 3",
      text: "",
      start_time: "1400/10/20 - 1404/04/04",
      status: "در جریان",
    },
    {
      key: 3,
      store_name: "فروشگاه شماره 1",
      title: "عنوان نظرسنجی شماره 8",
      text: "",
      start_time: "1402/05/01 - 1404/04/04",
      status: "پایان زمان",
    },
    {
      key: 4,
      store_name: "فروشگاه شماره 1",
      title: "عنوان نظرسنجی شماره 4",
      text: "",
      start_time: "1402/04/30 - 1404/04/04",
      status: "در صف",
    },
  ],
  editingId: 0,
  showModalParticipants: false,
  status: "idle",
};

export const SurveySlice = createSlice({
  name: "Survey",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUuid: (state, actions: PayloadAction<string>) => {
      state.uuid = actions.payload;
    },
    setIsEdit: (state, actions: PayloadAction<boolean>) => {
      state.isEdit = actions.payload;
    },
    setSurveyDatum: (state, actions: PayloadAction<SurveyData[]>) => {
      state.SurveyDatum = actions.payload;
    },
    setSurveyData: (state, actions: PayloadAction<editSurveyData>) => {
      state.SurveyData = actions.payload;
    },
    setSurveyResults: (state, actions: PayloadAction<surveyResults>) => {
      state.surveyResults = actions.payload;
    },
    setSurvayTitle: (state, actions: PayloadAction<string>) => {
      state.survayTitle = actions.payload;
    },
    setSurveyDataKey: <T extends keyof addSurveyData>(
      state: SurveySliceState,
      action: PayloadAction<{ key: T; value: addSurveyData[T] }>
    ) => {
      const { key, value } = action.payload;
      state.SurveyData[key] = value;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setUpdateSurveyDatum: (
      state,
      actions: PayloadAction<{ index: number; modify: SurveyData }>
    ) => {
      const { index, modify } = actions.payload;
      state.SurveyDatum[index] = modify;
    },
    setShowModalParticipants: (state) => {
      state.showModalParticipants = !state.showModalParticipants;
    },
    setEditingId: (state, actions: PayloadAction<number>) => {
      state.editingId = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSurveyThunk.fulfilled,
        (state, actions: PayloadAction<SurveyData[]>) => {
          state.status = "idle";
          state.SurveyDatum = actions.payload;
        }
      )
      .addCase(fetchSurveyThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSurveyByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSurveyByIdThunk.fulfilled,
        (state, actions: PayloadAction<editSurveyData>) => {
          state.status = "idle";
          state.updateSurveyData = actions.payload;
        }
      )
      .addCase(fetchSurveyByIdThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAddSurveyThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAddSurveyThunk.fulfilled,
        (state, actions: PayloadAction<SurveyData>) => {
          state.status = "idle";
          state.uuid = actions.payload.uuid;
          state.activeStep = 1;
        }
      )
      .addCase(fetchAddSurveyThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAddSurveyOptionsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAddSurveyOptionsThunk.fulfilled,
        (state, actions: PayloadAction<SurveyOption>) => {
          state.status = "idle";
          state.survey_options.push(actions.payload);
        }
      )
      .addCase(fetchAddSurveyOptionsThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSurveyOptionsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSurveyOptionsThunk.fulfilled,
        (state, actions: PayloadAction<SurveyOption[]>) => {
          state.status = "idle";
          state.survey_options = actions.payload;
        }
      )
      .addCase(fetchSurveyOptionsThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSurveyResultThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSurveyResultThunk.fulfilled,
        (state, actions: PayloadAction<surveyResults>) => {
          state.status = "idle";
          state.surveyResults = actions.payload;
        }
      )
      .addCase(fetchSurveyResultThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSurveyMemberThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSurveyMemberThunk.fulfilled,
        (state, actions: PayloadAction<surveyMembers[]>) => {
          state.status = "idle";
          state.surveyMembers = actions.payload;
        }
      )
      .addCase(fetchSurveyMemberThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

/* Types */
export interface SurveySliceState {
  uuid: string;
  isEdit: boolean;
  SurveyDatum: SurveyData[];
  activeStep: number;
  SurveyData: addSurveyData;
  surveyMembers: surveyMembers[];
  surveyResults: surveyResults;
  updateSurveyData: editSurveyData;
  survey_options: SurveyOption[];
  survayTitle: string;
  SurveyDataAdmin: SurveyDataAdmin[];
  editingId: number;
  showModalParticipants: boolean;
  status: "idle" | "loading" | "failed";
}

// Types
export type surveyResults = {
  member_count: number;
  data: Record<string, number>;
};
export interface SurveyData {
  uuid: string;
  title: string;
  text: string;
  start_time: string;
  end_time: string;
  status: string;
}

export interface addSurveyData {
  title: string;
  text: string;
  start_time: string;
  end_time: string;
}

export interface editSurveyData {
  title: string;
  text: string;
  start_time: string;
  end_time: string;
  status: string;
  options: SurveyOption[];
  store_logo: string;
  store_name: string;
}

export interface SurveyDataAdmin {
  key: React.Key;
  store_name: string;
  title: string;
  text: string;
  start_time: string;
  status: string;
}

export interface SurveyOption {
  id: number;
  title: string;
}

export type surveyMembers = {
  full_name: string;
  phone_number:string;
  survey_option: {
    id: number;
    title: string;
  }
}