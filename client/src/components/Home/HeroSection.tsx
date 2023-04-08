import { FC } from 'react';
import Button from '../Button';
import Image from 'next/image';

import { SlGraduation } from 'react-icons/sl';
import { CgPlayButtonR } from 'react-icons/cg';
import { BsLaptop } from 'react-icons/bs';
import heroImage from '../../assets/hero-2.jpg';

const HeroSection: FC = () => (
  <div className="relative overflow-hidden w-full bg-head pt-[55px] pb-[136px] hero">
    <div className="container flex items-center gap-[139px]">
      <div className="w-[70ch] text-white">
        <h1 className="select-none text-[55px] font-bold leading-[80px] mb-3">
          Learn New Skills Online with Top{' '}
          <span className="text-color-6 underline">IntelliSense</span>
        </h1>
        <p className="select-none text-lg-regular mb-[27px] w-[50ch]">
          Build skills with courses, certificates, and degrees online from world-class universities
          and companies.
        </p>

        <div className="flex items-center gap-5 text-base-medium mb-[84px]">
          <Button className="bg-color-1 hover:bg-color-1/70 duration-300">Join For Free</Button>
          <Button className="text-color-6 border-2 border-color-6 hover:bg-color-6/90 hover:text-white hover:border-transparent duration-300">
            Find Courses
          </Button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xl">
            <SlGraduation />
            <p className="text-md-medium">Over 12 million students</p>
          </div>

          <div className="flex items-center gap-2 text-xl">
            <CgPlayButtonR />
            <p className="text-md-medium">More than 60,000 courses</p>
          </div>

          <div className="flex items-center gap-2 text-xl">
            <BsLaptop />
            <p className="text-md-medium">Learn anything online</p>
          </div>
        </div>
      </div>

      <div className="w-[40%]">
        <div className="rounded-lg overflow-hidden">
          <Image src={heroImage} alt="hero" className="aspect-video object-cover" />
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
