import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      console.log('Registration successful:', data);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.code === 11000) {
          return rejectWithValue('Email already exists');
        }
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) {
      return rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(token);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
