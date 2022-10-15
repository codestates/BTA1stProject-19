import { atom } from 'recoil'
import {Page} from "../enum/enum";

export const recoilPageState = atom({
  key: 'pageState',
  default: Page.START,
})
