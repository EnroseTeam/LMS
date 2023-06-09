import { ICourseRequest } from "@/interfaces/courses";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";

import { FC } from "react";
import { AiOutlineEye, AiOutlineCheckSquare, AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

interface SingleRequestRowProps {
  request: ICourseRequest;
}

const SingleRequestRow: FC<SingleRequestRowProps> = ({ request }) => {
  const router = useRouter();

  const acceptRequest = async (): Promise<void> => {
    try {
      const res = await axiosInstance.patch(`/api/courses/requests/${request._id}/accept`);
      toast.success(res.data.message);

      router.replace("/courses/requests");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Тодорхойгүй алдаа гарлаа.");
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа.");
      }
    }
  };

  return (
    <tr>
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{request.course.name}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{request.instructor.fullName}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        {request.status === "Accepted" && (
          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
            Зөвшөөрөгдсөн
          </p>
        )}
        {request.status === "Rejected" && (
          <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-sm font-medium text-danger">
            Цуцлагдсан
          </p>
        )}
        {request.status === "Pending" && (
          <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
            Хүлээгдэж буй
          </p>
        )}
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <button className="hover:text-primary">
            <AiOutlineEye size={18} className="text-currentColor" />
          </button>
          <button
            onClick={(): void => {
              acceptRequest();
            }}
            className="hover:text-primary"
          >
            <AiOutlineCheckSquare size={18} className="text-currentColor" />
          </button>
          <button className="hover:text-primary">
            <AiOutlineCloseCircle size={18} className="text-currentColor" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SingleRequestRow;
