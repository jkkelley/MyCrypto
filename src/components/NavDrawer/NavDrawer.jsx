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

const drawerWidth = 240;

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
  divider: {
    marginTop: -5,
  },
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
  const user = useSelector(store => store.user)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (event) => {
    
    console.log(`You clicked a link on the nav bar`);
    // Based on the event, travel to the corresponding path
    switch (event) {
      case "Home":
        try {
          dispatch(
            { type: "CLEAR_COIN_INFO" },
            { type: "CLEAR_NOTES_FROM_COIN" }
          );
          history.push("/homePage");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "Profile":
        try {
          dispatch(
            { type: "CLEAR_COIN_INFO" },
            { type: "CLEAR_NOTES_FROM_COIN" }
          );
          history.push("/profile");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "Coin Market":
        try {
          dispatch(
            { type: "CLEAR_COIN_INFO" },
            { type: "CLEAR_NOTES_FROM_COIN" }
          );
          history.push("/info");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "My Stash":
        try {
          dispatch(
            { type: "CLEAR_COIN_INFO" },
            { type: "CLEAR_NOTES_FROM_COIN" }
          );
          // dispatch({type: "GET_MYSTASH_PAGE_DETAILS", payload: {user_id: user.id}})
          history.push("/myStash");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
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
      <h3>Menu</h3>
      <Divider className={classes.divider} />
      <List>
        {["Home", "My Stash", "Coin Market", "Profile", "Logout"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => handleNavClick(text)}>
              <ListItemIcon>
                {index === 0 ? <HomeIcon value={0} /> : ""}
                {index === 1 ? <MonetizationOnIcon value={1} /> : ""}
                {index === 2 ? <AccountBalanceIcon value={2} /> : ""}
                {index === 3 ? <AccountBoxIcon value={3} /> : ""}
                {index === 4 ? <ExitToAppIcon value={4} /> : ""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
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
            MyCrypto
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
