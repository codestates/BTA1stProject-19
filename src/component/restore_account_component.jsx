import React, {useState} from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'
import {Box, Button, Container, makeStyles, TextField} from "@material-ui/core";

const RestoreAccountComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [type, setType] = useState('')

  const classes = makeStyles(() => ({
    container: {
      textAlign: 'center',
      marginTop: '100px',
    },
    logoImage: {
      width: '60px',
      height: '56px'
    },
    inputContainer: {
      padding: '30px 0 10px',
    },
    buttonContainer: {
      width: '176px',
      margin: '0 auto',

    },
    divider: {
      margin: '20px 0 0'
    }

  }))();

  return (
    <div>
      <Container className={classes.container}>
          restore
      </Container>
    </div>
  )
}

export default hot(module)(RestoreAccountComponent)
