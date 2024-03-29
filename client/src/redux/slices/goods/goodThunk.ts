import { createAsyncThunk } from '@reduxjs/toolkit';
import GoodsService from '../../../services/goodsService';
import type { GoodType } from '../../../types/good';
import ModerationService from '../../../services/moderationService';

export const getAllGoodsThunk = createAsyncThunk(
  'good/getAllGoodsThunk',
  async (categoryId: number | null) => {
    const data = await GoodsService.getGoods(categoryId);
    return data;
  },
);

export const getOneGoodThunk = createAsyncThunk(
  'good/getOneGoodThunk',
  async (id: GoodType['id']) => {
    const data = await GoodsService.getOneGood(id);
    return data;
  },
);
export const getAdminGoodsThunk = createAsyncThunk('goods/getGoodsThunk', async () => {
  const data = await ModerationService.getGoods();
  return data;
});

export const getSearchGoodsThunk = createAsyncThunk(
  'goods/getGoodsThunk',
  async (search: string) => {
    const data = await GoodsService.getSearchedGoods(search);
    return data;
  },
);

export const getFilterThunk = createAsyncThunk(
  'goods/getFilterThunk',
  async ({ color, price, size }) => {
    const data = await GoodsService.getFilters({ color, price, size });
    return data;
  },
);

export const deleteGoodHandlerThunk = createAsyncThunk(
  'good/deleteGoodHandlerThunk',
  async (id: GoodType['id']) => {
    await GoodsService.deleteGood(id);
    return id;
  },
);
