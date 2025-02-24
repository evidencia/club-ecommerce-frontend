import { BsCart3 } from 'react-icons/bs'
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './Header.styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../../converters/config/firebase.config';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../../store/toolkit/user/user.slice';
import { toggleCart } from '../../store/toolkit/cart/cart.slice';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectProductsCount } from '../../store/reducers/cart/cart.selectors';

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated } = useAppSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  const productsCount = useAppSelector(selectProductsCount)


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

  const handleSignOutClick = () => {
    dispatch(logoutUser())
    signOut(auth)
  }

  const handleCartClick = () => {
    dispatch(toggleCart())
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

        {isAuthenticated && (
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}

        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
}

export default Header;