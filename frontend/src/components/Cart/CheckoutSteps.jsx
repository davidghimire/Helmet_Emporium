import React, { Fragment } from 'react';
import { Typography, Stepper, StepLabel, Step } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Order Details</Typography>,
      icon: <LibraryAddCheckIcon />,
    },

    {
      label: <Typography>Success</Typography>,
      icon: <CheckCircleSharpIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: 'border-box',
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? '#007bff' : 'rgba(0, 0, 0, 0.649)',
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
