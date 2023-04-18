import Link from 'next/link';
import { FC } from 'react';

import { BsPlayFill } from 'react-icons/bs';
import Accordion from '../global/Accordion';

const SinglePageSectionContent: FC = () => (
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

export default SinglePageSectionContent;
