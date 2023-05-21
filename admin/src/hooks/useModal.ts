import { ModalContext } from "@/contexts/ModalContext";
import { ReactNode, useContext } from "react";

interface ShowModalProps {
  title: string;
  content: ReactNode;
}

interface useModalReturnType {
  showModal: ({ title, content }: ShowModalProps) => void;
  closeModal: () => void;
}

export const useModal = (): useModalReturnType => {
  const { setShow, setTitle, setContent } = useContext(ModalContext);

  const showModal = ({ title, content }: ShowModalProps): void => {
    setTitle(title);
    setContent(content);
    setShow(true);
  };

  const closeModal = (): void => {
    setShow(false);
    setTitle("");
    setContent("");
  };

  return { showModal, closeModal };
};
