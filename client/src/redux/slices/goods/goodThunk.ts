import { createAsyncThunk } from '@reduxjs/toolkit';
import GoodsService from '../../../services/goodsService';
import type { GoodType } from '../../../types/good';

export const getAllGoodsThunk = createAsyncThunk('good/getAllGoodsThunk', async () => {
  const data = await GoodsService.getGoods();
  return data;
});

export const deleteGoodHandlerThunk = createAsyncThunk(
  'good/deleteGoodHandlerThunk',
  async (id: GoodType['id']) => {
    await GoodsService.deleteGood(id);
    return id;
  },
);
