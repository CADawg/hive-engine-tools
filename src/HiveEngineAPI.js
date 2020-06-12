/* Hive Engine Tools v2
* Ported from [PHP] Steem Engine Tools (by @cadawg) to JavaScript by @cadawg 12/06/2020
* © cadawg <cadawg@protonmail.com> https://github.com/Snaddyvitch-Dispenser https://peakd.com/@cadawg 2020
* */

import axios from 'axios';

class HiveEngineAPI {
    constructor(API_URL ="") {
        if (API_URL === "") {
            API_URL = "https://api.hive-engine.com/"
        }
        this.api_url = API_URL;
    }

    getRPCUrl() {
        return this.api_url + "rpc/";
    }

    getContractUrl() {
        return this.getRPCUrl() + "contracts";
    }

    async queryContract(contract,table,query={}) {
        let response = await axios.post(
            this.getContractUrl(),
            JSON.stringify([{"method": "find", "jsonrpc": "2.0", "params": {"contract":  contract, "table":  table, "query": query, "limit": 1000, "offset": 0, "indexes" : []},  "id" : 1}]),
            {headers: {"Content-Type": "application/json", "Cache-Control": "no-cache"}}
        );

        if (response.data !== undefined && response.data !== null && response.data.result !== null && response.data.result !== [] && response.data.result !== undefined) {
            return response.data.result;
        } else {
            return false;
        }
    }

    async getUserBalances($user = "null") {
        return await this.queryContract("tokens","balances",{account: $user});
    }

    async getMarketSells($user = "null", $token = "") {
        let $query = {};
        if ($user.length > 0) {
            $query["account"] = $user.toLowerCase();
        }
        if ($token.length > 0) {
            $query["symbol"] = $token.toUpperCase();
        }
        return await this.queryContract("market","sellBook",$query);
    }

    async getMarketBuys($user = "null", $token = "") {
        let $query = {};
        if ($user.length > 0) {
            $query["account"] = $user.toLowerCase();
        }
        if ($token.length > 0) {
            $query["symbol"] = $token.toUpperCase();
        }
        return await this.queryContract("market","buyBook",$query);
    }

    async getTokens() {
        return this.queryContract("tokens", "tokens", {});
    }

    async getUndelegations($user = "", $token = "") {
        let $query = {};
        if ($user.length > 0) {
            $query["account"] = $user.toLowerCase();
        }
        if ($token.length > 0) {
            $query["symbol"] = $token.toUpperCase();
        }

        return await this.queryContract("tokens", "pendingUndelegations", $query);
    }

    async getDelegations($initialQuery = {}) {
        let $query = {};
        for (let key in $initialQuery) {
            if ($initialQuery.hasOwnProperty(key) && $initialQuery[key].length > 0)
                $query[key] = $initialQuery[key];
        }

        return await this.queryContract("tokens", "delegations", $query);
    }

    async getUserBalanceOne($user="null",$token="") {
        let $query = {"account": $user.toLowerCase(), "symbol": $token.toUpperCase()};
        return await this.queryContract("tokens", "balances", $query);
    }
}

export default HiveEngineAPI;