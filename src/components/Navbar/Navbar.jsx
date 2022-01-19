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
import { Link, useLocation } from 'react-router-dom'

import useStyles from './styles.js'

const Navbar = ({ totalItems }) => {
  const classes = useStyles()
  const location = useLocation()

  return (
    <>
      {/* AppBar is NavBar in MUI */}
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
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

          {/* only path is '/' returns CART BTN */}
          {location.pathname === '/' && (
            <div className={classes.button}>
              {/* Mui approves Link/to atrributes on any of its elements
            to route to a different page */}
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
