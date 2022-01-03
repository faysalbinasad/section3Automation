import React from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import * as yup from 'yup';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { CustomInput, CustomTextArea, CustomDropdown } from 'shared/components';
import { addProduct, editProduct } from 'slices/userProducts';

import {
  StyledUpsertProductFormBorder, StyledUpsertProductFormContainer, StyledButtonHolder,
  StyledPurchaseOptions, StyledRentSection, StyledRentPriceInputHolder
} from './upsertProductForm.styles';
import {convertDataToDropdownOptions, convertCategoriesForSubmission, getSchema } from './upsertProductFormHelpers';
import { RENT_DURATION_OPTIONS, INITIAL_UPSERT_PRODUCT_FORM_VALUES } from './upsertProductFormConstants';



const UpsertProductForm = ({ isEdit, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProducts = useSelector((state) => state.userProducts);
  const methods = useForm({
    resolver: yupResolver(getSchema(isEdit)),
    defaultValues: isEdit ? product : INITIAL_UPSERT_PRODUCT_FORM_VALUES,
  });

  const getNewId = () => {
    let highestId = -1;
    userProducts.forEach(product => {
      highestId = highestId < product.id ? product.id : highestId;
    });

    return highestId === -1 ? 1 : (highestId + 1);
  }

  const onSubmitHandler = (data) => {
    if (userProducts.length > 5) {
      toast.error('Internal error occurred!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("SERVER ERROR: psql: No space left on device!");
    } else {
      const categoriesForSubmission = convertCategoriesForSubmission(data.categories);
      if (isEdit) {
        dispatch(editProduct({ ...product, ...data, categories: categoriesForSubmission }));
      } else {
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
              defaultValue={isEdit ? product.categories.map(c => c.name) : []}
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
                  defaultValue={isEdit ? product.rent_duration : ''}
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
