import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import lightLogo from "./img/inf-dark.svg";
import darkLogo from "./img/inf-light.svg";

interface LogoProps {}

export const InformalLogo: React.FC<LogoProps> = () => {
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
      <Image
        src={lightSelected ? darkLogo : lightLogo}
        alt="Informal Systems"
        width={280}
        className="mr-12"
      />
    </div>
  );
};
