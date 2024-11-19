import type { Blog } from "@/services/blog";
import { Button } from "@nextui-org/react"

interface BlogListProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: number) => void;
}

function formatDate(date: string) {
  // 输出 YYYY-MM-DD HH:mm:ss
  return new Date(date).toLocaleString();
}

export default function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                创建时间: {formatDate(blog.createdAt)}
              </p>
              {
                blog.createdAt === blog.updatedAt ? null : (
                  <p className="text-sm text-gray-500 mt-2">
                    最后更新时间: {formatDate(blog.updatedAt)}
                  </p>
                )
              }
            </div>
            <div className="space-x-2">
              <Button
                size="sm"
                onClick={() => onEdit(blog)}
              >
                编辑
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => onDelete(blog.id)}
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}