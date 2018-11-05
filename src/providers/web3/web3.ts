import {Injectable, OnDestroy} from '@angular/core';
import Utils from 'web3-utils';
import Eth from 'web3-eth';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {AddressPipe} from "../../pipes/address/address.pipe";

import HookedWeb3Provider from 'hooked-web3-provider';

/*
  Generated class for the Web3Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Web3Provider implements OnDestroy {

    public address: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public balance: BehaviorSubject<string> = new BehaviorSubject('');

    public eth: Eth;
    private balancePuller;

    ngOnDestroy(): void {
        if (this.balancePuller) {
            clearInterval(this.balancePuller);
        }
    }

    createProvider(ks: any): void {
        this.address.next('0x' + ks.addresses[0]);

        const provider = new HookedWeb3Provider({
            host: "https://ropsten.infura.io/",
            transaction_signer: ks,
        });

        this.eth = new Eth(provider);

        if (!this.balancePuller) {
            this.updateBalance(this.address.getValue())
            this.balancePuller = setInterval(() => {
                this.updateBalance(this.address.getValue())
            }, 5000);
        }
    }

    public async updateBalance(address: string): Promise<void> {
        const balance = await this.eth.getBalance(address);
        const formattedBalance = Web3Provider.formatBalance(balance);
        this.balance.next(formattedBalance);
    }

    public static formatBalance(balance): string {
        return Number(Utils.fromWei(balance, 'ether')).toFixed(6);
    }

    public static toWei(balance): string {
        return Number(Utils.toWei(balance, 'ether')).toString();
    }

}
