import React, { useState } from 'react';
import { Button, Form, Header, Checkbox } from 'semantic-ui-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, batch } from 'react-redux';
import { toast } from 'react-toastify';

import appUser from 'testData/user.json';
import { CustomInput, CustomDropdown, CustomCheckbox } from 'shared/components';
import { logIn, loadUser } from 'slices/currentUser';
import { loadProducts } from 'slices/userProducts';

import {
  StyledFilterFormBorder, StyledFilterFormContainer, StyledButtonsHolder, StyledHeaderHolder,
  StyledClearButtonHolder, StyledCheckboxHolder,
} from './filterForm.styles';
import { CATEGORY_OPTIONS, INITIAL_FILTER_FORM_VALUES } from './filterFormConstants';

const filterFormSchema = yup.object().shape({
  min_buy_range: yup.number().typeError('Must be a number').nullable(true),
  max_buy_range: yup.number().typeError('must be a number').nullable(true),
  min_rent_range: yup.number().typeError('must be a number').nullable(true),
  max_rent_range: yup.number().typeError('must be a number').nullable(true),
});

const FilterForm = ({ onSubmitHandler, resetFilteredProducts }) => {
  const methods = useForm({ defaultValues: INITIAL_FILTER_FORM_VALUES, resolver: yupResolver(filterFormSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBuyFilters, setIsBuyFilters] = useState(false)
  const [isRentFilters, setIsRentFilters] = useState(false)

  const buyCheckboxOnClickHandler = (e, { checked }) => {
    if (checked) {
      setIsBuyFilters(true);
      setIsRentFilters(false);
    } else {
      setIsBuyFilters(false);
    }

    methods.setValue('is_buy_filter_turned_on', checked)
  }

  const rentCheckboxOnClickHandler = (e, { checked }) => {
    if (checked) {
      setIsRentFilters(true);
      setIsBuyFilters(false);
    } else {
      setIsRentFilters(false);
    }

    methods.setValue('is_rent_filter_turned_on', checked)
  }

  // NOTE: Workaround to resetting form. WE should just call methods.reset() but its not working
  const clearFormValues = () => {
    methods.setValue('title', '', { shouldDirty: false });
    methods.setValue('min_buy_range', '', { shouldDirty: false });
    methods.setValue('max_buy_range', '', { shouldDirty: false });
    methods.setValue('min_rent_range', '', { shouldDirty: false });
    methods.setValue('max_rent_range', '', { shouldDirty: false });
    setIsBuyFilters(false);
    setIsRentFilters(false);
    methods.reset();
    resetFilteredProducts();
  }

  return(
    <FormProvider {...methods} >
      <StyledFilterFormBorder>
        <StyledHeaderHolder>
          <Header as='h1'>SEARCH</Header>
        </StyledHeaderHolder>
        <Form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <CustomInput labelName="Title" name="title" />
          <CustomDropdown
            name="category"
            selection
            options={CATEGORY_OPTIONS}
            labelName="Categories"
            value={methods.getValues().category}
          />
          <StyledCheckboxHolder>
            <CustomCheckbox
              name='is_buy_filter_turned_on'
              label='Buy Filters'
              onClick={buyCheckboxOnClickHandler}
              checked={isBuyFilters}
            />
          </StyledCheckboxHolder>
          {
            isBuyFilters &&
            <Form.Group widths="equal">
              <CustomInput
                placeholder="Min"
                name="min_buy_range"
              />
              <CustomInput
                placeholder="Max"
                name="max_buy_range"
              />
            </Form.Group>
          }
          <StyledCheckboxHolder>
            <CustomCheckbox
              name='is_rent_filter_turned_on'
              label='Rent Filters'
              onClick={rentCheckboxOnClickHandler}
              checked={isRentFilters}
            />
          </StyledCheckboxHolder>
          {
            isRentFilters &&
            <Form.Group widths="equal">
              <CustomInput
                placeholder="Min"
                name="min_rent_range"
              />
              <CustomInput
                placeholder="Max"
                name="max_rent_range"
              />
            </Form.Group>
          }
          <StyledButtonsHolder>
            <StyledClearButtonHolder>
            <Button onClick={() => clearFormValues()}>Clear</Button>
            </StyledClearButtonHolder>
            <Button color='blue' type='submit'>Filter</Button>
          </StyledButtonsHolder>
        </Form>
      </StyledFilterFormBorder>
    </FormProvider>
  );
}

export default FilterForm;
