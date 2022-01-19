import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'

import useStyles from './styles.js'

const Navbar = ({ totalItems }) => {
  const classes = useStyles()

  return (
    <>
      {/* AppBar is NavBar in MUI */}
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src="https://i.ibb.co/Qp1SXBw/commerce.png"
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            CommerceJS
          </Typography>
          {/* this div takes up all the space between */}
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
