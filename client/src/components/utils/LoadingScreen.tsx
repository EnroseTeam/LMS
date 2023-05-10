import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";

const LoadingScreen: FC = () => {
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setShow(true);
    });
    router.events.on("routeChangeComplete", () => {
      setShow(false);
    });
    router.events.on("routeChangeError", () => {
      setShow(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setShow(true);
      });
      router.events.off("routeChangeComplete", () => {
        setShow(false);
      });
      router.events.off("routeChangeError", () => {
        setShow(false);
      });
    };
  }, [router]);

  return (
    <div
      className={classNames(
        "fixed top-0 right-0 left-0 bottom-0 min-w-screen min-h-screen grid place-items-center z-[9999] bg-black/20 duration-300",
        { "opacity-100": show },
        { "opacity-0 pointer-events-none": !show }
      )}
    >
      <span className="loader" />
    </div>
  );
};

export default LoadingScreen;
