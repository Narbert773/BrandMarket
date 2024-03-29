import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NavBar from './layout/navbar/NavBar';
import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signin/SignUpPage';
import Footer from './layout/footer/Footer';
import HomePage from './pages/home/HomePage';
import GoodAddPage from './pages/goodAdd/GoodAddPage';
import SellerPage from './pages/seller/SellerPage';
import BasketPage from './pages/basket/BasketPage';
import FavoritesPage from './pages/favorites/FavoritePage';
import GoodEditPage from './pages/edit/GoodEditPage';
import GoodSoloPage from './components/good-solo-card/GoodSoloPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { userCheckThunk } from './redux/slices/auth/authThunks';
import getAllCategoriesThunk from './redux/slices/categories/categoryThunks';
import getAllBrandsThunk from './redux/slices/brands/brandThunks';
import getAllGendersThunk from './redux/slices/genders/genderThunks';
import PrivateRouter from './routes/privateRouter/PrivateRouter';
import Loader from './components/Loader';
import RegRouter from './components/routing/RegRouter';
import { getFavoritesThunk } from './redux/slices/favorites/favoritesThunks';
import ModerationSellerInputs from './pages/moderation/ModerationSellerInputs';
import ModerationUserList from './pages/moderation/ModerationUserList';
import { getBasketsThunk } from './redux/slices/baskets/basketThunks';
import AdminRouter from './components/routing/AdminRouter';
import ModerationGoodsListPage from './pages/moderation/moderationPage/ModerationGoodsListPage';
import OrderPage from './pages/order/OrderPage';
import ThankYouPage from './pages/thankYouPage/ThankYouPage';
import Filter from './components/filter/Filter';
import UserOrderPage from './pages/userOrder/UserOrderPage';

function App(): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  const { goods } = useAppSelector((state) => state.goods);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(userCheckThunk());
    void dispatch(getAllCategoriesThunk());
    void dispatch(getAllBrandsThunk());
    void dispatch(getAllGendersThunk());
  }, [dispatch]);

  useEffect(() => {
    void dispatch(getFavoritesThunk());
    void dispatch(getBasketsThunk());
  }, [dispatch, user.status]);

  return (
    <Loader isLoading={user.status === 'pending'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <NavBar />
        <Container
          maxWidth="xl"
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
          component="main"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:categoryId" element={<HomePage />} />
            <Route path="/goods/:id" element={<GoodSoloPage />} />
            <Route element={<PrivateRouter isAllowed={user.status !== 'authenticated'} />}>
              <Route path="/auth/login" element={<SignInPage />} />
              <Route path="/auth/registration" element={<SignUpPage />} />
            </Route>
            <Route element={<PrivateRouter isAllowed={user.status === 'authenticated'} />}>
              <Route path="/orders/purchase" element={<OrderPage />} />
              <Route path="/orders/purchase/thankyou" element={<ThankYouPage />} />
              <Route path="/orders/" element={<UserOrderPage />} />
              <Route element={<AdminRouter isSeller={user.roleId !== 1} />}>
                <Route path="/good/:id/edit" element={<GoodEditPage />} />
                <Route path="/seller/add" element={<GoodAddPage />} />
                <Route path="/seller/goods" element={<SellerPage />} />
              </Route>
              <Route path="/seller/new" element={<ModerationSellerInputs />} />
              <Route element={<AdminRouter isSeller={user.roleId === 3} />}>
                <Route path="/moderation" element={<ModerationUserList />} />
                <Route path="/moderation/goods" element={<ModerationGoodsListPage />} />
              </Route>
            </Route>
            <Route element={<RegRouter isAllowed={user.status !== 'authenticated'} />}>
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              {/* <Route path="/orders/purchase" element={<OrderPage />} /> */}
            </Route>
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Loader>
  );
}

export default App;
