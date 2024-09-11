"use client";

import addressConfig from "@/config/addressConfig";
import { KeyType } from "@/types";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import { address } from "@ton/ton";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [inputAddresses, setInputAddresses] = useState("");
    const [outputAddresses, setOutputAddresses] = useState("");
    const [addressType, setAddressType] = useState("raw");
    const [copiedText, copy] = useCopyToClipboard();
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = () => {
        copy(outputAddresses);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };
    const convertAddress = (addresses: string) => {
        const listOfAddress = addresses.split("\n");
        let convertedText = "";
        for (const addr of listOfAddress) {
            try {
                const addressRAW = address(addr);
                let convertedAddr = "";
                if (addressType === "raw") {
                    convertedAddr = addressRAW.toRawString();
                } else {
                    convertedAddr = addressRAW.toString(
                        addressConfig[addressType as KeyType]
                    );
                }
                convertedText += convertedAddr + "\n";
            } catch (error) {
                if (addr !== "") {
                    convertedText += "error while converting: " + addr + "\n";
                }
            }
        }
        setOutputAddresses(convertedText);
    };

    useEffect(() => {
        convertAddress(inputAddresses);
    }, [inputAddresses, addressType]);

    return (
        <div className="flex flex-col items-center gap-y-4">
            <Textarea
                onChange={(e) => {
                    setInputAddresses(e.target.value);
                }}
                value={inputAddresses}
                label="Address"
                placeholder="Enter your addresses separated by newline"
            />
            <Select
                label="Type of address"
                placeholder="Select a type"
                className="max-w-xs"
                onChange={(e) => {
                    setAddressType(e.target.value);
                }}
                disallowEmptySelection
                defaultSelectedKeys={[addressType]}
            >
                <SelectItem key="raw">Raw</SelectItem>
                <SelectSection showDivider title="MAINNET">
                    <SelectItem key="mainnet-bounceable">Bounceable</SelectItem>
                    <SelectItem key="mainnet-none-bounceable">
                        None-Bounceable
                    </SelectItem>
                </SelectSection>
                <SelectSection title="TESTNET">
                    <SelectItem key="testnet-bounceable">Bounceable</SelectItem>
                    <SelectItem key="testnet-none-bounceable">
                        None-Bounceable
                    </SelectItem>
                </SelectSection>
            </Select>
            <Textarea
                label="Address"
                value={outputAddresses}
                placeholder="Output of converted addresses"
            />
            <Button
                isDisabled={isCopied}
                className="w-full"
                size="lg"
                onClick={copyToClipboard}
            >
                {isCopied ? "Copied!" : "Copy"}
            </Button>
        </div>
    );
};

export default Page;
