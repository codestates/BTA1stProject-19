import '../css/popup.css'
import Greeting from '../component/greeting_component'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { render } from 'react-dom'
import NavComponent from "../component/nav_component";

render(
  <RecoilRoot>
    <NavComponent/>
    <Greeting />
  </RecoilRoot>,
  window.document.getElementById('app-container'),
)
