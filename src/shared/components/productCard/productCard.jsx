import React from 'react';

import { Button } from 'semantic-ui-react';

import {
  StyledContainer, StyledTitle, StyledCategories, StyledPriceHolder, StyledPurchasePrice,
  StyledDescription, StyledCardFooter, StyledMainContent, StyledHeader,
} from './productCard.styles';

const ProductCard = ({ product, showDeleteButton }) => {
  const {
    title, description, categories, created_at, views, purchase_price, rent_price,
    rent_duration
  } = product;

  return(
    <StyledContainer>
      <StyledMainContent>
        <StyledHeader>
          <StyledTitle>{title}</StyledTitle>
          { showDeleteButton &&
            <Button icon="trash" onClick={() => console.log("Delete")}/>
          }
        </StyledHeader>
        <StyledCategories>Categories: {categories.map(c => c.name).join(", ")}</StyledCategories>
        <StyledPriceHolder>
          <StyledPurchasePrice>Price: ${purchase_price}</StyledPurchasePrice>
          <div>Rent: ${rent_price} {rent_duration}</div>
        </StyledPriceHolder>
        <StyledDescription>{description}</StyledDescription>
      </StyledMainContent>
      <StyledCardFooter>
        <div>
          Date posted: { created_at }
        </div>
        <div>
          { views } views
        </div>
      </StyledCardFooter>
    </StyledContainer>
  );
};

export default ProductCard;
