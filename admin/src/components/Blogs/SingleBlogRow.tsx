import { FC, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { IBlog } from "@/interfaces/blogs";
import { useModal } from "@/hooks/useModal";
import { isAxiosError } from "axios";

import Image from "next/image";

import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface SingleBlogRowProps {
  blog: IBlog;
}

interface BlogDeleteModalContentProps {
  blog: IBlog;
  closeModal: () => void;
}

const SingleBlogRow: FC<SingleBlogRowProps> = ({ blog }) => {
  const { showModal, closeModal } = useModal();

  const showDeletePrompt = (): void => {
    showModal({
      title: "Мэдээ устгах",
      content: <BlogDeleteModalContent blog={blog} closeModal={closeModal} />,
    });
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-2 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="min-h-12.5 min-w-15 max-h-12.5 max-w-15 rounded-md overflow-hidden">
              <Image
                width={120}
                height={100}
                src={blog.picture}
                alt="Product"
                className="w-full h-full object-cover aspect-[1.2/1]"
              />
            </div>
            <p className="font-medium text-sm text-black dark:text-white">
              {blog.name}
            </p>
          </div>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium text-sm text-black dark:text-white">
            {blog.description}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-sm text-black dark:text-white">
            {new Date(blog.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-sm text-black dark:text-white">
            {blog.user ? blog.user.fullName : ""}
          </p>
        </div>
        <div className="col-span-1 flex items-center gap-3 pl-4">
          <FiEdit size={20} className="text-meta-5" />
          <button
            onClick={(): void => {
              showDeletePrompt();
            }}
          >
            <HiOutlineTrash size={23} className="text-meta-1" />
          </button>
        </div>
      </div>
    </>
  );
};

const BlogDeleteModalContent: FC<BlogDeleteModalContentProps> = ({
  blog,
  closeModal,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const submitHandler = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      await axiosInstance.delete(`/api/blogs/${blog._id}`);

      toast.success("Сэдэв амжилттай устлаа.");
      closeModal();
      router.push({
        pathname: "/blogs",
        query: { ...router.query },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.error ||
            "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
        );
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="text-danger p-3 rounded-full bg-danger/20">
        <AiOutlineWarning size={35} />
      </div>
      <h5 className="text-md-medium text-head max-w-[45ch] text-center">
        Та {blog.name} нэртэй сэдвийг устгахдаа итгэлтэй байна уу?
      </h5>
      <div className="flex items-center gap-3">
        <button
          disabled={isSubmitting}
          onClick={closeModal}
          className="btn-1 py-3 px-5 text-sm-medium"
        >
          Үгүй
        </button>
        <button
          disabled={isSubmitting}
          onClick={(): void => {
            submitHandler();
          }}
          className="btn-1 py-3 px-5 text-sm-medium bg-red-500 hover:bg-transparent hover:border-red-500 hover:text-red-500 disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:bg-red-300 disabled:hover:border-transparent disabled:hover:text-white"
        >
          Тийм
        </button>
      </div>
    </div>
  );
};

export default SingleBlogRow;
