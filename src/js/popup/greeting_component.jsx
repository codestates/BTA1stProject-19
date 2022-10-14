import React, { useState } from 'react'
import icon from '../../img/icon-128.png'
import { hot } from 'react-hot-loader'
import * as velaseWeb3 from '@velas/web3'
import { Keypair } from '@velas/web3'
import * as bs58 from 'bs58'

const GreetingComponent = () => {
  const [test, setTest] = useState(0)
  const keypair = Keypair.generate()
  const publicKey = keypair.publicKey.toBase58()
  console.log(`public key: ${keypair.publicKey.toBase58()}`)
  console.log(`private key(raw): ${keypair.secretKey}`)
  console.log(`private key(bs58): ${bs58.encode(keypair.secretKey)}`)

  return (
    <div>
      <p>
        {test}Hello!!, {publicKey}find me on src/js/popup/greeting_component.jsx
      </p>
      <img src={icon} />
    </div>
  )
}

export default hot(module)(GreetingComponent)
