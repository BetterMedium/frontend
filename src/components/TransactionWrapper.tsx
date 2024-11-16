"use client";
import type {
  TransactionError,
  TransactionResponse,
} from "@coinbase/onchainkit/transaction";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { Address, ContractFunctionParameters } from "viem";
import {
  BASE_SEPOLIA_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from "../constants";

export default function TransactionWrapper({
  address,
  onSuccess,
}: {
  address: Address;
  onSuccess: Function;
}) {
  const contracts = [
    {
      address: mintContractAddress,
      abi: mintABI,
      functionName: "mint",
      args: [address],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error("Transaction error:", err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log("Transaction successful", response);
    onSuccess();
  };

  return (
    <div className="flex w-[250px]">
      <Transaction
        contracts={contracts}
        className="w-[250px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton className="bg-slate-900 text-[#030712] hover:bg-slate-700 mt-10 mr-auto ml-auto w-[250px] max-w-full rounded-3xl font-['Inter']" />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
