import { FC, Dispatch, SetStateAction, ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import classNames from "classnames";

interface ModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: string;
  content: ReactNode;
}

const Modal: FC<ModalProps> = ({ show, setShow, title, content }) => (
  <>
    <div
      onClick={(): void => {
        setShow(false);
      }}
      className={classNames(
        "z-[999] fixed top-0 left-0 right-0 bottom-0 min-h-screen min-w-screen grid place-items-center",
        { block: show },
        { hidden: !show }
      )}
    >
      <div
        onClick={(e): void => {
          e.stopPropagation();
        }}
        className="p-4 max-h-full overflow-y-auto min-w-[500px]"
      >
        <div className="relative max-w-[1000px]">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h2 className="text-lg-medium text-head">{title}</h2>
              <button
                onClick={(): void => {
                  setShow(false);
                }}
                className="text-xl text-head hover:text-icon duration-300"
              >
                <IoCloseOutline />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6">{content}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      onClick={(): void => {
        setShow(false);
      }}
      className={classNames(
        "fixed top-0 left-0 right-0 bottom-0 min-h-screen min-w-screen bg-black/20 z-50",
        { block: show },
        { hidden: !show }
      )}
    />
  </>
);

export default Modal;
