import * as React from 'react';

import {
    Avatar,
    Badge,
    Col,
    Dropdown,
    Menu,
    Row,
    Switch,
} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { L } from '../../lib/abpUtility';
import LanguageSelect from '../LanguageSelect';
import profilePicture from '../../images/user.png';
import { makeSelectDefaultTheme } from '../../redux/global/selectors';
import { changeTheme } from '../../redux/global/actions';
import './index.less';

const stateSelector = createStructuredSelector<any, any>({
    defaultTheme: makeSelectDefaultTheme(),
});
export interface IHeaderProps {
    collapsed: boolean;
    toggle: () => void;
}
const userDropdownMenu = (
    <Menu>
        <Menu.Item key="2">
            <Link to="/admin/logout">
                <LogoutOutlined />
                <span> {L('Logout')}</span>
            </Link>
        </Menu.Item>
    </Menu>
);
const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
    const { collapsed, toggle } = props;
    const dispatch = useDispatch();
    const { defaultTheme } = useSelector(stateSelector);

    return (
        <Row className="header-container">
            <Col style={{ textAlign: 'left' }} span={12}>
                {collapsed ? (
                    <MenuUnfoldOutlined className="trigger" onClick={toggle} />
                ) : (
                    <MenuFoldOutlined className="trigger" onClick={toggle} />
                )}
            </Col>
            <Col style={{ padding: '0px 15px 0px 15px', textAlign: 'right' }} span={12}>
                <Switch
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    checked={defaultTheme === 'dark'}
                    onChange={(val) => dispatch(changeTheme(val ? 'dark' : 'light'))}
                    style={{ marginRight: '5px' }}
                />
                <LanguageSelect />
                <Dropdown overlay={userDropdownMenu} trigger={['click']}>
                    <Badge style={{}} count={3}>
                        <Avatar style={{ height: 24, width: 24 }} shape="circle" alt="profile" src={profilePicture} />
                    </Badge>
                </Dropdown>
            </Col>
        </Row>
    );
};

export default Header;
