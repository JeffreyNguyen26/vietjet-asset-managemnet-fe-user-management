import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

import DataList from '@app/components/data-list';
import AddPermissionToGroupModal from '@admin/user-management/group/components/AddPermissionToGroupModal';
import AddUserRoleToGroupModal from '@admin/user-management/group/components//AddUserRoleToGroupModal';

import { useConfirm, useDispatch, useFetchApi, useSelector } from '@app/hooks';
import { getRoles } from '@admin/user-management/role/role.slice';
import { getUsers } from '@admin/user-management/user/user.slice';
import {
  getUsersOfGroup,
  getRolesOfGroup,
  getPermissionsUIOfGroup,
  getPermissionsResourceOfGroup,
} from '@admin/user-management/group/group.slice';
import groupService from '@admin/user-management/group/group.service';
import permissionService from '@admin/user-management/permission/permission.service';
import { HolderType } from '@admin/user-management/utils/constants';

interface Props {
  isUser?: boolean;
  isRole?: boolean;
  isPermissionUI?: boolean;
  isPermissionResource?: boolean;
}
interface UserOrRoleType {
  id: string;
  name: string;
  username: string;
  fullName: string;
  description: string;
}
const UserRolePermissionOfGroup: React.FC<Props> = (props) => {
  const { isUser, isRole, isPermissionUI, isPermissionResource } = props;
  const [addUserRoleModal, setAddUserRoleModal] = useState(false);
  const [addPermissionModal, setAddPermissionModal] = useState(false);
  const {
    selectedGroup,
    roleOfGroupList,
    userOfGroupList,
    permissionUIOfGroupList,
    permissionResourceOfGroupList,
    getRolesOfGroupLoading,
    getUsersOfGroupLoading,
    getPermissionsUIOfGroupLoading,
    getPermissionsResourceOfGroupLoading,
  } = useSelector((state) => state.admin.userManagement.group);
  const data = useMemo(() => {
    if (isUser) {
      return userOfGroupList;
    }
    if (isRole) {
      return roleOfGroupList;
    }
    if (isPermissionUI) {
      return permissionUIOfGroupList;
    }
    if (isPermissionResource) {
      return permissionResourceOfGroupList;
    }
    return [];
  }, [
    userOfGroupList,
    roleOfGroupList,
    permissionUIOfGroupList,
    permissionResourceOfGroupList,
    isPermissionUI,
    isPermissionResource,
    isRole,
    isUser,
  ]);

  const dispatch = useDispatch();
  const title = useMemo(() => {
    if (selectedGroup) {
      if (isUser) {
        return `Ng?????i d??ng c???a ${selectedGroup.name}`;
      }
      if (isRole) {
        return `Vai tr?? c???a ${selectedGroup.name}`;
      }
    }
    return '';
  }, [isUser, isRole, selectedGroup]);
  const getData = useCallback(() => {
    if (selectedGroup) {
      if (isUser) {
        dispatch(getUsers());
        dispatch(getUsersOfGroup(selectedGroup.id));
      }
      if (isRole) {
        dispatch(getRoles());
        dispatch(getRolesOfGroup(selectedGroup.id));
      }
      if (isPermissionUI) {
        dispatch(getPermissionsUIOfGroup(selectedGroup.id));
      }
      if (isPermissionResource) {
        dispatch(getPermissionsResourceOfGroup(selectedGroup.id));
      }
    }
  }, [
    isUser,
    isRole,
    isPermissionUI,
    isPermissionResource,
    selectedGroup,
    dispatch,
  ]);
  useEffect(getData, [getData]);
  const confirm = useConfirm();
  const { fetch, fetching } = useFetchApi();

  const handleRemove = async (row: UserOrRoleType) => {
    if (selectedGroup) {
      if (isUser) {
        // remove user from group
        await fetch(groupService.removeUserToGroup(row.id, selectedGroup.id));
      }
      if (isRole) {
        // remove role from group
        await fetch(groupService.removeRoleToGroup(row.id, selectedGroup.id));
      }
      if (isPermissionUI) {
        // remove permission UI from group
        await fetch(
          permissionService.deletePermission(
            row.id,
            selectedGroup.id,
            HolderType.GROUP,
            true,
            false,
            false,
          ),
        );
      }
      if (isPermissionResource) {
        // remove permission Resource from group
        await fetch(
          permissionService.deletePermission(
            row.id,
            selectedGroup.id,
            HolderType.GROUP,
            false,
            true,
            false,
          ),
        );
      }
      getData();
    }
  };

  return (
    <>
      <DataList
        search
        title={title}
        data={data as UserOrRoleType[]}
        loading={
          fetching ||
          getUsersOfGroupLoading ||
          getRolesOfGroupLoading ||
          getPermissionsUIOfGroupLoading ||
          getPermissionsResourceOfGroupLoading
        }
        listActions={[
          {
            title: 'Th??m',
            color: 'green',
            icon: <FiPlus />,
            onClick: (): void => {
              if (isUser || isRole) {
                setAddUserRoleModal(true);
              } else {
                setAddPermissionModal(true);
              }
            },
          },
        ]}
        itemActions={[
          {
            title: 'Xo??',
            color: 'red',
            icon: <FiTrash2 />,
            onClick: (row) => confirm('X??c nh???n x??a?', () => handleRemove(row)),
          },
        ]}
        getRowKey={(d): string => d.id}
        itemHeaderRender={(d): string => (isUser ? d.username : d.name)}
        itemContentRender={(d): string => (isUser ? d.fullName : d.description)}
      />

      <AddUserRoleToGroupModal
        isRole={isRole}
        open={addUserRoleModal}
        onRefresh={getData}
        onClose={(): void => setAddUserRoleModal(false)}
      />

      <AddPermissionToGroupModal
        open={addPermissionModal}
        onRefresh={getData}
        isPermissionUI={isPermissionUI}
        isPermissionResource={isPermissionResource}
        onClose={(): void => setAddPermissionModal(false)}
      />
    </>
  );
};

export default UserRolePermissionOfGroup;
