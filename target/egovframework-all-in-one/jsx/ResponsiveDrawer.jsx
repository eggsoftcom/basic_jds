import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import ApiService from "../js/ApiService";
import { ContainedButtons, TextButtons, UploadButtons, TemporaryDrawer } from "./ComponentExample.jsx";
import { BasicPagination } from "./BasicPagination.jsx";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	grow: {
	    flexGrow: 1,
	  },
	  menuButton: {
	    marginRight: theme.spacing(2),
	  },
	  title: {
	    display: 'none',
	    [theme.breakpoints.up('sm')]: {
	      display: 'block',
	    },
	  },
	search: {
	    position: 'relative',
	    borderRadius: theme.shape.borderRadius,
	    backgroundColor: fade(theme.palette.common.white, 0.15),
	    '&:hover': {
	      backgroundColor: fade(theme.palette.common.white, 0.25),
	    },
	    marginRight: theme.spacing(2),
	    marginLeft: 0,
	    width: '100%',
	    [theme.breakpoints.up('sm')]: {
	      marginLeft: theme.spacing(3),
	      width: 'auto',
	    },
	  },
	  searchIcon: {
	    padding: theme.spacing(0, 2),
	    height: '100%',
	    position: 'absolute',
	    pointerEvents: 'none',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	  },
	  inputRoot: {
		    color: 'inherit',
		  },
		  inputInput: {
		    padding: theme.spacing(1, 1, 1, 0),
		    // vertical padding + font size from searchIcon
		    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		    transition: theme.transitions.create('width'),
		    width: '100%',
		    [theme.breakpoints.up('md')]: {
		      width: '20ch',
		    },
		  },
		  sectionDesktop: {
			    display: 'none',
			    [theme.breakpoints.up('md')]: {
			      display: 'flex',
			    },
			  },
			  sectionMobile: {
			    display: 'flex',
			    [theme.breakpoints.up('md')]: {
			      display: 'none',
			    },
			  },
}));

const listStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

function ResponsiveDrawer(props) {
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);
	
	const listClass = listStyles();
	
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	
	const container = window !== undefined ? () => window().document.body : undefined;

	const [resultList, setResultList] = useState(null);
	
	useEffect(() => {
		setTimeout(() => {
			ApiService.selectUsers().then(response => {
				const eggMenu = response.data.resultList.map((result, index) => {
					return (
						<Fragment key={index}>
							{result.gid == 0 && (
							<ListItem button onClick={() => handleClick(0)}>
								<ListItemText primary={result.name} />
							</ListItem>
							)}
							<Collapse in={true} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem button className={listClass.nested}>
										<ListItemText primary="Starred" />
									</ListItem>
								</List>
							</Collapse>
						</Fragment>
					)
				});
				
				setResultList(eggMenu);
			});
	    }, 10);
	}, []);
	
	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<span style={{fontWeight: "bold", fontSize: "28px", position: "absolute", top: "8px", left: "24px"}}>
					EggSoft
				</span>
			</div>
			<Divider />
			<List component="nav" className={listClass.root}>
				{resultList}
			</List>
		</div>
	);
	
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	  const isMenuOpen = Boolean(anchorEl);
	  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	  const handleProfileMenuOpen = (event) => {
	    setAnchorEl(event.currentTarget);
	  };

	  const handleMobileMenuClose = () => {
	    setMobileMoreAnchorEl(null);
	  };

	  const handleMenuClose = () => {
	    setAnchorEl(null);
	    handleMobileMenuClose();
	  };

	  const handleMobileMenuOpen = (event) => {
	    setMobileMoreAnchorEl(event.currentTarget);
	  };
	
	  const menuId = 'primary-search-account-menu';
	  const renderMenu = (
			    <Menu
			      anchorEl={anchorEl}
			      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			      id={menuId}
			      keepMounted
			      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			      open={isMenuOpen}
			      onClose={handleMenuClose}
			    >
			      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
			    </Menu>
			  );
	
	  const mobileMenuId = 'primary-search-account-menu-mobile';
	  const renderMobileMenu = (
	    <Menu
	      anchorEl={mobileMoreAnchorEl}
	      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
	      id={mobileMenuId}
	      keepMounted
	      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
	      open={isMobileMenuOpen}
	      onClose={handleMobileMenuClose}
	    >
	      <MenuItem>
	        <IconButton aria-label="show 4 new mails" color="inherit">
	          <Badge badgeContent={4} color="secondary">
	            <MailIcon />
	          </Badge>
	        </IconButton>
	        <p>Messages</p>
	      </MenuItem>
	      <MenuItem>
	        <IconButton aria-label="show 11 new notifications" color="inherit">
	          <Badge badgeContent={11} color="secondary">
	            <NotificationsIcon />
	          </Badge>
	        </IconButton>
	        <p>Notifications</p>
	      </MenuItem>
	      <MenuItem onClick={handleProfileMenuOpen}>
	        <IconButton
	          aria-label="account of current user"
	          aria-controls="primary-search-account-menu"
	          aria-haspopup="true"
	          color="inherit"
	        >
	          <AccountCircle />
	        </IconButton>
	        <p>Profile</p>
	      </MenuItem>
	    </Menu>
	  );
	
	
	
	
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
					<Typography className={classes.title} variant="h6" noWrap>
			            Material-UI
			          </Typography>
			          <div className={classes.search}>
			            <div className={classes.searchIcon}>
			              <SearchIcon />
			            </div>
			            <InputBase
			              placeholder="Search…"
			              classes={{
			                root: classes.inputRoot,
			                input: classes.inputInput,
			              }}
			              inputProps={{ 'aria-label': 'search' }}
			            />
			          </div>
			            
			            
			            
			            <div className={classes.grow} />
			            <div className={classes.sectionDesktop}>
			              <IconButton aria-label="show 4 new mails" color="inherit">
			                <Badge badgeContent={4} color="secondary">
			                  <MailIcon />
			                </Badge>
			              </IconButton>
			              <IconButton aria-label="show 17 new notifications" color="inherit">
			                <Badge badgeContent={17} color="secondary">
			                  <NotificationsIcon />
			                </Badge>
			              </IconButton>
			              <IconButton
			                edge="end"
			                aria-label="account of current user"
			                aria-controls={menuId}
			                aria-haspopup="true"
			                onClick={handleProfileMenuOpen}
			                color="inherit"
			              >
			                <AccountCircle />
			              </IconButton>
			            </div>
			            <div className={classes.sectionMobile}>
			              <IconButton
			                aria-label="show more"
			                aria-controls={mobileMenuId}
			                aria-haspopup="true"
			                onClick={handleMobileMenuOpen}
			                color="inherit"
			              >
			                <MoreIcon />
			              </IconButton>
			            </div>
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
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer classes={{paper: classes.drawerPaper}} variant="permanent" open>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<div>
					<div id="ContainedButtons" />
					<div id="TextButtons" />
					<div id="UploadButtons" />
					<div id="TemporaryDrawer" />
					<div id="BasicPagination" />
				</div>
			</main>
		</div>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func
};

ReactDOM.render(<ResponsiveDrawer />, document.querySelector("#root"));
ReactDOM.render(<ContainedButtons />, document.querySelector("#ContainedButtons"));
ReactDOM.render(<TextButtons />, document.querySelector("#TextButtons"));
ReactDOM.render(<UploadButtons />, document.querySelector("#UploadButtons"));
ReactDOM.render( <TemporaryDrawer />, document.querySelector("#TemporaryDrawer"));
ReactDOM.render( <BasicPagination />, document.querySelector("#BasicPagination"));
