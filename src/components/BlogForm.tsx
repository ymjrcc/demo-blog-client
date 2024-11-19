'use client'

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface BlogFormProps {
  data: null | {title: string, content: string};
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: {title: string, content: string}) => void;
}

export default function BlogForm({data, isOpen, onOpenChange, onSubmit}: BlogFormProps) {

  const [title, setTitle] = useState(data?.title || '');
  const [content, setContent] = useState(data?.content || '');

  useEffect(() => {
    setTitle(data?.title || '');
    setContent(data?.content || '');  
  }, [data]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {
                  data ? '编辑博客' : '新建博客'
                }
              </ModalHeader>
              <ModalBody>
                <div> 
                  <Input label="标题" value={title} onChange={
                    (e) => setTitle(e.target.value)
                  } />
                </div>
                <div>
                  <Input label="内容" value={content} onChange={
                    (e) => setContent(e.target.value)
                  } />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  关闭
                </Button>
                <Button 
                  isDisabled={!title || !content}
                  color="primary" 
                  onClick={(e) => onSubmit({title, content})}>
                  提交
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}