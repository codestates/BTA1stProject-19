import React, {useState} from 'react'
import { hot } from 'react-hot-loader'
import {
  AppBar,
  Divider, Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  useTheme,
  Toolbar
} from "@material-ui/core";
import {useRecoilState} from "recoil";
import {recoilPageState} from "../states/recoilPageState";
import {Page} from "../enum/enum";
import clsx from 'clsx';


const NavComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [open, setOpen] = useState(false);

  const goToPage = (page) => {
    setPage(page)
  }

  const drawerWidth = 100;
  const classes = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: "#fff",
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }))();

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        color={'default'}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <span className="material-icons">menu</span>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <span className="material-icons">{theme.direction === 'ltr' ? "chevron_left " : "chevron_right"}</span>
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="account" onClick={() => goToPage(Page.ACCOUNT)}>
            <ListItemText primary={"내계정"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default hot(module)(NavComponent)
