import axios from "axios";
import { PostDataType } from "../commonPropsType";

const url = "https://jsonplaceholder.typicode.com";
const contentType = { "Content-Type": "application/json" };

export const fetchPostRecords = async () => {
  const { data } = await axios.get(`/posts`, {
    baseURL: url,
    headers: contentType,
  });
  return data;
};

export const createNewPostRecord = async (record: PostDataType) => {
  const { data } = await axios.put(
    `/posts/${record?.id}`,
    {
      record,
    },
    {
      baseURL: url,
      headers: contentType,
    }
  );
  return data;
};

export const editPostRecord = async (record: PostDataType) => {
  const { data } = await axios.patch(
    `/posts/${record?.id}`,
    {
      record,
    },
    {
      baseURL: url,
      headers: contentType,
    }
  );
  return data;
};

export const deletePostRecord = async (record: PostDataType) => {
  const { data } = await axios.delete(`/posts/${record?.id}`, {
    baseURL: url,
    headers: contentType,
  });
  return data;
};
