import React, { useEffect } from 'react';
import { IconButton, Link, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { GoodType } from '../../../../types/good';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { deleteSellerGoodHandlerThunk } from '../../../../redux/slices/seller/sellerThunk';
import { getAllUsersThunk } from '../../../../redux/slices/moderationSellers/moderationThunks';

type GoodAdminProps = {
  good: GoodType;
};

export default function ModerationGoodItem({
  good,
  index,
}: GoodAdminProps & { index: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    void dispatch(getAllUsersThunk());
  }, []);

  const user = users.find((userone) => userone.id === good.userId);

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableBody>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell style={{ width: '10%', fontWeight: 600 }} align="left">
            {index}.
          </TableCell>
          <TableCell style={{ width: '10%' }} component="th" scope="row">
            {user? user.name : 'admin'}
          </TableCell>
          <TableCell style={{ width: '35%' }} component="th" scope="row">
            {good.title}
          </TableCell>
          <TableCell style={{ width: '15%' }} align="left">
            Размер: {good.size}
          </TableCell>
          <TableCell style={{ width: '15%' }} align="right">
            {good.price} ₽
          </TableCell>
          <TableCell style={{ width: '22.5%' }} align="right">
            <Tooltip title="Редактировать">
              <IconButton>
                <Link
                  color="inherit"
                  underline="none"
                  component={NavLink}
                  to={`/good/${good.id}/edit`}
                >
                  <ModeEditIcon />
                </Link>
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell style={{ width: '22.5%' }} align="right">
            <Tooltip title="Удалить">
              <IconButton onClick={() => void dispatch(deleteSellerGoodHandlerThunk(good.id))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
