import { InformalLogo } from "./InformalLogo";

export const Intro: React.FC = () => {
  return (
    <div className="rounded-xl gap-4 bg-base-300 p-1 shadow-sm lg:flex-row lg:justify-between">
      <div className="p-12">
        <div className="grid grid-cols-10 justify-center items-center">
          <div className="col-span-10 pl-8 pr-0 mr-0">
            <h2 className="pb-2 pl-2 italic text-sm">
              Earn yield, stake Bitcoin through Babylon with
            </h2>
          </div>
          <div className="col-span-4 pl-8 pr-0 mr-0">
            <InformalLogo />
          </div>
          <div className="col-span-6">
            <p className="italic text-xl pl-8">
              Enterprise-grade staking infrastructure with a focus on security
              and support for both networks and delegators since 2018.
            </p>
          </div>
          <div className="col-span-4 pl-8 pr-0 mr-0">
            <a
              className="pb-2 pl-24 italic text-xs"
              href="https://github.com/babylonlabs-io/simple-staking"
              target="_blank"
            >
              built with Babylon Staking Dapp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
