import { FC, useState } from 'react';

import { ICourse } from '@/interfaces/courses';
import { GrFormCheckmark } from 'react-icons/gr';
import { BsPlayFill } from 'react-icons/bs';
import Accordion from '../global/Accordion';
import Link from 'next/link';

interface SinglePageContentProps {
  course: ICourse;
}

const SinglePageContent: FC<SinglePageContentProps> = ({ course }) => {
  const [descriptionHide, setDescriptionHide] = useState(true);

  const descriptionContent = (
    <div className="flex flex-col gap-[60px]">
      <div>
        <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Тайлбар</h1>
        <div
          className={`text-text text-md-regular overflow-hidden mb-10 relative ${
            descriptionHide ? 'h-[260px]' : 'h-full'
          } `}
        >
          <div className="[&>p]:mb-4" dangerouslySetInnerHTML={{ __html: course.description }} />
          {descriptionHide && (
            <div className="absolute w-full bottom-0 left-0 right-0 h-full pointer-events-none text-fade" />
          )}
        </div>
        <p
          onClick={(): void => setDescriptionHide(!descriptionHide)}
          className="text-color-1 underline text-sm-medium cursor-pointer hover:text-color-1/70 duration-300"
        >
          {descriptionHide ? 'Дэлгэрэнгүй' : 'Хураангуй'}
        </p>
      </div>
      <div>
        <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">
          Суралцах чадварууд
        </h1>
        <div className="grid grid-cols-2 text-text text-md-regular">
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Become a UX designer.
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              You will be able to add UX designer to your CV
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Become a UI designer.
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Build & test a full website design.
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Create your first UX brief & persona.
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              How to use premade UI kits.
            </li>
          </ul>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Create quick wireframes.
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Downloadable exercise files
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Build a UX project from beginning to end.
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              Learn to design websites & mobile phone apps.
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              All the techniques used by UX professionals
            </li>
            <li className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              You will be able to talk correctly with other UX design.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">
          Шаардагдах чадварууд
        </h1>
        <ul className="flex flex-col gap-5 text-text text-md-regular">
          <li className="flex items-center gap-[10px]">
            <div className="w-[7px] h-[7px] rounded-full bg-icon" />
            You will need a copy of Adobe XD 2019 or above. A free trial can be downloaded from
            Adobe.
          </li>
          <li className="flex items-center gap-[10px]">
            <div className="w-[7px] h-[7px] rounded-full bg-icon" />
            No previous design experience is needed.
          </li>
          <li className="flex items-center gap-[10px]">
            <div className="w-[7px] h-[7px] rounded-full bg-icon" />
            No previous Adobe XD skills are needed.
          </li>
        </ul>
      </div>
    </div>
  );

  const sectionContent = (
    <div className="flex flex-col gap-[10px]">
      <Accordion
        header={
          <div className="flex items-center justify-between w-full">
            <h1 className="text-base-medium">Course Content</h1>
            <div className="text-text text-md-regular flex items-center">
              <p className='after:content-["•"] after:mx-2'>5 lectures</p>
              <p>87 min</p>
            </div>
          </div>
        }
        content={
          <div className="p-[30px] flex flex-col gap-5">
            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  What is UI vs UX - User Interface vs User Experience vs Product Designer
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>
          </div>
        }
      />

      <Accordion
        header={
          <div className="flex items-center justify-between w-full">
            <h1 className="text-base-medium">Course Content</h1>
            <div className="text-text text-md-regular flex items-center">
              <p className='after:content-["•"] after:mx-2'>5 lectures</p>
              <p>87 min</p>
            </div>
          </div>
        }
        content={
          <div className="p-[30px] flex flex-col gap-5">
            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  What is UI vs UX - User Interface vs User Experience vs Product Designer
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>
          </div>
        }
      />

      <Accordion
        header={
          <div className="flex items-center justify-between w-full">
            <h1 className="text-base-medium">Course Content</h1>
            <div className="text-text text-md-regular flex items-center">
              <p className='after:content-["•"] after:mx-2'>5 lectures</p>
              <p>87 min</p>
            </div>
          </div>
        }
        content={
          <div className="p-[30px] flex flex-col gap-5">
            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  What is UI vs UX - User Interface vs User Experience vs Product Designer
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>
          </div>
        }
      />

      <Accordion
        header={
          <div className="flex items-center justify-between w-full">
            <h1 className="text-base-medium">Course Content</h1>
            <div className="text-text text-md-regular flex items-center">
              <p className='after:content-["•"] after:mx-2'>5 lectures</p>
              <p>87 min</p>
            </div>
          </div>
        }
        content={
          <div className="p-[30px] flex flex-col gap-5">
            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  What is UI vs UX - User Interface vs User Experience vs Product Designer
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>
          </div>
        }
      />

      <Accordion
        header={
          <div className="flex items-center justify-between w-full">
            <h1 className="text-base-medium">Course Content</h1>
            <div className="text-text text-md-regular flex items-center">
              <p className='after:content-["•"] after:mx-2'>5 lectures</p>
              <p>87 min</p>
            </div>
          </div>
        }
        content={
          <div className="p-[30px] flex flex-col gap-5">
            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  What is UI vs UX - User Interface vs User Experience vs Product Designer
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>

            <Link href="/" className="flex items-center justify-between">
              <span className="flex items-center gap-[10px] w-[50%]">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular">
                  Introduction to the User Experience Course
                </h3>
              </span>
              <p className="text-text text-md-regular underline">03:56</p>
            </Link>
          </div>
        }
      />
    </div>
  );

  const tabs: string[] = [
    'Дэлгэрэнгүй мэдээлэл',
    'Хичээлийн сэдвүүд',
    'Багшийн мэдээлэл',
    'Сэтгэгдлүүд',
  ];
  const tabContents: JSX.Element[] = [descriptionContent, sectionContent];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="container py-[120px] grid grid-cols-3">
      <div className="flex flex-col items-start text-head text-xl-medium">
        {tabs.map((tab, index) => (
          <button
            key={`single-course-tab-${index}`}
            onClick={(): void => setActiveTab(tab)}
            className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
              activeTab === tab ? 'border-l-2 border-l-color-1 text-color-1' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="col-span-2">
        {tabContents.map((tabContent, index) => activeTab === tabs[index] && tabContent)}
      </div>
    </div>
  );
};

export default SinglePageContent;
