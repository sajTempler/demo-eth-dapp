import {Component} from '@angular/core';
import {Web3Provider} from "../../providers/web3/web3";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    balance: Subject<string>;
    address: BehaviorSubject<string>;

    toAddress: string;
    amount: string;

    constructor(private web3: Web3Provider) {

    }

    ngOnInit() {
        this.address = this.web3.address;
        this.balance = this.web3.balance;
    }

    transferEth() {

        this.web3.eth.sendTransaction({
            from: this.web3.address.getValue(),
            to: this.toAddress,
            value: Web3Provider.toWei(this.amount),
            gasPrice: 50000000000,
            gas: 3000000
        })
            .then((res) => {
                console.log('success', res)
            })
            .catch((err) => {
                console.log('error', err)
            })

    }

}
