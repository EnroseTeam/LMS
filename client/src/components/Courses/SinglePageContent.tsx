import { FC, useState } from 'react';

import { ICourse } from '@/interfaces/courses';

interface SinglePageContentProps {
  course: ICourse;
}

const SinglePageContent: FC<SinglePageContentProps> = ({ course }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const descriptionContent = (
    <div className="flex flex-col gap-[60px]">
      <div>
        <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Тайлбар</h1>
        <div
          className="text-text text-md-regular [&>p]:mb-4 max-h-[260px] overflow-hidden mb-10"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
        <p className="text-color-1 underline text-sm-medium cursor-pointer hover:text-color-1/70 duration-300">
          Дэлгэрэнгүй
        </p>
      </div>
    </div>
  );

  return (
    <div className="container py-[120px] grid grid-cols-3">
      <div className="flex flex-col items-start text-head text-xl-medium">
        <button
          onClick={(): void => setActiveTab('Overview')}
          className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
            activeTab === 'Overview' ? 'border-l-2 border-l-color-1 text-color-1' : ''
          }`}
        >
          Дэлгэрэнгүй мэдээлэл
        </button>
        <button
          onClick={(): void => setActiveTab('Course Content')}
          className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
            activeTab === 'Course Content' ? 'border-l-2 border-l-color-1 text-color-1' : ''
          }`}
        >
          Хичээлийн сэдвүүд
        </button>
        <button
          onClick={(): void => setActiveTab('Instructors')}
          className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
            activeTab === 'Instructors' ? 'border-l-2 border-l-color-1 text-color-1' : ''
          }`}
        >
          Багшийн мэдээлэл
        </button>
        <button
          onClick={(): void => setActiveTab('Reviews')}
          className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
            activeTab === 'Reviews' ? 'border-l-2 border-l-color-1 text-color-1' : ''
          }`}
        >
          Сэтгэгдлүүд
        </button>
      </div>

      <div className="col-span-2">
        {activeTab === 'Overview' && descriptionContent}
        {activeTab === 'Course Content' && (
          <h1 className={`text-head text-xl font-medium leading-[23px] `}>Course Content</h1>
        )}
        {activeTab === 'Instructors' && (
          <h1 className={`text-head text-xl font-medium leading-[23px] `}>Instructors</h1>
        )}
        {activeTab === 'Reviews' && (
          <h1 className={`text-head text-xl font-medium leading-[23px] `}>Reviews</h1>
        )}
      </div>
    </div>
  );
};

export default SinglePageContent;
