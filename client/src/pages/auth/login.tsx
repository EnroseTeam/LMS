import LoginForm from "@/components/auth/LoginForm";
import LoginNavbar from "@/components/auth/LoginNavbar";
import Image from "next/image";
import { FC } from "react";
import bgPic from "../../assets/bg.png";
import bgPic1 from "../../assets/Group9.png";
import bgPic2 from "../../assets/Group10.png";
import bgPic3 from "../../assets/Group11.png";
import logoImg from "../../assets/logo-main.svg";

const Login: FC = () => (
  <div className="grid grid-cols-3 h-screen">
    <div className="col-span-1 flex flex-col items-center justify-center bg-head h-full relative">
      <div className="top-[33px] left-[60px] absolute">
        <Image src={logoImg} width={134} height={50} alt="zurag" />
      </div>
      <div>
        <Image
          src={bgPic1}
          width={86}
          height={86}
          alt="zurag"
          className="absolute top-[430px] left-[150px] z-10"
        />
        <Image
          src={bgPic2}
          width={86}
          height={86}
          alt="zurag"
          className="absolute top-[430px] left-[450px] z-10"
        />
        <Image
          src={bgPic3}
          width={86}
          height={86}
          alt="zurag"
          className="absolute top-[700px] left-[450px] z-10"
        />
        <Image
          src={bgPic}
          width={527}
          height={590}
          alt="zurag"
          className="relative"
        />
      </div>
    </div>
    <div className="col-span-2 bg-bg-5 h-full w-full grid place-items-center relative">
      <div className="top-[33px] right-[60px] absolute">
        <LoginNavbar />
      </div>
      <div className="py-[178px] px-[338px] ">
        <LoginForm />
      </div>
    </div>
  </div>
);

export default Login;
