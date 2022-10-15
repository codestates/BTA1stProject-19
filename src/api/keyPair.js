import { Keypair } from '@velas/web3'
import * as bip39 from "bip39";
import * as bs58 from "bs58";

export const CreateAccountByMnemonic = (mnemonic, password) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic, password);
  const keypair = Keypair.fromSeed(seed.slice(0, 32));
  const publicKey = keypair.publicKey.toBase58()
  const secretKey = keypair.secretKey
  console.log(`${publicKey}`);
  console.log(`raw ${secretKey}`);
  console.log(`${bs58.encode(secretKey)}`);
  return {
    publicKey: publicKey,
    secretKey: bs58.encode(secretKey),
  }
}

export const CreateMnemonic = () => {
  return bip39.generateMnemonic();
}
