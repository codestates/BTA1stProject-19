import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  makeStyles,
  TextField,
} from '@material-ui/core'
import logo from '../img/velas-logo.png'
import { Page } from '../enum/enum'
import { IsSecretKeyValid } from '../api/keyPair'
import * as crypto from 'crypto-js'

const LoginComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [password, setPassword] = useState('')

  const goToPage = pageName => {
    setPage(pageName)
  }

  const handleChange = e => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    const encPassword = crypto.SHA256(password).toString(crypto.enc.Hex)
    chrome.storage.local.get('password', result => {
      const storagePassword = result.password
      if (encPassword === storagePassword) {
        chrome.storage.local.get('secretKey', result => {
          const encSecretKey = result.secretKey
          const decSecretKey = crypto.AES.decrypt(encSecretKey, encPassword)
          const originalSecretKey = decSecretKey.toString(crypto.enc.Utf8)
          if (IsSecretKeyValid(originalSecretKey)) {
            setPage(Page.ACCOUNT)
          } else {
            alert('계정이 존재하지 않습니다.')
          }
        })
      } else {
        alert('패스워드가 일치하지 않습니다')
      }
    })
  }

  const classes = makeStyles(() => ({
    container: {
      textAlign: 'center',
      marginTop: '100px',
    },
    logoImage: {
      width: '60px',
      height: '56px',
    },
    inputContainer: {
      padding: '30px 0 10px',
    },
    buttonContainer: {
      width: '176px',
      margin: '0 auto',
    },
    divider: {
      margin: '20px 0 0',
    },
    textButton: {
      fontSize: '0.5rem',
    },
    buttonGroup: {
      marginTop: '5px',
      textAlign: 'center',
    },
  }))()

  return (
    <div>
      <Container className={classes.container}>
        <img className={classes.logoImage} src={logo} alt="velas" />
        <Box className={classes.inputContainer}>
          <TextField
            type="password"
            label="password"
            placeholder="password"
            multiline
            onChange={handleChange}
          />
        </Box>
        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={handleLogin}
          >
            로그인
          </Button>
          <ButtonGroup
            variant="text"
            aria-label="text primary button group"
            className={classes.buttonGroup}
          >
            <Button
              onClick={() => {
                goToPage(Page.NEW_ACCOUNT)
              }}
              className={classes.textButton}
            >
              new
            </Button>
            <Button
              onClick={() => {
                goToPage(Page.RESTORE_ACCOUNT)
              }}
              className={classes.textButton}
            >
              restore
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
    </div>
  )
}

export default hot(module)(LoginComponent)
