import Image from 'next/image';
import { FC } from 'react';
import placeHolderImg from '../../assets/placeholder.png';

const UsersCommentSection: FC = () => (
  <div className="bg-color-1 pt-[120px] pb-[112px] text-white">
    <div className="container">
      <div className="text-center mb-[51px]">
        <h1 className="text-color-6 text-3xl-bold mb-[10px]">What People Say</h1>
        <p className="text-md-regular">Lorem ipsum dolor sit amet, consectetur.</p>
      </div>

      <div className="grid grid-cols-3 gap-[30px] mb-[226px]">
        <div className="bg-white rounded-lg overflow-hidden p-[30px] pb-[20px]">
          <h1 className="text-color-1 text-xl-medium mb-[14px]">Great Work</h1>
          <p className="text-head text-md-medium leading-[30px] mb-[26px]">
            “I think Educrat is the best theme I ever seen this year. Amazing design, easy to
            customize and a design quality superlative account on its cloud platform for the
            optimized performance”
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

        <div className="bg-white rounded-lg overflow-hidden p-[30px] pb-[20px]">
          <h1 className="text-color-1 text-xl-medium mb-[14px]">Great Work</h1>
          <p className="text-head text-md-medium leading-[30px] mb-[26px]">
            “I think Educrat is the best theme I ever seen this year. Amazing design, easy to
            customize and a design quality superlative account on its cloud platform for the
            optimized performance”
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

        <div className="bg-white rounded-lg overflow-hidden p-[30px] pb-[20px]">
          <h1 className="text-color-1 text-xl-medium mb-[14px]">Great Work</h1>
          <p className="text-head text-md-medium leading-[30px] mb-[26px]">
            “I think Educrat is the best theme I ever seen this year. Amazing design, easy to
            customize and a design quality superlative account on its cloud platform for the
            optimized performance”
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
      </div>

      <div className="grid grid-cols-4 text-center">
        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">350,000+</h1>
          <p className="text-md-regular">Students worldwide</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">496,000+</h1>
          <p className="text-md-regular">Total course views</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">19,000+</h1>
          <p className="text-md-regular">Five-star course reviews</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">987,000+</h1>
          <p className="text-md-regular">Students community</p>
        </div>
      </div>
    </div>
  </div>
);

export default UsersCommentSection;
