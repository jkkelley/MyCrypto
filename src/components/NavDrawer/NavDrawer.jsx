import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import InfoIcon from "@material-ui/icons/Info";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { CenterFocusStrong } from "@material-ui/icons";

const drawerWidth = 190;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: -60,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider1: {
    marginTop: 20,
    background: "#3f51b5",
  },
  divider2: {
    marginTop: 20,
    background: "#3f51b5",
  },
  navHeading: {
    height: 39,
    // marginTop: 10,
    // marginBottom: -10,
    paddingTop: 20,
    margin: "0 auto",
    alignItems: "center",
    textAlign: "center",
  },
  listItemIcon: {
    color: "#3f51b5",
  }
}));

function NavDrawer({ props }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  // State Area
  const [mobileOpen, setMobileOpen] = useState(false);
  // User profile
  const user = useSelector((store) => store.user);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (event) => {
    console.log(`You clicked a link on the nav bar`);
    // Based on the event, travel to the corresponding path
    switch (event) {
      case "Home":
        try {
          dispatch({ type: "RESET_ERROR_COIN_MESSAGE" });
          dispatch({ type: "CLEAR_COIN_INFO" });
          dispatch({ type: "CLEAR_NOTES_FROM_COIN" });
          dispatch({ type: "CLEAR_MY_STASH_COINS_PRICE" });

          dispatch({ type: "CLEAR_MARKET_CHART_REDUCER" });
          dispatch({ type: "SET_MARKET_CHART_DATA_STATUS", payload: false });
          history.push("/homePage");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "Profile":
        try {
          dispatch({ type: "RESET_ERROR_COIN_MESSAGE" });
          dispatch({ type: "CLEAR_COIN_INFO" });
          dispatch({ type: "CLEAR_NOTES_FROM_COIN" });
          dispatch({ type: "CLEAR_MY_STASH_COINS_PRICE" });

          dispatch({ type: "CLEAR_MARKET_CHART_REDUCER" });
          dispatch({ type: "SET_MARKET_CHART_DATA_STATUS", payload: false });
          history.push("/profile");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "Coin Market":
        try {
          dispatch({ type: "RESET_ERROR_COIN_MESSAGE" });
          dispatch({ type: "CLEAR_COIN_INFO" });
          dispatch({ type: "CLEAR_NOTES_FROM_COIN" });
          // dispatch({ type: "CLEAR_MY_STASH_COINS_PRICE" });
          dispatch({ type: "CLEAR_MARKET_CHART_REDUCER" });
          dispatch({ type: "SET_MARKET_CHART_DATA_STATUS", payload: false });
          history.push("/coinMarket");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "My Stash":
        try {
          dispatch({ type: "RESET_ERROR_COIN_MESSAGE" });
          dispatch({ type: "CLEAR_MY_STASH_COINS_PRICE" });
          dispatch({ type: "CLEAR_COIN_INFO" });
          dispatch({ type: "CLEAR_NOTES_FROM_COIN" });
          dispatch({ type: "CLEAR_MARKET_CHART_REDUCER" });
          dispatch({ type: "SET_MARKET_CHART_DATA_STATUS", payload: false });

          // dispatch({type: "GET_MYSTASH_PAGE_DETAILS", payload: {user_id: user.id}})
          history.push("/myStash");
          break;
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "About":
        dispatch({ type: "RESET_ERROR_COIN_MESSAGE" });
        dispatch({ type: "CLEAR_MY_STASH_COINS_PRICE" });
        dispatch({ type: "CLEAR_COIN_INFO" });
        dispatch({ type: "CLEAR_NOTES_FROM_COIN" });
        dispatch({ type: "CLEAR_MARKET_CHART_REDUCER" });
        dispatch({ type: "SET_MARKET_CHART_DATA_STATUS", payload: false });
        history.push("/about");
        break;
      case "Logout":
        dispatch({
          type: "CLEAR_NOTES_FROM_COIN",
          type: "CLEAR_FORM_SUBMISSION",
          type: "LOGOUT",
        });
        history.push("/");
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography className={classes.navHeading}>Nav Bar</Typography>
      <Divider className={classes.divider1} />
      <List>
        {["Home", "My Stash", "Coin Market"].map((text, index) => (
          <ListItem button key={text} onClick={() => handleNavClick(text)}>
            <ListItemIcon >
              {index === 0 ? <HomeIcon className={classes.listItemIcon} value={0} /> : ""}
              {index === 1 ? <MonetizationOnIcon className={classes.listItemIcon} value={1} /> : ""}
              {index === 2 ? <AccountBalanceIcon className={classes.listItemIcon} value={2} /> : ""}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.divider2} />
      {["Profile", "About", "Logout"].map((text, index) => (
        <ListItem button key={text} onClick={() => handleNavClick(text)}>
          <ListItemIcon>
            {index === 0 ? <AccountBoxIcon className={classes.listItemIcon} value={0} /> : ""}
            {index === 1 ? <InfoIcon className={classes.listItemIcon} value={1} /> : ""}
            {index === 2 ? <ExitToAppIcon className={classes.listItemIcon} value={2} /> : ""}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
           <>My<i>Crypto</i></> 
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default NavDrawer;
