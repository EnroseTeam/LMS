import { FC } from 'react';
import placeHolderImg from '@/assets/placeholder.png';
import Image from 'next/image';

const UserCommentCard: FC = () => (
  <div className="bg-white rounded-lg overflow-hidden p-[30px] pb-[20px]">
    <h1 className="text-color-1 text-xl-medium mb-[14px]">Great Work</h1>
    <p className="text-head text-md-medium leading-[30px] mb-[26px]">
      “I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize
      and a design quality superlative account on its cloud platform for the optimized performance”
    </p>

    <div className="flex items-center gap-5 border-t border-t-border-1 pt-5">
      <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
        <Image src={placeHolderImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div>
        <h1 className="text-head text-md-medium mb-1">Courtney Henry</h1>
        <p className="text-text text-xs-regular">Web Designer</p>
      </div>
    </div>
  </div>
);

export default UserCommentCard;
