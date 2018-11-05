import {Injectable} from '@angular/core';
import * as lightwallet from 'eth-lightwallet';
import {AlertController} from "ionic-angular";

/*
  Generated class for the WalletProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WalletProvider {

    constructor(
        private alertCtrl: AlertController
    ) {
    }

    public createKeys(password: string, ks: any): Promise<any> {
        return new Promise((resolve, reject) => {

            ks.keyFromPassword(password, async (err, pwDerivedKey) => {
                if (err) reject(new Error(err));

                ks.generateNewAddress(pwDerivedKey, 5);

                ks.passwordProvider = async (callback) => {
                    // add custom prompt

                    const password = await this.askForPassword();
                    callback(null, password);
                };

                return resolve(ks);
            });
        })
    }

    public createVault(
        password: string,
        seedPhrase: string,
        hdPathString: string = "m/44'/60'/0'/0",
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            lightwallet.keystore.createVault({
                password,
                seedPhrase,
                hdPathString,
            }, (err: any, ks: any) => {
                if (err) {
                    console.log('we', err)
                    return reject({err});
                }
                return resolve(ks);
            });
        });
    }

    private askForPassword(): Promise<any> {

        return new Promise((resolve, reject) => {
            const pwPrompt = this.alertCtrl.create({
                title: 'Confirm',
                inputs: [
                    {
                        name: 'password',
                        placeholder: 'Password',
                        type: 'password'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            return reject(new Error('cancelled'));
                        }
                    },
                    {
                        text: 'Sign',
                        handler: data => {
                            return resolve(data.password);
                        }
                    }
                ]
            });
            pwPrompt.present();
        })
    }
}
