import { IUser } from '@/interfaces/user';
import Image from 'next/image';
import { FC } from 'react';

interface SinglePageInstructorContentProps {
  instuctor: IUser;
}

const SinglePageInstructorContent: FC<SinglePageInstructorContentProps> = ({ instuctor }) => (
  <div className="flex flex-col gap-[30px]">
    <h1 className="text-head text-xl font-medium leading-[23px]">Instructor</h1>
    <div className="flex items-center gap-5">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
        <Image
          alt="Instructor"
          src={instuctor.avatar}
          width={120}
          height={120}
          className="object-cover w-full aspect-square"
        />
      </div>
      <div>
        <h2 className="text-head text-lg-medium mb-[5px]">{instuctor.firstName}</h2>
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
      over 7 years, I have designed many high profile web and iPhone applications. The applications
      range from 3D medical aided web applications to project management applications for niche
      industries. I am also the founder of a large local design organization, Salt Lake Designers,
      where I and other local influencers help cultivate the talents of up and coming UX designers
      through workshops and panel discussions.
    </p>
  </div>
);

export default SinglePageInstructorContent;
