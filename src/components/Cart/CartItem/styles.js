import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 220,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}))
