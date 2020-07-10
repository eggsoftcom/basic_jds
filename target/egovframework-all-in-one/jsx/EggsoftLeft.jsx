import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Link from '@material-ui/core/Link';

import ApiService from "../js/ApiService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function EggsoftLeft() {
  const classes = useStyles();

  const [resultList, setResultList] = useState(null);

  useEffect(() => {
	  setTimeout(() => {
		  ApiService.selectUsers().then(response => {
			  const eggMenu = response.data.resultList.map((result, index) => {
				  return (
					  <Fragment key={index}>
						  {result.gid == 0 ? (
							  <ListItem button onClick={() => handleClick(0)}>
							  	<ListItemText primary={result.menuNm} />
							  </ListItem>
						  ) : (
							  <Collapse in={true} timeout="auto" unmountOnExit>
								  <List component="div" disablePadding>
									  <ListItem button className={classes.nested}>
									  	<ListItemText primary={result.menuNm} onClick={ () => { location.href = result.listUrl; } } />
									  </ListItem>
								  </List>
							  </Collapse>
						  )}
					  </Fragment>
				  )
			  });
			
			  setResultList(eggMenu);
		  });
	  }, 10);
  }, []);
  
  return (
		  <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
			{resultList}
		</List>
  );
}

ReactDOM.render( <EggsoftLeft />, document.querySelector("#EggsoftLeft"));
