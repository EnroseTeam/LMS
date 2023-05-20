import { FC } from "react";
import AccordionAlternative from "@/components/global/AccordionAlternative";

const ContactUs: FC = () => (
  <>
    <div className="bg-bg-5">
      <div className="container grid grid-cols-1 xl:grid-cols-2 relative pt-[45px] sm:pt-[90px] xl:pt-[212px]">
        <div className="flex flex-col items-center xl:items-start gap-1 px-5 md:px-[70px]">
          <h1 className="font-[700] text-[40px] leading-[46px] text-center xl:text-left">
            Бидэнтэй холбогдох
          </h1>
          <p className="text-lg-regular text-text mb-[50px] xl:mb-[175px] text-center xl:text-left">
            We’re On A Mission To Deliver Engaging, Curated Courses At A
            Reasonable Price.
          </p>
        </div>
        <div className="xl:absolute bg-white flex flex-col rounded-lg top-[212px] right-0 p-[40px] shadow-shadow-3 mb-5 mx-5">
          <h3 className="text-2xl-medium mb-[25px] text-head">Мессеж Илгээх</h3>
          <p className="text-md-regular mb-[60px] text-text">
            Neque convallis a cras semper auctor. Libero id faucibus nisl
            tincidunt egetnvallis.
          </p>
          <form className="text-text text-md-regular">
            <div className="mb-4">
              <label
                className="block text-head text-base-medium mb-[9px]"
                htmlFor="username"
              >
                Нэр
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-[15px] px-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-color-1"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-head text-base-medium mb-[9px]"
                htmlFor="email"
              >
                И-мэйл хаяг
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-[15px] px-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-color-1"
                id="email"
                type="text"
                placeholder="pinecone@pinecone.com"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-head text-base-medium mb-[9px]"
                htmlFor="message"
              >
                Мессеж
              </label>
              <textarea
                className="appearance-none border rounded-lg w-full py-[15px] px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-color-1 resize-none"
                id="message"
                rows={10}
              />
            </div>
            <button className="bg-color-1 text-white text-base- px-[55px] py-[21px] rounded-lg">
              Илгээх
            </button>
          </form>
        </div>
      </div>
    </div>
    <div className="container px-[70px] mb-[60px] md:mb-[124px] pt-[90px] grid grid-cols-1 xl:grid-cols-2">
      <div>
        <h3 className="text-2xl-medium text-head mb-[40px]">Манай Оффисууд</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[90px] gap-y-[40px]">
          <div>
            <h4 className="text-head text-[20px] font-[500] leading-[23px] mb-[20px]">
              Улаанбаатар
            </h4>
            <div className="text-text text-md-regular flex flex-col gap-[10px]">
              <span>
                328 Queensberry Street, North Melbourne VIC 3051, Australia.
              </span>
              <span>+(1) 123 456 7890</span>
              <span>hi@educrat.com</span>
            </div>
          </div>

          <div>
            <h4 className="text-head text-[20px] font-[500] leading-[23px] mb-[20px]">
              Улаанбаатар
            </h4>
            <div className="text-text text-md-regular flex flex-col gap-[10px]">
              <span>
                328 Queensberry Street, North Melbourne VIC 3051, Australia.
              </span>
              <span>+(1) 123 456 7890</span>
              <span>hi@educrat.com</span>
            </div>
          </div>

          <div>
            <h4 className="text-head text-[20px] font-[500] leading-[23px] mb-[20px]">
              Улаанбаатар
            </h4>
            <div className="text-text text-md-regular flex flex-col gap-[10px]">
              <span>
                328 Queensberry Street, North Melbourne VIC 3051, Australia.
              </span>
              <span>+(1) 123 456 7890</span>
              <span>hi@educrat.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-bg-1" id="faq">
      <div className="container px-[50px] md:[100px] py-[60px] lg:px-[170px] xl:px-[270px] md:py-[120px]">
        <h1 className="text-center text-head text-3xl-bold mb-[9px]">
          Түгээмэл Асуултууд
        </h1>
        <p className="text-center text-md-regular text-text mb-[60px]">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco
        </p>
        <div className="flex flex-col gap-5">
          <AccordionAlternative
            header="Do you offer discounts for students?"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
          />
          <AccordionAlternative
            header="Do you offer special pricing for big teams?"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
          />
          <AccordionAlternative
            header="What is the past experience of your teachers?"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
          />
          <AccordionAlternative
            header="What is the course refund policy?"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
          />

          <AccordionAlternative
            header="Do you offer discounts for non-profits?"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
          />
        </div>
      </div>
    </div>
  </>
);

export default ContactUs;
