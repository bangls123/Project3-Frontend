import {
    Avatar,
    Button,
    Col,
    Input,
    Modal,
    Row,
    Space,
    Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import reducer from '../reducer';
import saga from '../saga';

import { L } from '../../../lib/abpUtility';
import {
    mypageAddCommentsStart,
    mypageEditListCardStart,
    mypageGetCardStatusStart,
    togglePopupCardDetail,
    togglePopupLabel,
    togglePopupMember,
} from '../actions';
import {
    makeSelectCardDetail,
    makeSelectCardDetailVisible,
    makeSelectgetCardCompleted,
    makeSelectgetCardMember,
    makeSelectPopupLabel,
    makeSelectPopupMember,
} from '../selectors';

import PopupLabels from './PopupLabels';
import PopupMember from './PopupMember';
import { useInjectReducer, useInjectSaga } from '../../../redux/reduxInjectors';
import CardComments from './CardComment';

declare const abp: any;
const key = 'mypage';

const stateMypage = createStructuredSelector<any, any>({
    cardDetailVisible: makeSelectCardDetailVisible(),
    cardDetail: makeSelectCardDetail(),
    popupMember: makeSelectPopupMember(),
    popupLabel: makeSelectPopupLabel(),
    getCardCompleted: makeSelectgetCardCompleted(),
    cardMembers: makeSelectgetCardMember(),

});

const PopupCardDetail = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const {
        cardDetailVisible,
        cardDetail,
        popupLabel,
        popupMember,
        getCardCompleted,
        cardMembers,
    } = useSelector(stateMypage);

    const [descriptionBtnVisible, setDescriptionBtnVisible] = useState(false);
    const [commentBtnVisible, setCommentBtnVisible] = useState(false);
    const [descriptionText, setDescriptionText] = useState(cardDetail.descriptions);
    const [commentText, setCommentText] = useState('');
    const id = abp.session.userId;

    const member = cardMembers.find((item:any) => item.id === id);

    const hidePopup = () => {
        setCommentBtnVisible(false);
        setDescriptionBtnVisible(false);
        if (popupLabel) dispatch(togglePopupLabel(false));
        if (popupMember) dispatch(togglePopupMember(false));
        dispatch(togglePopupCardDetail());
        dispatch(mypageGetCardStatusStart(id));
    };
    const handleOpenDescription = () => {
        setDescriptionBtnVisible(true);
    };
    const handleCancelDescription = () => {
        setDescriptionBtnVisible(false);
        setDescriptionText(cardDetail.descriptions);
    };
    const handleOpenComment = () => {
        setCommentBtnVisible(true);
    };
    const handleCancelComment = () => {
        setCommentBtnVisible(false);
        setCommentText('');
    };
    const saveDesc = () => {
        dispatch(mypageEditListCardStart({
            id: cardDetail.id,
            cardStatusId: cardDetail.cardStatusId,
            cardTitle: cardDetail.cardTitle,
            descriptions: descriptionText,
        }));
        setDescriptionBtnVisible(false);
    };
    const addComments = (value:any) => {
        dispatch(mypageAddCommentsStart({
            cardId: cardDetail.id,
            detail: value,
        }));
        setCommentBtnVisible(false);
        setCommentText('');
    };
    useEffect(() => {
        if (getCardCompleted) { dispatch(togglePopupCardDetail()); }
        setDescriptionText(cardDetail.descriptions);
    }, [cardDetail.descriptions, dispatch, getCardCompleted]);
    return (
        <div>
            <Modal
                title={(
                    <Space direction="vertical">
                        <Typography.Title level={4} className="titleModal">
                            {L('MyPage.#')}{cardDetail?.id}
                        </Typography.Title>
                        <Typography.Title level={4} className="titleModal">
                            {cardDetail?.cardTitle}
                        </Typography.Title>
                        <Typography.Text style={{ fontSize: 14 }} className="title">
                            {L('MyPage.inList')} {cardDetail?.orderNo}
                        </Typography.Text>
                    </Space>
                )}
                visible={cardDetailVisible}
                footer={null}
                onCancel={hidePopup}
                maskClosable={false}
                destroyOnClose
                className="modalTask"
                centered
            >
                <Col>
                    <Row gutter={16} style={{ margin: 0 }}>
                        <Col style={{ paddingLeft: 0 }}>
                            <Row>
                                <Typography.Text className="title-custom">
                                    {L('MyPage.Members')}
                                </Typography.Text>
                            </Row>
                            <Row>
                                <PopupMember cardMember={cardDetail.cardMembers} cardId={cardDetail.id} />
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Typography.Text className="title-custom">
                                    {L('MyPage.Labels')}
                                </Typography.Text>
                            </Row>
                            <Row>
                                <PopupLabels cardLabel={cardDetail.cardLabels} cardId={cardDetail.id} />
                            </Row>
                        </Col>
                    </Row>
                    <div style={{ marginTop: '10px' }}>
                        <Typography.Title level={5} className="title-custom">
                            {L('MyPage.Description')}
                        </Typography.Title>
                        <Input.TextArea
                            defaultValue={cardDetail.descriptions}
                            value={descriptionText}
                            className="description"
                            placeholder={L('MyPage.Description-Input')}
                            autoSize={{ minRows: 3, maxRows: 3 }}
                            onClick={() => handleOpenDescription()}
                            onChange={(e) => setDescriptionText(e.target.value)}
                        />
                        {descriptionBtnVisible && (
                        <Space size={4} style={{ marginTop: '4px' }}>
                            <Button
                                type="primary"
                                onClick={saveDesc}
                                disabled={descriptionText === ''}
                            >
                                {L('MyPage.Save')}
                            </Button>
                            <Button
                                style={{ background: '#525252', color: 'white' }}
                                onClick={handleCancelDescription}
                            >
                                {L('MyPage.Cancel')}
                            </Button>
                        </Space>
                        )}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Typography.Title level={5} className="title-custom">
                            {L('MyPage.Activity')}
                        </Typography.Title>
                        <Row gutter={[8, 8]}>
                            <Col span={2}>
                                <Avatar className="avt" style={{ background: `${member?.color}` }}>
                                    { member?.employeeName.split(' ').reverse().join('').charAt(0)}
                                </Avatar>
                            </Col>
                            <Col span={22} style={{ padding: '4px 4px 4px 0px' }}>
                                <Input.TextArea
                                    placeholder={L('MyPage.Comment')}
                                    autoSize={{ minRows: 1, maxRows: 1 }}
                                    onClick={() => handleOpenComment()}
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                {commentBtnVisible && (
                                <Space size={4} style={{ marginTop: '4px' }}>
                                    <Button
                                        style={{ border: 'none' }}
                                        type="primary"
                                        onClick={() => addComments(commentText)}
                                        disabled={commentText === ''}
                                    >{L('MyPage.Save')}
                                    </Button>
                                    <Button
                                        style={{ background: '#525252', color: 'white' }}
                                        onClick={() => handleCancelComment()}
                                    >
                                        {L('MyPage.Cancel')}
                                    </Button>
                                </Space>
                                )}
                            </Col>
                        </Row>
                    </div>
                    <div className="commentCard">
                        {
                        cardDetail.cardComments && cardDetail.cardComments.map((item:any) => (
                            <CardComments cardComment={item} key={item.cardCommentId} />
                        ))
                    }
                    </div>
                </Col>
            </Modal>
        </div>
    );
};

export default PopupCardDetail;
