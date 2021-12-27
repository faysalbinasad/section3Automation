import React from 'react';
import { Button, Checkbox, Form, Input, Label } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { CustomInput } from 'shared/components';
import {
  StyledSignInFormBorder, StyledSignInFormContainer,
  StyledTextHolder, StyledText, StyledButtonHolder,
} from './signInForm.styles';
email: yup.string().email()
const signInSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

const SignInForm = () => {
  const methods = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmitHandler = (data) => {

  }

  return(
    <FormProvider {...methods} >
      <StyledSignInFormBorder>
        <StyledSignInFormContainer>
          <Form onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <Form.Field>
              <CustomInput labelName="Email" name="email" />
            </Form.Field>
            <Form.Field>
              <CustomInput labelName="Password" name="password" type="password" />
            </Form.Field>
            <StyledTextHolder>
              <StyledText>Don't have an account?</StyledText><a>Sign Up</a>
            </StyledTextHolder>
            <StyledButtonHolder>
              <Button color='blue' type='submit'>Sign In</Button>
            </StyledButtonHolder>
          </Form>
        </StyledSignInFormContainer>
      </StyledSignInFormBorder>
    </FormProvider>
  );
}

export default SignInForm;
