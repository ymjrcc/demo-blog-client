import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogDto {
  title: string;
  content: string;
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
}

export const BlogService = {
  getAll: () => api.get<Blog[]>('/blog').then(res => res.data),
  getOne: (id: number) => api.get<Blog>(`/blog/${id}`).then(res => res.data),
  create: (data: CreateBlogDto) => api.post<Blog>('/blog', data).then(res => res.data),
  update: (id: number, data: UpdateBlogDto) => api.put<Blog>(`/blog/${id}`, data).then(res => res.data),
  delete: (id: number) => api.delete<Blog>(`/blog/${id}`).then(res => res.data),
};