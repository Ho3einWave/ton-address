import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface Account {
    address: string;
    balance: number;
    currencies_balance: CurrenciesBalance;
    last_activity: number;
    status: string;
    interfaces: string[];
    name: string;
    is_scam: boolean;
    icon: string;
    memo_required: boolean;
    get_methods: string[];
    is_suspended: boolean;
    is_wallet: boolean;
}

export interface CurrenciesBalance {}
