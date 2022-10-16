import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Link, makeStyles,
  Typography
} from "@material-ui/core";
import {useRecoilState} from "recoil";
import {recoilNetWork} from "../states/recoilPageState";

const TransactionResultModal = (props) => {
  const {status, transactionHash, handleClose, open} = props
  const [network, setNetwork] = useRecoilState(recoilNetWork)

  const getTransactionHashLink = () => {
    const networkExplorer = network.EXPLORER
    return `${networkExplorer}/tx/${transactionHash}?cluster=testnet`
  }

  const preventDefault = (event) => event.preventDefault();

  const classes = makeStyles(() => ({
    width: {
      width: '100%',
    },
  }))()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classname = {classes.width}
    >
      <DialogTitle id="alert-dialog-title">{"트랜잭션 처리 결과"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {
            status ?
              <Box>
                <Typography>트랜잭션 처리 성공</Typography><br/>
                <a href={getTransactionHashLink()} target="_blank">
                  트랜잭션 보러가기
                </a>
              </Box> :
              <Box>트랜잭션 처리 실패</Box>
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionResultModal
