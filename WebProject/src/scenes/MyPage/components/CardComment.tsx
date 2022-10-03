import {
    Avatar,
    Button,
    Col,
    Comment,
    Popconfirm,
    Row,
    Space,
    Input,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { L } from '../../../lib/abpUtility';
import { deleteCommentStart, editCommentStart } from '../actions';
import { CardCommentDto } from '../dtos/CardComment';
import { makeSelectgetCardMember } from '../selectors';

import './taskCard.less';

interface IProps {
    cardComment: CardCommentDto;
}

const { TextArea } = Input;

const stateMypage = createStructuredSelector<any, any>({
    cardMembers: makeSelectgetCardMember(),
});

declare const abp:any;

const CardComments = ({ cardComment }:IProps) => {
    const dispatch = useDispatch();
    const { employeeId, detail, createDate } = cardComment;
    const [commentText, setCommentText] = useState(cardComment.detail);
    const [toggleEditComment, setToggleEditComment] = useState(false);
    const { cardMembers } = useSelector(stateMypage);
    const member = cardMembers.find((item:any) => item.id === cardComment.employeeId);
    const name = cardMembers.find((item:any) => item.id === employeeId);
    const handleCancel = () => {
        setToggleEditComment(false);
        setCommentText(cardComment.detail);
    };
    const handleEditComment = () => {
        dispatch(editCommentStart({
            id: cardComment.cardCommentId,
            detail: commentText,
        }));
        handleCancel();
    };

    const getAvatarChar = () => {
        if (member) {
            return member.employeeName.split(' ').reverse().join('').charAt(0);
        }
            return 'Unkown';
    };

    const getColor = () => {
        if (member) {
            return member.color;
        }
            return '#c9c9c9';
    };

    const handleDeleteComment = () => {
        dispatch(deleteCommentStart(cardComment.cardCommentId));
    };

    return (
        <>
            {
                !toggleEditComment ? (
                    <>
                        <Comment
                            author={(
                                <h4
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: '14px',
                                    }}
                                    className="title-custom"
                                >
                                    {
                                        name?.employeeName
                                    }
                                </h4>
                            )}
                            avatar={(
                                <Avatar
                                    className="title-custom"
                                    style={{
                                        backgroundColor: `${getColor()}`,
                                    }}
                                >
                                    {getAvatarChar()}
                                </Avatar>
                            )}
                            content={(
                                <p>
                                    {detail}
                                </p>
                            )}
                            datetime={(
                                <span
                                    className="title-custom"
                                    style={{ color: '#000000' }}
                                >
                                    {moment(createDate).format('MMM do YYYY [at] hh:mm A')}
                                </span>
                            )}
                        />
                        <Row hidden={cardComment.employeeId !== abp.session.userId}>
                            <Col offset={2}>
                                <Space size={4}>
                                    <Button
                                        className="popup-btn"
                                        onClick={() => setToggleEditComment(true)}
                                    >
                                        {L('MyPage.Edit')}
                                    </Button>
                                    <span>-</span>
                                    <Popconfirm
                                        title={L('MyPage.Confirm')}
                                        onConfirm={handleDeleteComment}
                                    >
                                        <Button className="popup-btn">
                                            {L('MyPage.Delete')}
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Row gutter={[8, 8]}>
                        <Col span={2}>
                            <Avatar className="title-custom" style={{ background: `${member.color}` }}>
                                {member.employeeName.split(' ').reverse().join('').charAt(0)}
                            </Avatar>
                        </Col>
                        <Col span={22} style={{ padding: '10px 2px' }}>
                            <TextArea
                                defaultValue={commentText}
                                placeholder="Write a comment..."
                                onChange={(e) => setCommentText(e.target.value)}
                                autoSize={{ minRows: 1, maxRows: 1 }}
                            />
                            <Space size={4} style={{ marginTop: '4px' }}>
                                <Button
                                    style={{ background: '#525252', color: 'white', border: 'none' }}
                                    type="primary"
                                    onClick={handleEditComment}
                                >
                                    {L('MyPage.Save')}
                                </Button>
                                <Button onClick={handleCancel}>
                                    {L('MyPage.Cancel')}
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                )
            }
        </>
    );
};

export default CardComments;
