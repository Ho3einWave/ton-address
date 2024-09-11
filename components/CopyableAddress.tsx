import { useCopyToClipboard } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { MdOutlineCheck } from "react-icons/md";

const CopyableAddress = ({ address, children }: { address: string; children: any }) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const copyIt = () => {
    copyToClipboard(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="flex items-center gap-x-1 group font-mono ">
      {children}{" "}
      <button className="text-sm text-foreground-500/50 cursor-pointer " onClick={copyIt}>
        {copied ? <MdOutlineCheck /> : <FaCopy />}
      </button>
    </div>
  );
};

export default CopyableAddress;
