import { atom } from 'recoil'
import {Network, Page} from "../enum/enum";

export const recoilPageState = atom({
  key: 'pageState',
  default: Page.ACCOUNT,
})

export const recoilNetWork = atom({
  key: 'networkState',
  default: Network.TESTNET,
})
