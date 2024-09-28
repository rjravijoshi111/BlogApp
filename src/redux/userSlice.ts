import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from './store';
import {signupApi, loginApi} from '../api/mockApi';
import apiConstant from '../constant/apiConstant';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

export const signup = createAsyncThunk<
  User,
  {username: string; password: string},
  {rejectValue: string}
>(apiConstant.signup, async (credentials, {rejectWithValue}) => {
  try {
    const response = await signupApi(
      credentials.username,
      credentials.password,
    );
    return response;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const login = createAsyncThunk<
  User,
  {username: string; password: string},
  {rejectValue: string}
>(apiConstant.login, async (credentials, {rejectWithValue}) => {
  try {
    const response = await loginApi(credentials.username, credentials.password);
    return response;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
    },

    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.users.push(action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      });

    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const {logout, clearError} = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export const selectUserLoading = (state: RootState) => state.user.loading;

export const selectUserError = (state: RootState) => state.user.error;
