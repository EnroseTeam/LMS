import SingleRequestRow from "@/components/Requests/SingleRequestRow";
import { ICourseRequest } from "@/interfaces/courses";
import { NextPageWithLayout } from "@/pages/_app";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { GetServerSideProps } from "next";

interface CourseRequestPageProps {
  requests: ICourseRequest[];
}

export const getServerSideProps: GetServerSideProps<CourseRequestPageProps> = async ({ req }) => {
  try {
    const res = await axiosInstance.get<{ body: ICourseRequest[] }>("/api/courses/requests", {
      headers: {
        Cookie: `connect.sid=${req.cookies["connect.sid"]}`,
      },
    });

    return {
      props: {
        requests: res.data.body,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          redirect: {
            destination: "/auth/login",
            permanent: false,
          },
        };
      }

      if (error.response?.status === 403) {
        return {
          redirect: {
            destination: "/auth/login",
            permanent: false,
          },
        };
      }
    }

    return {
      notFound: true,
    };
  }
};

const CourseRequestPage: NextPageWithLayout<CourseRequestPageProps> = ({ requests }) => (
  <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 m-6">
    <h4 className="text-xl font-bold text-black dark:text-white mb-5">Сургалт нийтлэх хүсэлтүүд</h4>
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Сургалт
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Хүсэлт гаргасан багш
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Төлөв
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <SingleRequestRow key={request._id} request={request} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CourseRequestPage;
