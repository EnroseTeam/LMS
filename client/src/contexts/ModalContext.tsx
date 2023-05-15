import Modal from "@/components/utils/Modal";
import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextTypes {
  show: boolean;
  title: string;
  content: ReactNode;
  setShow: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<ReactNode>>;
}

export const ModalContext = createContext<ModalContextTypes>({} as ModalContextTypes);

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<ReactNode>("");

  const value = {
    show,
    setShow,
    title,
    setTitle,
    content,
    setContent,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal show={show} setShow={setShow} title={title} content={content} />
    </ModalContext.Provider>
  );
};
