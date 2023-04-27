import { FC, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaMinus } from "react-icons/fa";

interface AccordionAlternativeProps {
  header: string;
  content: string;
  state?: boolean;
}

const AccordionAlternative: FC<AccordionAlternativeProps> = ({
  header,
  content,
  state = false,
}) => {
  const [show, setShow] = useState(state);
  return (
    <div className="rounded-[16px] bg-white shadow-shadow-dashboard p-[21px]">
      <button
        onClick={(): void => setShow(!show)}
        className="flex items-center gap-[22px] text-lg-medium text-head"
      >
        {show && (
          <div className="bg-color-1 rounded-full p-[13px] text-white">
            <AiOutlineMinus />
          </div>
        )}
        {!show && (
          <div className="bg-bg-2 rounded-full p-[13px] text-color-1">
            <AiOutlinePlus />
          </div>
        )}
        {header}
      </button>
      <div
        className={`${
          show ? "max-h-[1000px] opacity-100 py-[29px]" : "max-h-0 opacity-0"
        } px-[64px] text-md-regular text-text duration-150`}
      >
        {content}
      </div>
    </div>
  );
};

export default AccordionAlternative;
