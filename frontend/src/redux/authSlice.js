import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    user: null,
    auth: false,
    errors: [],
    loading: false,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post("/auth/signup", data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post("/auth/signin", data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);
export const currentUser = createAsyncThunk(
    "auth/currentUser",
    async (arg, { rejectWithValue }) => {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };
        try {
            const res = await axios.get("/auth/current", config);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.errors);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.auth = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.auth = true;
                state.loading = false;
                localStorage.setItem("token", payload.token);
                toast.success(payload.msg);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.errors = payload;
                state.loading = false;
                payload.forEach((error) => toast.error(error.msg));
            })
            .addCase(loginUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.auth = true;
                state.loading = false;
                localStorage.setItem("token", payload.token);
                toast.success(payload.msg);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.errors = payload;
                state.loading = false;
                payload.forEach((error) => toast.error(error.msg));
            })
            .addCase(currentUser.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(currentUser.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.auth = true;
                state.loading = false;
            })
            .addCase(currentUser.rejected, (state, { payload }) => {
                state.errors = payload;
                state.loading = false;
            });
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
