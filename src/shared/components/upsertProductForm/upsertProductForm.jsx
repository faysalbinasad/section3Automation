import React from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { CustomInput, CustomTextArea, CustomDropdown } from 'shared/components';
import { addProduct } from 'slices/userProducts';

import {
  StyledUpsertProductFormBorder, StyledUpsertProductFormContainer, StyledButtonHolder,
  StyledPurchaseOptions, StyledRentSection, StyledRentPriceInputHolder
} from './upsertProductForm.styles';
import {convertDataToDropdownOptions, convertCategoriesForSubmission } from './upsertProductFormHelpers';
import { RENT_DURATION_OPTIONS } from './upsertProductFormConstants';

const upsertProductSchema = yup.object().shape({
  title: yup.string().required('Last Name is required'),
  categories: yup.array().of(yup.string()).required("At least one category must be selected"),
  description: yup.string().required('Description cannot be empty'),
  purchase_price: yup.number().typeError('Purchase price must be a number').required('Purchase price is required'),
  rent_price: yup.number().typeError('Rent price must be a number').required('Rent price is required'),
  rent_duration: yup.string().required('Need to select an option'),
}).required();

const UpsertProductForm = ({ isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProducts = useSelector((state) => state.userProducts);
  const methods = useForm({
    resolver: yupResolver(upsertProductSchema),
  });

  const getNewId = () => {
    let highestId = -1;
    userProducts.forEach(product => {
      highestId = highestId < product.id ? product.id : highestId;
    });

    return highestId === -1 ? 1 : (highestId + 1);
  }

  const onSubmitHandler = (data) => {
    if (userProducts.length > 4) {
      toast.error('Internal error occurred!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const categoriesForSubmission = convertCategoriesForSubmission(data.categories);
      dispatch(addProduct({
        ...data,
        id: getNewId(),
        categories: categoriesForSubmission,
        is_bought: false,
        rent_start_time: null,
        rent_end_time: null,
        views: 0,
        created_at: new Date().toLocaleDateString('en-GB'),
      }));
      toast.success('New product added!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/my-products');
    }
  }

  return(
    <FormProvider {...methods} >
      <StyledUpsertProductFormBorder>
        <StyledUpsertProductFormContainer>
          <Form onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <CustomInput labelName="Title" name="title" />
            <CustomDropdown
              labelName="Categories"
              name="categories"
              multiple
              selection
              options={convertDataToDropdownOptions()}
            />
            <CustomTextArea labelName="Description" name="description" />
            <StyledPurchaseOptions>
              <CustomInput name="purchase_price" />
              <StyledRentSection>
                <StyledRentPriceInputHolder>
                  <CustomInput name="rent_price" />
                </StyledRentPriceInputHolder>
                <CustomDropdown
                  name="rent_duration"
                  selection
                  options={RENT_DURATION_OPTIONS}
                />
              </StyledRentSection>
            </StyledPurchaseOptions>

            <StyledButtonHolder>
              <Button color='blue' type='submit'>Add Product</Button>
            </StyledButtonHolder>
          </Form>
        </StyledUpsertProductFormContainer>
      </StyledUpsertProductFormBorder>
    </FormProvider>
  );
}

export default UpsertProductForm;
