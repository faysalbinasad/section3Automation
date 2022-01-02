import React from 'react';
import { useSelector } from 'react-redux';

import { ProductCard } from 'shared/components';
import { randomIdGenerator } from 'utils';

import { StyledProductList, StyledProductCardHolder } from './userProductListPage.styles';

const UserProductListPage = () => {
  const { userProducts } = useSelector(state => state.userProducts);

  if (userProducts.length === 0) {
    return(
      <>You do not have any products!</>
    );
  }

  return(
    <StyledProductList>
      {
        userProducts.map(product =>
          <div key={randomIdGenerator()}>
            <StyledProductCardHolder key={randomIdGenerator()}>
              <ProductCard product={product} showDeleteButton />
            </StyledProductCardHolder>
            <StyledProductCardHolder key={randomIdGenerator()}>
              <ProductCard product={product} showDeleteButton />
            </StyledProductCardHolder>
          </div>
        )
      }
    </StyledProductList>
  )
};

export default UserProductListPage;
