import '../css/popup.css'
import Greeting from '../component/greeting_component'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { render } from 'react-dom'

render(
  <RecoilRoot>
    <Greeting />
  </RecoilRoot>,
  window.document.getElementById('app-container'),
)
