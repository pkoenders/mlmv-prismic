import React from 'react'

import Button from '/src/components/common/buttons/linkButton'

import IconSubmitSuccess from '/src/images/svg/icon-contact-success.inline.svg'

import styled from 'styled-components'

const Success = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: ${({ theme }) => theme.margin['1/2']};
  p:first-of-type {
    font-size: 133%;
    font-weight: 500;
    margin: 0;
  }

  svg {
    margin: 0;
    width: 64px;
    height: auto;
    // opacity: 0.6;
    color: ${({ theme }) => theme.colors.alert.l1.default};
  }

  span {
    margin: 0 auto 0 0;
    .btn {
      margin-top: ${({ theme }) => theme.margin['1/2']};
    }
  }
`

const SubmitSuccess = ({ resetForm }) => {
  return (
    <Success className={'formSuccess'}>
      <p>Thank you</p>
      <IconSubmitSuccess aria-hidden="true" />
      <p>We have recieved your enquiry and will get back to you soon.</p>

      <Button
        buttonLabel={'Reset form'}
        buttonType={'button'}
        buttonStyle={'primary'}
        onClick={resetForm}
        icon={'refresh'}
      />
    </Success>
  )
}
export default SubmitSuccess
