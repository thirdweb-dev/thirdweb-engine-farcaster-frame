import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";
import { httpFetchBalanceStatus, httpMint } from "@/api/fetchers";

export class ThirdWebEngine {
  public static isBalanceLow = async () => {
    const { result } = await httpFetchBalanceStatus();
    const formattedEther = ethers.utils.formatEther(result.value);
    const totalFormattedBalance = BigNumber(formattedEther).dp(4).toNumber();
    return totalFormattedBalance < 0.01;
  };

  public static mint = async (receiver: string) => {
    const response = await httpMint(receiver);
    return response;
  };
}
