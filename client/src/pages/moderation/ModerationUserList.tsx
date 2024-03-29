import { TableContainer } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllUsersThunk } from '../../redux/slices/moderationSellers/moderationThunks';
import ModerationEditPage from './moderationPage/ModerationEditPage';

export default function ModerationUserList(): JSX.Element {
  const { users } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAllUsersThunk());
  }, []);

  return (
    <TableContainer>
      <ModerationEditPage users={users} />
    </TableContainer>
  );
}
