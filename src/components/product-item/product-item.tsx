import { BsCartPlus } from "react-icons/bs";
import Product from "../../types/product.types";
import CustomButton from "../Custom-button/Custom-button";
import { ProductContainer, ProductImage, ProductInfo } from "./product-item.styles";

import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/toolkit/cart/cart.slice";

 interface ProductItemProps{
  product: Product
 }

function ProductItem ({ product }: ProductItemProps) {
  const dispatch = useDispatch()

  const handleAddToCartClick = () => {
    dispatch(addProductToCart(product))
  }

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton 
          onClick={handleAddToCartClick} 
          startIcon={<BsCartPlus />}
        >
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>

      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
}

export default ProductItem;