import React from 'react';
import { Menu, Loader, Dimmer, Grid } from 'semantic-ui-react';
import './SideBar.less';
import { ReactComponent as SidebarIcon } from '@assets/svg/sidebar_icon.svg';
import { ReactComponent as DashboardIcon } from '@assets/svg/dashboard_icon.svg';
import { ReactComponent as BoxIcon } from '@assets/svg/box_icon.svg';
import { BsPersonFill } from 'react-icons/bs';
import { Icon } from 'semantic-ui-react';
import NeumoButton from '@app/components/neumo-button/NeumoButton';

const SideBar: React.FC<{ routerPath: string }> = (props) => {
  return (
    <nav className="side-bar">
      <Grid className="tight">
        <Grid.Column className="button-group">
          <NeumoButton
            shade="dark"
            raised
            navLink={`${props.routerPath}/dashboard`}
            Icon={<DashboardIcon />}
          />
          <NeumoButton
            shade="dark"
            raised
            navLink={`${props.routerPath}/storage`}
            Icon={<BoxIcon />}
          />
          <NeumoButton
            shade="dark"
            raised
            navLink={`${props.routerPath}/account`}
            Icon={<BsPersonFill />}
          />
          <NeumoButton
            shade="dark"
            raised
            navLink={`${props.routerPath}/request`}
            Icon={<Icon name="envelope" fitted />}
          />
        </Grid.Column>
      </Grid>
    </nav>
  );
};

export default SideBar;
