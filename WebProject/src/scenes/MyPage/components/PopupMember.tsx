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
import {
    addCardMember,
    deleteCardMember,
    getListMembers,
    togglePopupMember,
} from '../actions';
import { L } from '../../../lib/abpUtility';
import {
    makeSelectgetCardMember,
    makeSelectPopupMember,
} from '../selectors';
import './taskCard.less';
import saga from '../saga';
import reducer from '../reducer';
import { CardMember } from '../dtos/cardMember';
import { useInjectReducer, useInjectSaga } from '../../../redux/reduxInjectors';
import EntityDto from '../../../services/dto/entityDto';

const key = 'mypage';
interface Iprops{
    cardMember: CardMember[],
    cardId:EntityDto
}

const { Title, Text } = Typography;

const stateMypage = createStructuredSelector<any, any>({
    popupMember: makeSelectPopupMember(),
    cardMemberDatas: makeSelectgetCardMember(),
});
const PopupMember = ({ cardMember, cardId }:Iprops) => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const {
        popupMember,
        cardMemberDatas,
    } = useSelector(stateMypage);

    const handleUpdateBoardMember = (name:string, id:number) => {
        const isBoardMember = cardMember.find((obj:any) => obj.employeeName === name);
        if (isBoardMember) {
            dispatch(deleteCardMember(isBoardMember.employeeId));
        } else {
            dispatch(addCardMember({
                cardId,
                employeeId: id,
            }));
        }
    };

    return (
        <Space size={4}>
            <Avatar.Group
                maxCount={5}
                maxStyle={{
                    backgroundColor: '#dbdbdb',
                    border: 'none',
                    width: '24px',
                    height: '24px',
                    lineHeight: '24px',
                }}
            >
                {cardMember.map((item:CardMember) => (
                    <Avatar
                        key={item.employeeId}
                        style={{ background: `${item.color}` }}
                        className="avt"
                        size="small"
                    >
                        {item.employeeName.split(' ').reverse().join(' ').charAt(0)}
                    </Avatar>
                ))}
            </Avatar.Group>
            <Popover
                placement="bottomLeft"
                title={(
                    <Row justify="center" align="middle">
                        <p>{L('MyPage.Members')}</p>
                        <Button
                            size="small"
                            style={{
                                position: 'absolute',
                                top: '18px',
                                right: '8px',
                                border: '1px solid #41719c',
                            }}
                            className="cancel-custom"
                            onClick={() => dispatch(togglePopupMember(false))}
                        >
                            X
                        </Button>
                    </Row>
                )}
                trigger="click"
                content={(
                    <div>
                        <Input.Search
                            placeholder={L('MyPage.Search')}
                            onSearch={(value:string) => dispatch(getListMembers({
                                keyword: value,
                                skipCount: 1,
                                maxResultCount: 1000,
                            }))}
                        />
                        <Title level={5} style={{ fontSize: '11px' }} className="title-custom">{L('MyPage.Board')}</Title>
                        <div style={{
                                maxHeight: '150px',
                                overflow: 'auto',
                            }}
                        >
                            <Space size={2} direction="vertical" style={{ width: '100%' }}>
                                {cardMemberDatas.map((item:any) => (
                                    <Row
                                        justify="space-between"
                                        style={{ alignItems: 'center', marginBottom: 10, cursor: 'pointer' }}
                                        key={item.id}
                                        onClick={() => handleUpdateBoardMember(item.employeeName, item.id)}
                                    >
                                        <Space size={4}>
                                            <Avatar
                                                className="card-info-title-custom"
                                                size="small"
                                                style={{
                                                backgroundColor: `${item.color}`,
                                            }}
                                            >
                                                {item.employeeName.split(' ').reverse().join(' ').charAt(0)}
                                            </Avatar>
                                            <Text
                                                className="card-info-title-custom"
                                            >
                                                {item.employeeName} ({item.employeeName.toLowerCase().split(' ').pop()})
                                            </Text>
                                        </Space>
                                        {cardMember.find((obj:CardMember) => obj.employeeName === item.employeeName) && <CheckOutlined />}
                                    </Row>
                            ))}
                            </Space>
                        </div>
                    </div>
                )}
                visible={popupMember}
            >
                <Button
                    size="small"
                    style={{
                        border: 'none',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                        marginBottom: '6px',
                    }}
                    className="bg-custom"
                    onClick={() => dispatch(togglePopupMember(true))}
                >
                    <PlusOutlined style={{ fontSize: '13px' }} />
                </Button>
            </Popover>
        </Space>
    );
};

export default PopupMember;
