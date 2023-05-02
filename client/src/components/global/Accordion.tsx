import { FC, useEffect, useState } from "react";

import { BiChevronUp } from "react-icons/bi";

interface AccordionProps {
  header: JSX.Element;
  content: JSX.Element;
  state?: boolean;
}

const Accordion: FC<AccordionProps> = ({ content, header, state = false }) => {
  const [show, setShow] = useState(state);

  useEffect(() => {
    setShow(state);
  }, [state]);

  return (
    <div className="border border-border-1 rounded-lg overflow-hidden">
      <button
        onClick={(): void => setShow(!show)}
        className={`bg-bg-1 w-full px-[30px] py-4 flex items-center gap-2 duration-300 text-head ${
          show ? "border-b border-b-border-1" : ""
        }`}
      >
        <BiChevronUp
          size={20}
          className={`${show ? "" : "rotate-180"} duration-300`}
        />
        {header}
      </button>
      <div
        className={`${
          show ? "max-h-[1000px]" : "max-h-0"
        } w-full bg-white duration-300`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
