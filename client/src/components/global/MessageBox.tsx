import { FC, useEffect, useState } from "react";

interface MessageBoxProps {
  type?: "Info" | "Warning" | "Error" | "Success";
  message?: string;
  className?: string;
}

const MessageBox: FC<MessageBoxProps> = ({
  type = "Success",
  message = "",
  className = "",
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("#DEF2D7");
  const [errorTitle, setErrorTitle] = useState<string>("Амжилттай");
  const [textColor, setTextColor] = useState<string>("#5B7052");

  useEffect(() => {
    switch (type) {
      case "Error":
        setBackgroundColor("#ECC8C5");
        setErrorTitle("Алдаа");
        setTextColor("#AB3331");
        break;
      case "Info":
        setBackgroundColor("#CDE9F6");
        setErrorTitle("Мэдэгдэл");
        setTextColor("#4780AA");
        break;
      case "Warning":
        setBackgroundColor("#F7F3D7");
        setErrorTitle("Анхааруулга");
        setTextColor("#927238");
    }
  }, [type]);

  return (
    <div
      className={`rounded-[4px] px-[30px] py-[26px] text-md-medium ${className}`}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <p>
        {errorTitle}: {message}
      </p>
    </div>
  );
};

export default MessageBox;
