import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {fetchBlogsApi, fetchBlogDetailApi} from '../api/mockApi';
import apiConstant from '../constant/apiConstant';

export interface Blog {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
}

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

// Async Thunks

export const fetchBlogs = createAsyncThunk<
  {blogs: Blog[]; totalPages: number},
  {page: number; limit: number},
  {rejectValue: string}
>(apiConstant.fetchBlog, async ({page, limit}, {rejectWithValue}) => {
  try {
    const response = await fetchBlogsApi(page, limit);
    return {
      blogs: response.blogs,
      totalPages: response.totalPages,
    };
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch blogs');
  }
});

export const fetchBlogDetails = createAsyncThunk<
  Blog,
  string,
  {rejectValue: string}
>(apiConstant.fetchBlogDetails, async (id, {rejectWithValue}) => {
  try {
    const blog = await fetchBlogDetailApi(id);
    return blog;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch blog details');
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentBlog(state) {
      state.currentBlog = null;
      state.error = null;
    },
    resetBlogs(state) {
      state.blogs = [];
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBlogs.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchBlogs.fulfilled,
      (state, action: PayloadAction<{blogs: Blog[]; totalPages: number}>) => {
        state.loading = false;
        state.blogs = [...state.blogs, ...action.payload.blogs];
        state.totalPages = action.payload.totalPages;
        state.page += 1;
      },
    );
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch blogs';
    });

    // Fetch Blog Details
    builder.addCase(fetchBlogDetails.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchBlogDetails.fulfilled,
      (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.currentBlog = action.payload;
      },
    );
    builder.addCase(fetchBlogDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch blog details';
    });
  },
});

export const {clearCurrentBlog, resetBlogs} = blogSlice.actions;
export default blogSlice.reducer;

export const selectBlogs = (state: RootState) => state.blog.blogs;

export const selectCurrentBlog = (state: RootState) => state.blog.currentBlog;
