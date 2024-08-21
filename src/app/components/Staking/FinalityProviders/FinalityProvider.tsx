import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiGlobe } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

import { Hash } from "@/app/components/Hash/Hash";
import { getNetworkConfig } from "@/config/network.config";
import { satoshiToBtc } from "@/utils/btcConversions";
import { maxDecimals } from "@/utils/maxDecimals";

import { InformalLogo } from "./InformalLogo";

interface FinalityProviderProps {
  moniker: string;
  pkHex: string;
  stakeSat: number;
  commission: string;
  onClick: () => void;
  selected: boolean;
  website?: string;
}

export const FinalityProvider: React.FC<FinalityProviderProps> = ({
  moniker,
  pkHex,
  stakeSat,
  commission,
  onClick,
  selected,
  website,
}) => {
  const generalStyles =
    "card relative cursor-pointer border bg-base-300 pl-4 pr-4 pt-8 pb-12 text-sm transition-shadow hover:shadow-md dark:border-transparent dark:bg-base-200";

  const { coinName } = getNetworkConfig();

  const finalityProviderHasData = moniker && pkHex && commission;

  const handleClick = () => {
    if (finalityProviderHasData) {
      onClick();
    }
  };

  return (
    <div
      className={`
        ${generalStyles}
        ${selected ? "fp-selected" : ""}
        ${finalityProviderHasData ? "" : "opacity-50 pointer-events-none"}
        `}
      onClick={handleClick}
    >
      <div className="grid grid-cols-4">
        <div className="col-span-2">
          {finalityProviderHasData ? (
            <div className="flex items-center justify-start p-4">
              <InformalLogo ImageWidth={70} circle />
              <InformalLogo ImageWidth={108} />
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary btn btn-outline btn-xs ml-2 p-0 h-6 w-6"
                >
                  <FiGlobe />
                </a>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 justify-start">
              <span
                className="cursor-pointer text-xs text-error"
                data-tooltip-id="tooltip-missing-fp"
                data-tooltip-content="This finality provider did not provide any information."
                data-tooltip-place="top"
              >
                <AiOutlineInfoCircle size={16} />
              </span>
              <Tooltip id="tooltip-missing-fp" />
              <span>No data provided</span>
            </div>
          )}
        </div>
        <div className="col-span-2 pt-8">
          <p className="font-bold">BTC Pubkey</p>
          <Hash value={pkHex} address small noFade trimAmount={30} />
        </div>
        <div className="col-span-2 pt-4 pl-4">
          <p className="font-bold text-lg">
            Total Delegations: {maxDecimals(satoshiToBtc(stakeSat), 8)}{" "}
            {coinName}
          </p>
        </div>
        <div className="col-span-2 pt-4">
          <p className="font-bold text-lg">
            Commission:{" "}
            {finalityProviderHasData
              ? `${maxDecimals(Number(commission) * 100, 2)}%`
              : "-"}
          </p>
        </div>
        <div className="col-span-4"></div>
      </div>
    </div>
  );
};
