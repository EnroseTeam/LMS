import { FC, useState } from 'react';

import { ICourse } from '@/interfaces/courses';
import { GrFormCheckmark } from 'react-icons/gr';
import { BsPlayFill } from 'react-icons/bs';
import Accordion from '../global/Accordion';
import Link from 'next/link';

import placeholder from '@/assets/placeholder.png';
import Image from 'next/image';
import RatingStar from '../global/RatingStar';
import ReviewCard from '../Reviews/ReviewCard';

interface SinglePageContentProps {
  course: ICourse;
}

const SinglePageContent: FC<SinglePageContentProps> = ({ course }) => {
  const [descriptionHide, setDescriptionHide] = useState(true);
  const [reviews, setReviews] = useState(course.reviews.slice(0, 2));

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

  const teacherContent = (
    <div className="flex flex-col gap-[30px]">
      <h1 className="text-head text-xl font-medium leading-[23px]">Instructor</h1>
      <div className="flex items-center gap-5">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
          <Image
            alt="Instructor"
            src={placeholder}
            width={120}
            height={120}
            className="object-cover w-full aspect-square"
          />
        </div>
        <div>
          <h2 className="text-head text-lg-medium mb-[5px]">Floyd Miles</h2>
          <p className="text-text text-md-regular mb-[11px]">President of Sales</p>
          <div className="flex items-center gap-5 text-text text-xs-regular">
            <span>Instructor Rating</span>
            <span>23.897 reviews</span>
            <span>692 students</span>
            <span>15 courses</span>
          </div>
        </div>
      </div>
      <p className="text-text text-md-regular">
        Back in 2010, I started brainspin with a desire to design compelling and engaging apps. For
        over 7 years, I have designed many high profile web and iPhone applications. The
        applications range from 3D medical aided web applications to project management applications
        for niche industries. I am also the founder of a large local design organization, Salt Lake
        Designers, where I and other local influencers help cultivate the talents of up and coming
        UX designers through workshops and panel discussions.
      </p>
    </div>
  );

  const reviewContent = (
    <div>
      <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Student Feedback</h1>
      <div className="flex items-center gap-[10px] mb-[60px]">
        <div className="bg-bg-3 rounded-lg py-[50px] px-[94px] grid place-items-center">
          <h3 className="text-head text-[60px] font-medium leading-[70px] mb-2">4.8</h3>
          <RatingStar count={4.8} />
          <p className="text-text text-md-regular mt-[10px]">Course Rating</p>
        </div>

        <div className="bg-bg-3 rounded-lg py-[15px] px-[30px] flex-1 flex flex-col gap-0 text-right">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative w-full h-[5px] rounded-[4px] bg-[#CCE0F8]">
              <div className="absolute top-0 left-0 w-[70%] h-full rounded-[4px] bg-color-1" />
            </div>
            <RatingStar count={5 * 0.7} />
            <p className="text-head text-md-regular leading-[40px] w-[4ch]">70%</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative w-full h-[5px] rounded-[4px] bg-[#CCE0F8]">
              <div className="absolute top-0 left-0 w-[15%] h-full rounded-[4px] bg-color-1" />
            </div>
            <RatingStar count={5 * 0.15} />
            <p className="text-head text-md-regular leading-[40px] w-[4ch]">15%</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative w-full h-[5px] rounded-[4px] bg-[#CCE0F8]">
              <div className="absolute top-0 left-0 w-[10%] h-full rounded-[4px] bg-color-1" />
            </div>
            <RatingStar count={5 * 0.1} />
            <p className="text-head text-md-regular leading-[40px] w-[4ch]">10%</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative w-full h-[5px] rounded-[4px] bg-[#CCE0F8]">
              <div className="absolute top-0 left-0 w-[3%] h-full rounded-[4px] bg-color-1" />
            </div>
            <RatingStar count={5 * 0.03} />
            <p className="text-head text-md-regular leading-[40px] w-[4ch]">3%</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative w-full h-[5px] rounded-[4px] bg-[#CCE0F8]">
              <div className="absolute top-0 left-0 w-[2%] h-full rounded-[4px] bg-color-1" />
            </div>
            <RatingStar count={5 * 0.02} />
            <p className="text-head text-md-regular leading-[40px] w-[4ch]">2%</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Reviews</h2>
        <div className="flex flex-col gap-[30px] mb-[30px]">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {course.reviews.length > 2 && (
          <div className="w-full text-center">
            <button
              onClick={(): void =>
                reviews.length > 2
                  ? setReviews(course.reviews.slice(0, 2))
                  : setReviews(course.reviews)
              }
              className="underline text-color-1 text-md-medium mb-[60px] hover:text-color-1/70 duration-300"
            >
              {reviews.length > 2 ? 'Hide reviews' : 'View all reviews'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const tabs: string[] = [
    'Дэлгэрэнгүй мэдээлэл',
    'Хичээлийн сэдвүүд',
    'Багшийн мэдээлэл',
    'Сэтгэгдлүүд',
  ];
  const tabContents: JSX.Element[] = [
    descriptionContent,
    sectionContent,
    teacherContent,
    reviewContent,
  ];

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
