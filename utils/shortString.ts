import { address } from "@ton/ton";

export default (string: string, letter_count: number) => {
    return (
        string.substring(0, letter_count) +
        "..." +
        string.substring(string.length - letter_count)
    );
};
