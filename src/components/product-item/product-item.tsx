import { BsCartPlus } from "react-icons/bs";
import Product from "../../types/product.types";
import CustomButton from "../Custom-button/Custom-button";
import { ProductContainer, ProductImage, ProductInfo } from "./product-item.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

 interface ProductItemProps{
  product: Product
 }

function ProductItem ({ product }: ProductItemProps) {
  const {addProductToCart} = useContext(CartContext)

  const handleAddToCartClick = () => {
    addProductToCart(product)
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