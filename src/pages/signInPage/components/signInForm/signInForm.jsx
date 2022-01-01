import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router-dom";

import { CustomInput } from 'shared/components';
import {
  StyledSignInFormBorder, StyledSignInFormContainer,
  StyledTextHolder, StyledText, StyledButtonHolder,
} from './signInForm.styles';

const signInSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Password is required'),
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
            <CustomInput labelName="Email" name="email" />
            <CustomInput labelName="Password" name="password" />
            <StyledTextHolder>
              <StyledText>Don't have an account?</StyledText><Link to="/register">Sign Up</Link>
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
