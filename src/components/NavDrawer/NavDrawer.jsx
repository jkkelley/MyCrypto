import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function NavDrawer({ props }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (event) => {
    event.preventDefault;
    console.log(`You clicked a link on the nav bar`);
    // Based on the event, travel to the corresponding path
    switch (event) {
      case "Home":
        try {
          console.log(event);
          dispatch({ type: "CLEAR_COIN_INFO", type: "CLEAR_NOTES_FROM_COIN" });
          history.push("/homePage");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "Profile":
        try {
          console.log(event);
          dispatch({ type: "CLEAR_COIN_INFO", type: "CLEAR_NOTES_FROM_COIN" });
          history.push("/profile");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "Coin Market":
        try {
          console.log(event);
          dispatch({ type: "CLEAR_COIN_INFO", type: "CLEAR_NOTES_FROM_COIN" });
          history.push("/info");
        } catch (error) {
          console.log(`Had a Nav Error ${error}`);
        }
        break;
      case "Logout":
        dispatch({ type: "LOGOUT" });
        history.push("/");
    }
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Home", "Profile", "Coin Market", "Logout"].map((text, index) => (
          <ListItem button key={text} onClick={() => handleNavClick(text)}>
            <ListItemIcon>
              {index === 0 ? <HomeIcon value={0} /> : ""}
              {index === 1 ? <AccountBoxIcon value={1} /> : ""}
              {index === 2 ? <AccountBalanceIcon value={2} /> : ""}
              {index === 3 ? <ExitToAppIcon value={3} /> : ""}
              {/* <MailIcon /> */}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
