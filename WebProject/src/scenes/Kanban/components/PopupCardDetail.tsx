import {
    Avatar,
    Button,
    Col,
    Modal,
    Row,
    Space,
    Typography,
    Input,
    Popconfirm,
    Comment,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { L } from '../../../lib/abpUtility';
import {
    makeSelectCardDetail,
    makeSelectCardDetailVisible,
    makeSelectPopupLabel,
    makeSelectPopupMember,
} from '../selectors';
import { togglePopupCardDetail, togglePopupLabel, togglePopupMember } from '../actions';
import { CardDetailDto } from '../dtos/cardDetailDto';
import './CardInformation.less';
import PopupMember from './PopupMember';
import PopupLabel from './PopupLabel';

const { Title, Text } = Typography;
const { TextArea } = Input;

const stateKanban = createStructuredSelector<any, any>({
    cardDetailVisible: makeSelectCardDetailVisible(),
    cardDetail: makeSelectCardDetail(),
    popupMember: makeSelectPopupMember(),
    popupLabel: makeSelectPopupLabel(),
});

const PopupCardDetail = () => {
    const dispatch = useDispatch();
    const {
        cardDetailVisible,
        cardDetail,
        popupLabel,
        popupMember,
    } = useSelector(stateKanban);
    const [descriptionBtnVisible, setDescriptionBtnVisible] = useState(false);
    const [commentBtnVisible, setCommentBtnVisible] = useState(false);
    const [toggleEditComment, setToggleEditComment] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');
    const [commentText, setCommentText] = useState('');

    const hidePopup = () => {
        setCommentBtnVisible(false);
        setDescriptionBtnVisible(false);
        setToggleEditComment(false);
        if (popupLabel) dispatch(togglePopupLabel(false));
        if (popupMember) dispatch(togglePopupMember(false));
        dispatch(togglePopupCardDetail({} as CardDetailDto));
    };
    const handleOpenDescription = () => {
        setDescriptionBtnVisible(true);
    };
    const handleCancelDescription = () => {
        setDescriptionText('');
    };
    const handleOpenComment = () => {
        setCommentBtnVisible(true);
    };
    const handleSaveComment = () => {
        setCommentText('');
    };
    const handleClickOutSide = () => {
        if (commentBtnVisible) setCommentBtnVisible(false);
        if (descriptionBtnVisible) setDescriptionBtnVisible(false);
    };
    return (
        <Modal
            visible={cardDetailVisible}
            className="card-information-container"
            footer={null}
            onCancel={hidePopup}
            maskClosable={false}
            title={(
                <Space size={0} direction="vertical">
                    <Title level={4} className="card-info-title-custom">
                        #{cardDetail.timeId}
                    </Title>
                    <Title level={4} className="card-info-title-custom">
                        {cardDetail.taskText}
                    </Title>
                    <Text className="card-info-title-custom">
                        {L('Kanban.inlist')} {cardDetail.listNumber}
                    </Text>
                </Space>
            )}
        >
            <div
                role="presentation"
                onClick={handleClickOutSide}
            >
                <Row gutter={16}>
                    <Col>
                        <Row>
                            <Text className="card-info-title-custom">
                                {L('Kanban.Members.title')}
                            </Text>
                        </Row>
                        <Row>
                            <PopupMember />
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Text className="card-info-title-custom">
                                {L('Kanban.Labels.labels')}
                            </Text>
                        </Row>
                        <Row>
                            <PopupLabel />
                        </Row>
                    </Col>
                </Row>
                <div style={{ marginTop: '10px' }}>
                    <Title level={5} className="card-info-title-custom">
                        {L('Kanban.Description')}
                    </Title>
                    <TextArea
                        value={descriptionText}
                        placeholder={L('Kanban.InputPlaceholder.WriteDetailDescription')}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        onClick={handleOpenDescription}
                        onChange={(e) => setDescriptionText(e.target.value)}
                    />
                    {descriptionBtnVisible && (
                        <Space size={4} style={{ marginTop: '4px' }}>
                            <Button type="primary">
                                {L('Kanban.SaveBtn')}
                            </Button>
                            <Button onClick={handleCancelDescription}>
                                {L('Kanban.CancelBtn')}
                            </Button>
                        </Space>
                    )}
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Title level={5} className="card-info-title-custom">
                        {L('Kanban.Activity')}
                    </Title>
                    <Row gutter={[8, 8]}>
                        <Col span={2}>
                            <Avatar className="card-info-title-custom">
                                H
                            </Avatar>
                        </Col>
                        <Col span={22}>
                            <TextArea
                                value={commentText}
                                placeholder={L('Kanban.InputPlaceholder.WriteAComment')}
                                autoSize={{ minRows: 1, maxRows: 1 }}
                                onClick={handleOpenComment}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            {commentBtnVisible && (
                                <Space size={4} style={{ marginTop: '4px' }}>
                                    <Button
                                        type="primary"
                                        onClick={handleSaveComment}
                                    >
                                        {L('Kanban.SaveBtn')}
                                    </Button>
                                </Space>
                            )}
                        </Col>
                    </Row>
                </div>
                <div>
                    {!toggleEditComment ? (
                        <Comment
                            author={(
                                <h4
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                        fontSize: '14px',
                                    }}
                                    className="card-info-title-custom"
                                >
                                    Nguyễn Bá Đức
                                </h4>
                            )}
                            avatar={<Avatar className="card-info-title-custom" alt="NguyenDuc">H</Avatar>}
                            content={(
                                <p>
                                    Lorem ipsum dolor sit amet
                                </p>
                            )}
                            datetime={(
                                <span
                                    className="card-info-title-custom"
                                    style={{ color: '#000000' }}
                                >
                                    Jan 17 at 9:27 AM
                                </span>
                            )}
                        />
                        ) : (
                            <Row gutter={[8, 8]}>
                                <Col span={2}>
                                    <Avatar className="card-info-title-custom">
                                        H
                                    </Avatar>
                                </Col>
                                <Col span={22}>
                                    <TextArea
                                        placeholder={L('Kanban.InputPlaceholder.WriteAComment')}
                                        autoSize={{ minRows: 1, maxRows: 1 }}
                                    />
                                    <Space size={4} style={{ marginTop: '4px' }}>
                                        <Button
                                            type="primary"
                                            onClick={() => setToggleEditComment(false)}
                                        >
                                            {L('Kanban.SaveBtn')}
                                        </Button>
                                        <Button
                                            onClick={() => setToggleEditComment(false)}
                                        >
                                            {L('Kanban.CancelBtn')}
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        )}
                </div>
                <Row>
                    <Col offset={2}>
                        <Space size={4}>
                            <Button
                                className="popup-btn"
                                onClick={() => setToggleEditComment(true)}
                            >
                                {L('Kanban.editBtn')}
                            </Button>
                            <span>-</span>
                            <Popconfirm
                                title={L('PopupDelete.ConfirmMessage')}
                            >
                                <Button className="popup-btn">
                                    {L('Kanban.deleteBtn')}
                                </Button>
                            </Popconfirm>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Modal>
  );
};

export default PopupCardDetail;
