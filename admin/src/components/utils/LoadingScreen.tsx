import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

const LoadingScreen: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

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
        "fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white/25",
        { block: show },
        { hidden: !show }
      )}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
    </div>
  );
};

export default LoadingScreen;
