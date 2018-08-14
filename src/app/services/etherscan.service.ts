import {EventEmitter, Injectable} from '@angular/core';
import axios from 'axios';

@Injectable()
export class EtherscanService {
    private apiURL: string;
    private lastBlockNumber: number;
    private lastBlockTransactionCount: number;
    private createNew: boolean;
    public newBlock$ = new EventEmitter<{
        blockNumber: number,
        transactionsCount: number,
        timestamp: Date
    }>();
    constructor() {
        this.apiURL = 'https://api.etherscan.io/api';
        this.lastBlockNumber = this.lastBlockTransactionCount = 0;
        this.createNew = false;
    }
    async _getLastBlock() {
        const response = await axios.get(
            this.apiURL + '?module=proxy&action=eth_blockNumber');
        return response['data']['result'] || 0;
    }
    async getLastBlockTransactionsCount(start: boolean) {
        const blockNumber = await this._getLastBlock();
        if (start
            || (blockNumber
                && this.lastBlockNumber !== parseInt(blockNumber, 16))
        ) {
            this.createNew = true;
            const response = await axios.get(
                this.apiURL + '?module=proxy' +
                '&action=eth_getBlockTransactionCountByNumber&tag='
                + blockNumber);
            this.lastBlockTransactionCount = response['data']['result']
                ? parseInt(response['data']['result'], 16)
                : undefined;
            return this.lastBlockTransactionCount || 0;
        } else {
            this.createNew = false;
            return blockNumber ? this.lastBlockTransactionCount : 0;
        }
    }
    async getLastBlockNumber() {
        const blockNumber = await this._getLastBlock();
        this.lastBlockNumber = blockNumber
            ? parseInt(blockNumber, 16)
            : this.lastBlockNumber;
        return this.lastBlockNumber;
    }
    async scan() {
        const self = this;
        await this.getLastBlockTransactionsCount(true);
        await this.getLastBlockNumber();
        this.show();
        if (this.createNew) {

            this.newBlock$.emit({
                blockNumber: this.lastBlockNumber,
                transactionsCount: this.lastBlockTransactionCount,
                timestamp: new Date()
            });
        }
        setInterval(async () => {
            await self.getLastBlockTransactionsCount(false);
            await self.getLastBlockNumber();
            this.show();
            if (this.createNew) {

                this.newBlock$.emit({
                    blockNumber: this.lastBlockNumber,
                    transactionsCount: this.lastBlockTransactionCount,
                    timestamp: new Date()
                });
            }
        }, 5000);
    }
    show() {
        console.log('Last Block: ' + this.lastBlockNumber);
        console.log('Transactions: ' + this.lastBlockTransactionCount);
    }
}
