import { makeStyles } from '@material-ui/core/styles'

// makeStyles func receives a callback function
// with an instance returned (an object)
export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 'auto',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
