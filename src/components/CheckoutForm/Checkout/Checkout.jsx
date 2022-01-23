import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'
import { Link, useNavigate } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()
  const navigate = useNavigate()

  useEffect(() => {
    const generateToken = async () => {
      try {
        // generateToken(cartId, typeOfToken):
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        })

        setCheckoutToken(token)
      } catch (e) {
        console.log('Issue generating checkout token')
        navigate('/')
      }
    }

    // async function can not be used with useEffect
    generateToken()
  }, [cart])

  /** Move back and forth the steps */
  const nextStep = () => setActiveStep((prevStep) => prevStep + 1)
  const backStep = () => setActiveStep((prevStep) => prevStep - 1)

  /** Data received from AddressForm */
  const next = (data) => {
    setShippingData(data)

    nextStep()
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        nextStep={nextStep}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    )

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer_reference}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    )

  if (error) {
    ;<>
      <Typography variant="h5">Error: {error}</Typography>
    </>
  }

  return (
    <>
      <CssBaseline>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {/* if activeStep == steps.length (=2) (all the steps are done)
          we display confirmation page */}
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </CssBaseline>
    </>
  )
}

export default Checkout
