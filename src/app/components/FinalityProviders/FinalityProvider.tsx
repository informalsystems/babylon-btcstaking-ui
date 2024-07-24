import Image from "next/image";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

import blue from "@/app/assets/blue-check.svg";
import { getNetworkConfig } from "@/config/network.config";

import { Hash } from "../Hash/Hash";

interface FinalityProviderProps {
  pkHex: string;
  delegations: number;
  stakeSat: number;
  moniker?: string;
  totalActiveTVLSat?: number;
}

export const FinalityProvider: React.FC<FinalityProviderProps> = ({
  pkHex,
  delegations,
  moniker,
}) => {
  const generateFpNoInfoTooltip = (defaultValue: string, tooltip: string) => {
    return (
      <div className="flex items-center gap-2">
        <p>{defaultValue}</p>
        <span
          className="cursor-pointer text-xs"
          data-tooltip-id="tooltip-missing"
          data-tooltip-content={tooltip}
          data-tooltip-place="top"
        >
          <AiOutlineInfoCircle />
        </span>
      </div>
    );
  };

  const { coinName } = getNetworkConfig();

  return (
    <div className="lg:grid-cols-finalityProviders card grid grid-cols-2 gap-2 border bg-base-300 p-4 text-sm dark:border-0 dark:bg-base-200">
      <div className="flex gap-2">
        <FaBitcoin size={16} className="mt-1 text-primary" />
        <div className="flex flex-col">
          <div>
            {moniker ? (
              <div className="flex items-center gap-1">
                <p>{moniker}</p>
                <Image src={blue} alt="verified" />
              </div>
            ) : (
              generateFpNoInfoTooltip(
                "-",
                "Finality Provider has not provided additional information",
              )
            )}
          </div>
          <Hash value={pkHex} address small />
        </div>
      </div>
      <div>
        <p>{delegations}</p>
      </div>
      <Tooltip id="tooltip-missing" />
    </div>
  );
};
