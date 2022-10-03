import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Avatar,
    Button,
    Input,
    Popover,
    Row,
    Space,
    Typography,
} from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { L } from '../../../lib/abpUtility';
import { togglePopupMember } from '../actions';
import { makeSelectBoardMembers, makeSelectCheckedMember, makeSelectPopupMember } from '../selectors';
import './CardInformation.less';

const { Title, Text } = Typography;
const { Search } = Input;

const stateKanban = createStructuredSelector<any, any>({
    boardMembers: makeSelectBoardMembers(),
    checkedMember: makeSelectCheckedMember(),
    popupMember: makeSelectPopupMember(),
});

const PopupMember = () => {
    const dispatch = useDispatch();
    const {
        boardMembers,
        checkedMember,
        popupMember,
    } = useSelector(stateKanban);
    return (
        <Space size={4}>
            <Avatar
                size="small"
                className="card-info-title-custom"
                style={{
                    width: '27px',
                    height: '26px',
                }}
            >
                H
            </Avatar>
            <Popover
                placement="bottomLeft"
                title={(
                    <Row justify="center" align="middle">
                        <p>{L('Kanban.Members.title')}</p>
                        <Button
                            size="small"
                            style={{
                                position: 'absolute',
                                top: '18px',
                                right: '8px',
                            }}
                            className="card-info-btn-custom"
                            onClick={() => dispatch(togglePopupMember(false))}
                        >
                            X
                        </Button>
                    </Row>
                )}
                trigger="click"
                content={(
                    <div>
                        <Search
                            placeholder={L('Kanban.InputPlaceholder.SearchMember')}
                        />
                        <Title
                            level={5}
                            style={{ fontSize: '11px', fontWeight: 'bold' }}
                            className="card-info-title-custom"
                        >
                            {L('Kanban.Members.boardMembers')}
                        </Title>
                        <Space size={2} direction="vertical" style={{ width: '100%' }}>
                            {boardMembers.map((item:any) => (
                                <Row justify="space-between" key={item.id}>
                                    <Space size={4}>
                                        <Avatar
                                            className="card-info-title-custom"
                                            size="small"
                                            style={{
                                                backgroundColor: `${item.color}`,
                                            }}
                                        >
                                            {item.avatar}
                                        </Avatar>
                                        <Text
                                            className="card-info-title-custom"
                                        >
                                            {item.name} ({item.shortentName})
                                        </Text>
                                    </Space>
                                    {checkedMember === item.shortentName && <CheckOutlined />}
                                </Row>
                            ))}
                        </Space>
                    </div>
                )}
                visible={popupMember}
                overlayStyle={{
                    width: '300px',
                }}
            >
                <Button
                    size="small"
                    style={{
                        border: 'none',
                        borderRadius: '50%',
                        backgroundColor: '#dbdbdb',
                        width: '27px',
                        height: '26px',
                    }}
                    onClick={() => dispatch(togglePopupMember(true))}
                    className="card-info-btn-custom"
                >
                    <PlusOutlined style={{ fontSize: '13px' }} />
                </Button>
            </Popover>
        </Space>
    );
};

export default PopupMember;
