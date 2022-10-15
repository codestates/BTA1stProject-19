export const Page = {
  START: 'start',
  LOGIN: 'login',
  ACCOUNT: 'account',
  TRANSFER: 'transfer',
}

export const Network = {
  MAINNET: {
    RPC : "https://api.velas.com",
    WEBSOCKET: "wss://api.velas.com",
    EXPLORER: "https://native.velas.com/",
  },
  TESTNET: {
    RPC : "https://api.testnet.velas.com",
    WEBSOCKET: "wss://api.testnet.velas.com",
    EXPLORER: "https://native.velas.com/?cluster=testnet",
  }
}
