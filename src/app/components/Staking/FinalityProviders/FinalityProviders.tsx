import { useEffect } from "react";

import { LoadingView } from "@/app/components/Loading/Loading";
import { QueryMeta } from "@/app/types/api";
import { FinalityProvider as FinalityProviderInterface } from "@/app/types/finalityProviders";

import { FinalityProvider } from "./FinalityProvider";

interface FinalityProvidersProps {
  finalityProviders: FinalityProviderInterface[] | undefined;
  selectedFinalityProvider: FinalityProviderInterface | undefined;
  // called when the user selects a finality provider
  onFinalityProviderChange: (btcPkHex: string) => void;
  queryMeta: QueryMeta;
}

// Staking form finality providers
export const FinalityProviders: React.FC<FinalityProvidersProps> = ({
  finalityProviders,
  selectedFinalityProvider,
  onFinalityProviderChange,
  queryMeta,
}) => {
  useEffect(() => {
    const runOnLoad = () => {
      if (finalityProviders) {
        console.log(
          "Set Finality Provider: Informal Systems... ",
          finalityProviders![0].btcPk,
        );
        onFinalityProviderChange(`${process.env.NEXT_PUBLIC_FP_BTC_PK}`);
      }
    };
    runOnLoad();
  }, [onFinalityProviderChange, finalityProviders]);

  // If there are no finality providers, show loading
  if (!finalityProviders || finalityProviders.length === 0) {
    return <LoadingView />;
  }

  return (
    <>
      <div className="hidden gap-2 px-4 lg:grid lg:grid-cols-stakingFinalityProvidersDesktop">
        <p>Finality Provider</p>
        <p>BTC Pubkey</p>
        <p>Total Delegation</p>
        <p>Commission</p>
      </div>
      <div
        id="finality-providers"
        className="no-scrollbar max-h-[21rem] overflow-y-auto"
      >
        {finalityProviders?.map((fp) => (
          <div key={fp.btcPk}>
            <FinalityProvider
              key={fp.btcPk}
              moniker={fp.description?.moniker}
              pkHex={fp.btcPk}
              stakeSat={fp.activeTVLSat}
              commission={fp.commission}
              selected={selectedFinalityProvider?.btcPk === fp.btcPk}
              onClick={() => {
                onFinalityProviderChange(fp.btcPk);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
