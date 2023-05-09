import Breadcrumbs from "@/components/global/Breadcrumbs";
import Image from "next/image";
import { FC } from "react";
import { TbGridDots } from "react-icons/tb";
import IconH from "../../assets/“.svg";
import Link from "next/link";
import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IBlog } from "@/interfaces/blogs";
import { GetServerSideProps } from "next/types";
import { axiosInstance } from "@/utils/axiosInstance";

interface SingleBlogPageProps {
  blogs: IBlog;
}
export const getServerSideProps: GetServerSideProps<
  SingleBlogPageProps
> = async ({ params }) => {
  const blogRes = await axiosInstance.get(`/api/blogs/${params?.id}`);

  return {
    props: {
      blogs: blogRes.data.body,
    },
  };
};

const SinglePostPage: FC<SingleBlogPageProps> = ({ blogs }) => (
  <>
    <Breadcrumbs
      breadcrumbItems={[
        { title: "Мэдээ", link: "/blogs" },
        { title: blogs.name, link: `/blogs/${blogs._id}` },
      ]}
    />
    <div className="">
      <div className="max-w-[1100px] mx-auto px-[120px] text-center bg-white">
        <h1 className="text-head text-4x-bold ">{blogs.name}</h1>
        <p className="text-lg-regular text-text pb-[90px]">
          {new Date(blogs.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="rounded-lg overflow-hidden group relative px-[315px] ">
        <Image
          src={blogs.picture}
          alt="postSingle"
          width={1290}
          height={600}
          className="w-full items-center object-cover aspect-[2/1]"
        />
      </div>
    </div>
    <div className="mx-auto px-[535px]">
      <div>
        <h3 className="text-head text-xl-medium pt-16">
          What makes a good brand book?
        </h3>
        <p className="py-[30px] text-text text-md-regular">{blogs.text}</p>
        <div className="py-[30px] text-text text-md-regular">
          <ul className="flex flex-col gap-[30px] list-disc">
            <li className="flex items-center gap-[10px]">
              Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.
            </li>
            <li className="flex items-center gap-[10px]">
              At urna condimentum mattis pellentesque id nibh.{" "}
            </li>
            <li className="flex items-center gap-[10px]">
              Laoreet non curabitur Magna etiam tempor orci eu lobortis
              elementum.{" "}
            </li>
            <li className="flex items-center gap-[10px]">
              Bibendum est ultricies integer quis. Semper eget duis at tellus.
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-10 border-l-8 border-blue-700 h-[127px] ">
          <Image
            className="col-span-1 w-12 h-12 pl-2"
            src={IconH}
            width={100}
            height={100}
            alt="haalt"
          />
          <p className="col-span-9 text-head text-lg-regular pr-32 items-center">
            Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Diam
            phasellus vestibulum lorem sed risus ultricies. Magna sit amet purus
            gravida quis blandit. Arcu cursus vitae congue mauris.
          </p>
        </div>
        <div className="py-[30px]">
          <p>
            Donec purus posuere nullam lacus aliquam egestas arcu. A egestas a,
            tellus massa, ornare vulputate. Erat enim eget laoreet ullamcorper
            lectus aliquet nullam tempus id. Dignissim convallis quam aliquam
            rhoncus, lectus nullam viverra. Bibendum dignissim tortor, phasellus
            pellentesque commodo, turpis vel eu. Donec consectetur ipsum nibh
            lobortis elementum mus velit tincidunt elementum. Ridiculus eu
            convallis eu mattis iaculis et, in dolor. Sem libero, tortor
            suspendisse et, purus euismod posuere sit. Risus dui ut viverra
            venenatis ipsum tincidunt non, proin. Euismod pharetra sit ac nisi.
            Erat lacus, amet quisque urna faucibus. Rhoncus praesent faucibus
            rhoncus nec adipiscing tristique sed facilisis velit. <br />
            <br />
            Neque nulla porta ut urna rutrum. Aliquam cursus arcu tincidunt mus
            dictum sit euismod cum id. Dictum integer ultricies arcu fermentum
            fermentum sem consectetur. Consectetur eleifend aenean eu neque
            euismod amet parturient turpis vitae. Faucibus ipsum felis et duis
            fames.
          </p>
        </div>
        <div className="flex justify-between gap-5">
          <div>
            <Image
              src={
                "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
              }
              alt="postSingle"
              width={410}
              height={350}
              className="w-full object-cover aspect-[1.3] rounded-2xl"
            />
            <p className="text-head text-md-medium pt-[13px]">
              Donec purus posuere nullam lacus aliquam
            </p>
          </div>
          <div>
            <Image
              src={
                "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
              }
              alt="postSingle"
              width={410}
              height={350}
              className="w-full object-cover aspect-[1.3/1] rounded-2xl"
            />
            <p className="text-head text-md-medium pt-[13px] pb-[30px]">
              Donec purus posuere nullam lacus aliquam.
            </p>
          </div>
        </div>
        <p>
          Donec purus posuere nullam lacus aliquam egestas arcu. A egestas a,
          tellus massa, ornare vulputate. Erat enim eget laoreet ullamcorper
          lectus aliquet nullam tempus id. Dignissim convallis quam aliquam
          rhoncus, lectus nullam viverra. Bibendum dignissim tortor, phasellus
          pellentesque commodo, turpis vel eu. Donec consectetur ipsum nibh
          lobortis elementum mus velit tincidunt elementum. Ridiculus eu
          convallis eu mattis iaculis et, in dolor. Sem libero, tortor
          suspendisse et, purus euismod posuere sit. Risus dui ut viverra
          venenatis ipsum tincidunt non, proin. Euismod pharetra sit ac nisi.
          Erat lacus, amet quisque urna faucibus. Rhoncus praesent faucibus
          rhoncus nec adipiscing tristique sed facilisis velit. <br /> <br />
          Neque nulla porta ut urna rutrum. Aliquam cursus arcu tincidunt mus
          dictum sit euismod cum id. Dictum integer ultricies arcu fermentum
          fermentum sem consectetur. Consectetur eleifend aenean eu neque
          euismod amet parturient turpis vitae. Faucibus ipsum felis et duis
          fames.
        </p>
        <div className="flex items-center justify-between py-[30px]">
          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-lg-medium">Share</p>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://facebook.com"
              target="_blank"
            >
              <ImFacebook />
            </Link>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://twitter.com"
              target="_blank"
            >
              <ImTwitter />
            </Link>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://instagram.com"
              target="_blank"
            >
              <BsInstagram />
            </Link>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://linkedin.com"
              target="_blank"
            >
              <ImLinkedin2 />
            </Link>
          </div>
          <div className="flex gap-2">
            <Link
              className="bg-text/40 py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
              href="/"
              target="_blank"
            >
              Courses
            </Link>
            <Link
              className="bg-text/40 py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
              href="/"
              target="_blank"
            >
              Learn
            </Link>
            <Link
              className="bg-text/40 py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
              href="/"
              target="_blank"
            >
              Online
            </Link>
            <Link
              className="bg-text/40 py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
              href="/"
              target="_blank"
            >
              LMS
            </Link>
          </div>
        </div>
        <div className="border-t-2 py-[30px]" />
        <div className="grid grid-cols-10">
          <div className="col-span-1 flex justify-center">
            <Image
              src={
                "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
              }
              alt="postSingle"
              width={500}
              height={500}
              className="w-12 h-12 rounded-full "
            />
          </div>
          <div className="col-span-9">
            <h3 className="text-head text-lg-medium pb-[5px]">
              Brooklyn Simmons
            </h3>
            <p className="text-text text-sm-regular pb-6">Medical Assistant</p>
            <p className="text-text text-md-regular pb-[30px]">
              Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies
              risus, vel rutrum erat commodo ut. Praesent finibus congue
              euismod. Nullam scelerisque massa vel augue placerat, a tempor sem
              egestas. Curabitur placerat finibus lacus.
            </p>
          </div>
        </div>
        <div className="border-t-2 py-[30px]" />
        <div className="grid grid-cols-3 items-center pb-8">
          <div>
            <div className="flex items-center text-lg-medium justify-start cursor-pointer hover:text-color-1 gap-2">
              <AiOutlineArrowLeft />
              <h3>Prev</h3>
            </div>

            <p>5 awesome steps to get rid of stress and routine</p>
          </div>
          <div className="flex items-center justify-center text-[#404046] text-3xl">
            <TbGridDots />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center text-lg-medium justify-end cursor-pointer hover:text-color-1 gap-2">
              <h3>Next</h3>
              <AiOutlineArrowRight />
            </div>

            <p className="flex text-end">
              Happy clients leave positive feedback less often{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-bg-1 pb-[120px] px-[300px]">
      <h1 className="text-center text-head text-3xl-bold pt-[120px] pb-[9px]">
        Related Posts
      </h1>
      <p className="text-center text-text text-md-regular pb-[60px]">
        10,000+ unique online course list designs
      </p>
      <div className="grid grid-cols-4 gap-6">
        <div>
          <Image
            src={
              "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
            }
            alt="postSingle"
            width={410}
            height={350}
            className="w-full object-cover aspect-[1.3/1] rounded-md"
          />
          <div>
            <p className="text-color-1 text-xs-medium pt-5">EDUCATION</p>
            <h1 className="text-lg-medium">
              Eco-Education in Our Lives: We Can Change the Future{" "}
            </h1>
            <p>December 16, 2022</p>
          </div>
        </div>
        <div>
          <Image
            src={
              "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
            }
            alt="postSingle"
            width={410}
            height={350}
            className="w-full object-cover aspect-[1.3/1] rounded-md"
          />
          <div>
            <p className="text-color-1 text-xs-medium pt-5">EDUCATION</p>
            <h1 className="text-lg-medium">
              Eco-Education in Our Lives: We Can Change the Future{" "}
            </h1>
            <p>December 16, 2022</p>
          </div>
        </div>
        <div>
          <Image
            src={
              "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
            }
            alt="postSingle"
            width={410}
            height={350}
            className="w-full object-cover aspect-[1.3/1] rounded-md"
          />
          <div>
            <p className="text-color-1 text-xs-medium pt-5">EDUCATION</p>
            <h1 className="text-lg-medium">
              Eco-Education in Our Lives: We Can Change the Future{" "}
            </h1>
            <p>December 16, 2022</p>
          </div>
        </div>
        <div>
          <Image
            src={
              "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
            }
            alt="postSingle"
            width={410}
            height={350}
            className="w-full object-cover aspect-[1.3/1] rounded-md"
          />
          <div>
            <p className=" text-color-1 text-xs-medium pt-5">EDUCATION</p>
            <h1 className="text-lg-medium">
              Eco-Education in Our Lives: We Can Change the Future{" "}
            </h1>
            <p className="text-sm-regular text-text">December 16, 2022</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SinglePostPage;
