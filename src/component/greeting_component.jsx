import React, { useState, useEffect } from 'react'
import { useRecoilState, selector, useRecoilValue } from 'recoil'
import icon from '../img/icon-128.png'
import { hot } from 'react-hot-loader'
import * as velaseWeb3 from '@velas/web3'
import { Keypair, Connection, LAMPORTS_PER_SOL } from '@velas/web3'
import * as bs58 from 'bs58'
import TestButton from './button_component'
import { recoilPageState } from '../states/recoilPageState'

const GreetingComponent = () => {
  // const [page, setPage] = useRecoilState(recoilPageState)
  const recoilPageStateSelector = selector({
    key: 'recoilPageState',
    get: ({ get }) => {
      return get(recoilPageState)
    },
  })
  const page = useRecoilValue(recoilPageStateSelector)

  // useEffect(() => {
  //   getBalance()
  // }, [])
  // const connection = new Connection('https://api.devnet.solana.com')

  // const keypair = Keypair.generate()
  // const publicKey = keypair.publicKey.toBase58()
  // const secretKey = keypair.secretKey
  // const secretKeyBS58 = bs58.encode(keypair.secretKey)
  // console.log(`public key: ${publicKey}}`)
  // console.log(`private key(raw): ${secretKey}`)
  // console.log(`private key(bs58): ${secretKeyBS58}`)

  // const getBalance = async () => {
  //   const feePayer = Keypair.fromSecretKey(bs58.decode(secretKeyBS58))
  //   console.log('feePayer', feePayer)
  //   let balance = await connection.getBalance(feePayer.publicKey)
  //   console.log(`${balance / LAMPORTS_PER_SOL} SOL`)
  // }

  const render = () => {
    switch (page) {
      case 0:
        return (
          <div>
            <p>{page}Hello!!, find me on src/js/popup/greeting_component.jsx</p>
            <img src={icon} />
            <TestButton />
          </div>
        )
      case 1:
        return <div></div>
      case 2:
        return <div></div>
      default:
        return null
    }
  }

  return <div id="App">{render()}</div>
}

export default hot(module)(GreetingComponent)
