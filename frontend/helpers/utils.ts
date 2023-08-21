import { BigNumber, BigNumberish } from "ethers/utils";
import { utils } from "ethers";


export function toGwei(gasPrice: string): string{
    return utils.formatUnits(gasPrice, 'gwei');
}

export function toWei(val: string, decimal: number = 18): BigNumber {
    return utils.parseUnits(val, decimal);
}

export function fromWei(val: string, decimal: number = 18): string {
    return utils.formatUnits(val, decimal);
}

export function toBN(value: BigNumberish): BigNumber {
    return new BigNumber(value);
}