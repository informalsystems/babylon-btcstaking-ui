import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import lightLogo from "./img/inf-dark.svg";
import darkLogo from "./img/inf-light.svg";
import circleLogo from "./img/inf.png";

interface LogoProps {
  ImageWidth: number;
  circle?: boolean;
}

export const InformalLogo: React.FC<LogoProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const lightSelected = resolvedTheme === "light";

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // uses skeleton of babylon logo with primary color
  // since before theme is resolved, we don't know which logo to show
  if (!mounted) {
    return <div className="h-[40px] w-[159px]" />;
  }

  return (
    <div className="flex">
      {props.circle ? (
        <Image
          src={circleLogo}
          alt="Informal Systems"
          width={props.ImageWidth}
          className="mr-4"
        />
      ) : (
        <Image
          src={lightSelected ? darkLogo : lightLogo}
          alt="Informal Systems"
          width={props.ImageWidth}
          className=""
        />
      )}
    </div>
  );
};
