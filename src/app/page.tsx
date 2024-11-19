'use client'
import { BlogService, type Blog } from '@/services/blog'
import BlogList from '@/components/BlogList';
import BlogForm from '@/components/BlogForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';

export default function Page() {

  const queryClient = useQueryClient();

  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: BlogService.getAll
  });

  const createMutation = useMutation({
    mutationFn: BlogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      BlogService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setSelectedBlog(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: BlogService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    }
  });

  const onEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    onOpen();
  }

  const onCreate = () => {
    setSelectedBlog(null);
    onOpen();
  }

  const onSubmit = (data: any) => {
    if (selectedBlog) {
      updateMutation.mutate({ id: selectedBlog.id, data });
    } else {
      createMutation.mutate(data);
    }
    onClose();
  }

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className='container p-4'>
      <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-gray-200">
        <h1 className="text-2xl font-bold">博客管理系统</h1>
        <Button 
          color="primary"
          onClick={onCreate}
        >
          新建博客
        </Button>
      </div>
      
      <div className='text-lg font-bold mb-2'>博客列表：</div>
      <BlogList
        blogs={blogs || []}
        onEdit={onEdit}
        onDelete={(id: number) => {
          if (confirm('Are you sure you want to delete this blog?')) {
            deleteMutation.mutate(id);
          }
        }}
      />
      <BlogForm 
        data={selectedBlog} 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        onSubmit={onSubmit}
      />
    </div>
  );
}