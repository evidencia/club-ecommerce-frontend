import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './Header.styles';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

function Header() {
  const { isAuthenticated } = useContext(UserContext)
  const { toggleCart, productsCount } = useContext(CartContext)

  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>

        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}

        { isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}

        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} />
          <p style={{marginLeft: 5}}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
   );
}

export default Header;