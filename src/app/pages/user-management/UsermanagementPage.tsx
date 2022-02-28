import DataTable from '@app/components/data-table';
import SearchBar from '@app/components/SearchBar';
import { Column } from '@app/components/data-table/types';
import React from 'react';
import './UserManagementPage.less';
import usermock from '@app/assets/mock/user-management.json';
// import DetailImage from '@app/components/image/details-image/DetailIMage';
import NeumoButton from '@app/components/neumo-button/NeumoButton';
import { Icon } from 'semantic-ui-react';
import { isConstructorTypeNode } from 'typescript';
import { useState, ChangeEvent, MouseEvent } from 'react';
import CreateUser from '@app/pages/CreateUserPage';

interface UserList {
  no: number;
  fullName: string;
  accountName: string;
  role: string;
  status: string;
  details: any;
}

interface CreateUser {
  showCreateUser: false;
}

const UserManagementPage: React.FC = () => {
  const [modalPopUpPage, setModalPopUpPage] = useState(false);

  const columns = React.useMemo(
    (): Column<UserList>[] => [
      {
        header: 'No.',
        accessor: 'no',
      },
      {
        header: 'Full Name',
        accessor: 'fullName',
      },
      {
        header: 'Account Name',
        accessor: 'accountName',
      },
      {
        header: 'Role',
        accessor: 'role',
      },
      {
        header: 'Status',
        accessor: 'status',
      },
      {
        header: 'Details',
        accessor: 'details',
      },
    ],
    [],
  );

  const data = React.useMemo(
    (): UserList[] =>
      usermock.map((row) => ({
        no: row.number,
        fullName: row.fullName,
        accountName: row.accountName,
        role: row.role,
        status: row.status,
        details: 'icon',
      })),
    [],
  );

  const defaultProps: UserList[] = [];
  const [searchList, setDataList]: [
    UserList[],
    (posts: UserList[]) => void,
  ] = React.useState(defaultProps);
  const [searchUser, setSearchUser]: [
    string,
    (search: string) => void,
  ] = React.useState('');

  const handleChange = (e: { target: { value: string } }) => {
    setSearchUser(e.target.value);
  };

  return (
    <>
      <div className="search-bar">
        <SearchBar />

        <NeumoButton
          raised
          shape="rectangular"
          Icon={<Icon name="plus" />}
          label="New User"
          highlighted
          navLink={`create-account`}
        />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default UserManagementPage;
