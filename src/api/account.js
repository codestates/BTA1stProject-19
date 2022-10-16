import * as crypto from "crypto-js";
import {CreateAccountByMnemonic} from "./keyPair";

export const StorePublicKey = publicKey => {
  try {
    chrome.storage.local.set({ publicKey: publicKey })
  } catch (e) {
    console.log(e)
  }
}

export const StorePassword = encPassword => {
  try {
    chrome.storage.local.set({ password: encPassword })
  } catch (e) {
    console.log(e)
  }
}

export const StoreMnemonics = ( mnemonics, encPassword ) => {
  try {
    const encryptMnemonics = crypto.AES.encrypt(mnemonics, encPassword).toString()
    chrome.storage.local.set({ mnemonics: encryptMnemonics })
  } catch (e) {
    console.log(e)
  }
}

export const StoreSecretKey = ( secretKey, encPassword ) => {
  try {
    const encSecretKey = crypto.AES.encrypt(secretKey, encPassword).toString()
    chrome.storage.local.set({ secretKey: encSecretKey })
  } catch (e) {
    console.log(e)
  }
}

export const EncryptPassword = password => {
  return  crypto.SHA256(password).toString(crypto.enc.Hex)
}

export const StoreAccountInfo = async (mnemonic, password) => {
  try {
    const { publicKey, secretKey } = await CreateAccountByMnemonic(mnemonic)
    const encPassword = EncryptPassword(password)
    StorePassword(encPassword)
    StorePublicKey(publicKey)
    StoreMnemonics(mnemonic, encPassword)
    StoreSecretKey(secretKey, encPassword)
  } catch (e) {
    console.log(e)
  }
}

export const LockWallet = () => {
  chrome.storage.local.set({lock : true})
}

export const UnlockWallet = () => {
  chrome.storage.local.remove('lock')
}
