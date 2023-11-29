import axios from 'axios';

import {Params} from './type';

const instance = axios.create({
  baseURL: '/api' // 设置你的 baseURL
});

// 封装 GET 请求
export const get = async (url: string, params?: Params) => {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET 请求失败:', error);
    throw error;
  }
};

// 封装 POST 请求
export const post = async (url: string, data: Params) => {
  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST 请求失败:', error);
    throw error;
  }
};

// 封装 PUT 请求
export const put = async (url: string, data: Params) => {
  try {
    const response = await instance.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT 请求失败:', error);
    throw error;
  }
};

// 封装 DELETE 请求
export const del = async (url: string) => {
  try {
    const response = await instance.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE 请求失败:', error);
    throw error;
  }
};