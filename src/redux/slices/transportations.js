import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchTransportations = createAsyncThunk(
  "cargos/fetchTransportations",
  async (KOD) => {
    try {
      const { data } = await axios.post("/transportation",{KOD});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchTransportationsInfo = createAsyncThunk(
  "cargos/fetchTransportationsInfo",
  async (KOD) => {
    try {
      const { data } = await axios.post("/transportation-info",{KOD});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchPayFullTransportations = createAsyncThunk(
  "cargos/fetchPayFullTransportations",
  async (KOD) => {
    try {
      const { data } = await axios.post("/transportation-payfull",{KOD});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchNotEnoughDocs = createAsyncThunk(
  "cargos/fetchNotEnoughDocs",
  async (KOD) => {
    try {
      const { data } = await axios.post("/transportation-no-docs",{KOD});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchZap = createAsyncThunk(
  "cargos/fetchZap",
  async (KOD_OS) => {
    try {
      const { data } = await axios.post("/zap", {KOD_OS});
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchZapById = createAsyncThunk(
  "cargos/fetchZapById",
  async (id) => {
    try {
      const data = await axios.get(`/zap/${id}`);
      if (data.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchGroups = createAsyncThunk(
  "cargos/fetchGroups",
  async (kod) => {
    try {
      const data = await axios.post(`/zap/groups`, { kod: kod });
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchMyZap = createAsyncThunk(
  "cargos/fetchGroups",
  async (kod) => {
    const { data } = await axios.post(`/zap/groups`, { kod: kod });
    return data;
  }
);

const initialState = {
  transportation: {
    items: [],
    info:[],
    groups: [],
    loading: "loading",
  },
};
const transportationSlice = createSlice({
  name: "transportation",
  initialState,
  reducers: {
    addReduxZap: (state, action) => {
      state.zap.items = [...state.zap.items, action.payload];
    },
    changeCommentsCount: (state, action) => {
      const id = action.payload;
      const counterComm = state.zap.items.find((item) => item.KOD === id);
      if (counterComm) {
        counterComm.COUNTCOMM += 1;
      }
      state.zap.items = [...state.zap.items];
    },
    deleteReduxZap: (state, action) => {
      const id = action.payload;
      state.zap.items = state.zap.items.filter((item) => item.KOD !== id);
    },
    refreshReduxZap: (state, action) => {
      const id = action.payload;
      const dateZap = state.zap.items.find((item) => item.KOD === id);
      if (dateZap) {
        const date = new Date();
        date.toISOString();
        dateZap.DATUPDATE = date;
      }
      state.zap.items = [...state.zap.items];
    },
    showEditReduxZap: (state, action) => {
      const { pKodZap, pZapText, pZav, pRozv,zapCina } = action.payload;
      const editZap = state.zap.items.find((item) => item.KOD === pKodZap);
      if (editZap) {
        editZap.ZAPTEXT = pZapText;
        editZap.ZAV = pZav;
        editZap.ROZV = pRozv;
        editZap.ZAPCINA=zapCina;
      }
      state.zap.items = [...state.zap.items];
    },
    showEditReduxZapText: (state, action) => {
      const { pKodZap, pZapText} = action.payload;
      const editZap = state.zap.items.find((item) => item.KOD === pKodZap);
      if (editZap) {
        editZap.ZAPTEXT = pZapText;
      }
      state.zap.items = [...state.zap.items];
    },
    showEditReduxZapCarCount: (state, action) => {
      const { pKilAmZakr, pKodZap} = action.payload;
      const editZap = state.zap.items.find((item) => item.KOD === pKodZap);
      if (editZap) {
        editZap.KILAMACT = editZap.KILAMACT - pKilAmZakr;
      }
      state.zap.items = [...state.zap.items];
    },
  },
  extraReducers: {
    [fetchTransportations.pending]: (state) => {
      state.transportation.items = [];
      state.transportation.status = "loading";
    },
    [fetchTransportations.fulfilled]: (state, action) => {
      state.transportation.items = action.payload;
      state.transportation.status = "loaded";
    },
    [fetchTransportations.rejected]: (state) => {
      state.transportation.items = [];
      state.transportation.status = "error";
    },
    [fetchPayFullTransportations.pending]: (state) => {
      state.transportation.items = [];
      state.transportation.status = "loading";
    },
    [fetchPayFullTransportations.fulfilled]: (state, action) => {
      state.transportation.items = action.payload;
      state.transportation.status = "loaded";
    },
    [fetchPayFullTransportations.rejected]: (state) => {
      state.transportation.items = [];
      state.transportation.status = "error";
    },
    [fetchNotEnoughDocs.pending]: (state) => {
      state.transportation.items = [];
      state.transportation.status = "loading";
    },
    [fetchNotEnoughDocs.fulfilled]: (state, action) => {
      state.transportation.items = action.payload;
      state.transportation.status = "loaded";
    },
    [fetchNotEnoughDocs.rejected]: (state) => {
      state.transportation.items = [];
      state.transportation.status = "error";
    },
    [fetchTransportationsInfo.pending]: (state) => {
      state.transportation.info = [];
      state.transportation.status = "loading";
    },
    [fetchTransportationsInfo.fulfilled]: (state, action) => {
      state.transportation.info = action.payload;
      state.transportation.status = "loaded";
    },
    [fetchTransportationsInfo.rejected]: (state) => {
      state.transportation.info = [];
      state.transportation.status = "error";
    },
  },
});
export const {
  addReduxZap,

} = transportationSlice.actions;
export const transportationReducer = transportationSlice.reducer;
