import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { ProductCard } from 'shared/components';
import { randomIdGenerator } from 'utils';
import { deleteProduct } from 'slices';
import { useModal } from 'hooks';
import CustomModal from 'shared/components/customModal/customModal';

import { StyledProductList, StyledProductCardHolder } from './userProductListPage.styles';

const UserProductListPage = () => {
  const { userProducts } = useSelector(state => state.userProducts);
  const idToDelete = useRef(null);
  const dispatch = useDispatch();
  const [itemModalOpen, setItemModalOpen] = useModal();

  const modalPrimaryButtonHandler = () => {
    dispatch(deleteProduct(idToDelete.current));
    setItemModalOpen(false);
  }

  const deleteButtonHandler = (id) => {
    idToDelete.current = id;
    setItemModalOpen(true);
  }

  if (userProducts.length === 0) {
    return(
      <>You do not have any products!</>
    );
  }

  return(
    <StyledProductList>
    <CustomModal
      mainSection="Are you sure you want to delete this product?"
      primaryButtonHandler={modalPrimaryButtonHandler}
      primaryButtonText="Yes, delete"
      itemModalOpen={itemModalOpen}
      setItemModalOpen={setItemModalOpen}
    />
      {
        userProducts.map(product =>
          <div key={randomIdGenerator()}>
            <StyledProductCardHolder key={randomIdGenerator()}>
              <ProductCard product={product} deleteButtonHandler={() => deleteButtonHandler(product.id)} />
            </StyledProductCardHolder>
            <StyledProductCardHolder key={randomIdGenerator()}>
              <ProductCard product={product} deleteButtonHandler={() => deleteButtonHandler(product.id)} />
            </StyledProductCardHolder>
          </div>
        )
      }
    </StyledProductList>
  )
};

export default UserProductListPage;
