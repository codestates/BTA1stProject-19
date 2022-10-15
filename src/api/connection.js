import {Connection} from "@velas/web3";

export const SetConnection = (network) => {
  return new Connection(network.RPC)
}
