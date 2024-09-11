"use client";

import Lottie from "lottie-react";
import GemAnim from "@/assets/gem.json";
import { Input } from "@nextui-org/input";
import { useEffect, useMemo, useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import { address, fromNano } from "@ton/ton";
import shortString from "@/utils/shortString";
import CopyableAddress from "@/components/CopyableAddress";
import { useMediaQuery } from "usehooks-ts";
import axios from "axios";
import { Account } from "@/types";

export default function Home() {
  const isLargeDevice = useMediaQuery("only screen and (min-width : 768px) ", {
    initializeWithValue: true
  });
  const [userAddress, setUserAddress] = useState("");
  const [resultAddress, setResultAddress] = useState<
    | {
        valid: boolean;
        raw: string;
        mainnet: {
          bounceable: string;
          none_bounceable: string;
        };
        testnet: {
          bounceable: string;
          none_bounceable: string;
        };
        account: Account;
      }
    | { valid: false }
  >({ valid: false });
  const addresses = async () => {
    try {
      const addr = address(userAddress);
      const account = (await axios.get<Account>(`https://tonapi.io/v2/accounts/${addr.toRawString()}`)).data;
      setResultAddress({
        valid: true,
        raw: addr.toRawString(),
        mainnet: {
          bounceable: addr.toString({ bounceable: true }),
          none_bounceable: addr.toString({ bounceable: false })
        },
        testnet: {
          bounceable: addr.toString({
            bounceable: true,
            testOnly: true
          }),
          none_bounceable: addr.toString({
            bounceable: false,
            testOnly: true
          })
        },
        account
      });
    } catch (error) {
      return { valid: false };
    }
  };

  useEffect(() => {
    addresses();
  }, [userAddress]);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <Lottie animationData={GemAnim} className="h-[150px] w-[150px]" />
        <h1 className="text-xl font-black">TON Address Converter</h1>

        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          value={userAddress}
          size="sm"
          label="Address"
          className="w-[20rem] lg:w-[40rem]"
        />
      </div>
      {resultAddress.valid && (
        <>
          <Avatar style={{ width: "3rem", height: "3rem" }} {...genConfig(resultAddress.raw)} />
          <div className="text-center">
            <div>Balance: {fromNano(resultAddress.account.balance)} TON</div>
            <div>Status: {resultAddress.account.status}</div>
            <div>
              Last Activity:{" "}
              {resultAddress.account.last_activity === 0
                ? "Haven't been active"
                : new Date(resultAddress.account.last_activity * 1000).toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col text-center">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">RAW ADDRESS</h1>
            <p className="text-md">
              <CopyableAddress address={resultAddress.raw!}>
                {isLargeDevice ? resultAddress.raw : shortString(resultAddress.raw!, 8)}
              </CopyableAddress>
            </p>
          </div>
          <div>
            <h3 className="rounded-full text-center text-xl font-bold uppercase text-blue-500">MAINNET</h3>

            <div>
              <p className="flex flex-col items-center gap-x-1 text-center font-mono text-sm">
                <span className="text-nowrap text-foreground-500/70">Bounceable</span>
                <span>
                  <CopyableAddress address={resultAddress.mainnet?.bounceable!}>
                    {isLargeDevice
                      ? resultAddress.mainnet?.bounceable!
                      : shortString(resultAddress.mainnet?.bounceable!, 8)}
                  </CopyableAddress>
                </span>
              </p>
              <p className="flex flex-col items-center gap-x-1 text-center font-mono text-sm">
                <span className="text-nowrap text-foreground-500/70">None-Bounceable</span>
                <CopyableAddress address={resultAddress.mainnet?.none_bounceable!}>
                  {isLargeDevice
                    ? resultAddress.mainnet?.none_bounceable!
                    : shortString(resultAddress.mainnet?.none_bounceable!, 8)}
                </CopyableAddress>
              </p>
            </div>
          </div>

          <div>
            <h3 className="rounded-full text-center text-xl font-bold uppercase text-yellow-500">TESTNET</h3>
            <div className="p-2">
              <p className="flex flex-col items-center gap-x-1 font-mono text-sm">
                <span className="text-nowrap text-foreground-500/70">Bounceable</span>
                <CopyableAddress address={resultAddress.testnet?.bounceable!}>
                  {isLargeDevice
                    ? resultAddress.testnet?.bounceable!
                    : shortString(resultAddress.testnet?.bounceable!, 8)}
                </CopyableAddress>
              </p>
              <p className="flex flex-col items-center gap-x-1 font-mono text-sm">
                <span className="text-nowrap text-foreground-500/70">None-Bounceable</span>
                <CopyableAddress address={resultAddress.testnet?.none_bounceable!}>
                  {" "}
                  {isLargeDevice
                    ? resultAddress.testnet?.none_bounceable!
                    : shortString(resultAddress.testnet?.none_bounceable!, 8)}
                </CopyableAddress>
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
