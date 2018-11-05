import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {WalletProvider} from "../../providers/wallet/wallet";
import {Web3Provider} from "../../providers/web3/web3";

/**
 * Generated class for the AccountImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-account-import',
    templateUrl: 'account-import.html',
})
export class AccountImportPage {

    private seed: string;
    private password: string;

    constructor(
        private navCtrl: NavController,
        private wallet: WalletProvider,
        private web3: Web3Provider
    ) {
    }


    async importAccount(): Promise<void> {

        // you can add checks for fields here
        const password = this.password;
        const seed = this.seed;

        const rawKs = await this.wallet.createVault(password, seed);
        const ks = await this.wallet.createKeys(password, rawKs);

        console.log('KeyStore', ks);

        await this.web3.createProvider(ks);

        this.navigateHome();
    }

    private navigateHome() {
        this.navCtrl.setRoot(HomePage);
    }
}
