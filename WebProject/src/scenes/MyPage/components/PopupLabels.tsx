import React, { useState } from 'react';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Input,
    Popover,
    Row,
    Space,
    Tag,
    Typography,
} from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import saga from '../saga';
import reducer from '../reducer';
import { L } from '../../../lib/abpUtility';
import {
    addCardLabel,
    // addCardLabel,
    addNewLabel,
    deleteCardLabel,
    mypageGetCardLabelStart,
    mypageGetLabelStart,
    mypageSelectColor,
    togglePopupLabel,
} from '../actions';
import {
    makeSelectCardLabelLoading,
    makeSelectColorChecked,
    makeSelectColors,
    makeSelectLabelLoading,
    makeSelectLabels,
    makeSelectPopupLabel,
} from '../selectors';
import { CardLabels } from '../dtos/cardLabels';
import { useInjectReducer, useInjectSaga } from '../../../redux/reduxInjectors';
import { LabelsDto } from '../dtos/labelsDto';

const key = 'mypage';
interface Iprops{
    cardLabel: CardLabels[],
    cardId: number,
}
const { Title } = Typography;

const stateMypage = createStructuredSelector<any, any>({
    colors: makeSelectColors(),
    colorChecked: makeSelectColorChecked(),
    cardLabels: makeSelectLabels(),
    popupLabel: makeSelectPopupLabel(),
    labelLoading: makeSelectLabelLoading(),
    labels: makeSelectCardLabelLoading(),
});

const PopupLabels = ({ cardLabel, cardId }:Iprops) => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const {
        colors,
        colorChecked,
        popupLabel,
        labelLoading,
        labels,
        cardLabels,
    } = useSelector(stateMypage);
    const [toggleCreateLabel, setToggleCreateLabel] = useState(false);
    const [newLabelName, setNewLabelName] = useState('');

    const handleHidePopup = () => {
        dispatch(togglePopupLabel(false));
        setToggleCreateLabel(false);
    };

    const handleCreateNewLabel = () => {
        dispatch(addNewLabel({
            labelName: newLabelName,
            color: colorChecked,
        }));
        setToggleCreateLabel(false);
    };

    const handleUpdateTask = (item:any) => {
        const check = cardLabels.find((ojb:CardLabels) => ojb.labelId === item.id);
        if (check) {
            dispatch(deleteCardLabel(check.id));
        } else {
            dispatch(addCardLabel({
                cardId,
                labelId: item.id,
            }));
        }
    };

    const handleOpenPopupLabel = () => {
        dispatch(mypageGetLabelStart(''));
        dispatch(mypageGetCardLabelStart(cardId));
    };

    return (
        <Popover
            placement="bottomLeft"
            title={(
                <Row justify="center" align="middle">
                    <p>{L('MyPage.Labels')}</p>
                    <Button
                        size="small"
                        style={{
                            position: 'absolute',
                            top: '18px',
                            right: '8px',
                            border: '1px solid #41719c',
                        }}
                        className="cancel-custom"
                        onClick={handleHidePopup}
                    >
                        X
                    </Button>
                </Row>
            )}
            trigger="click"
            content={(
                <>
                    {!toggleCreateLabel ? (
                        <div className="label-content-container">
                            <Input.Search placeholder={L('MyPage.Search-Labels')} onSearch={(values: string) => { dispatch(mypageGetLabelStart(values)); }} />
                            <Title level={5} style={{ fontSize: '11px', margin: '5px 0' }} className="title-custom">
                                {L('MyPage.Labels')}
                            </Title>
                            <Space
                                size={4}
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    cursor: 'pointer',
                                    maxHeight: 200,
                                    overflow: 'auto',
                                    scrollbarWidth: 'none',
                                }}
                            >
                                {labels && labels.map((item: LabelsDto) => (
                                    <Row
                                        key={item.id}
                                        style={{ backgroundColor: `${item.color}`, marginBottom: 5 }}
                                        onClick={() => handleUpdateTask(item)}
                                    >
                                        <Title level={5}>{item.labelName}</Title>
                                        {cardLabels && cardLabels
                                            .find((obj:CardLabels) => obj.labelId === item.id)
                                            && <CheckOutlined />}
                                    </Row>
                                ))}
                                <Button style={{ width: '100%' }} onClick={() => setToggleCreateLabel(true)}>
                                    {L('MyPage.CreateLabel')}
                                </Button>
                            </Space>
                        </div>
                    ) : (
                        <div>
                            <Title level={5} style={{ fontSize: '11px' }} className="title-custom">
                                {L('MyPage.Name')}
                            </Title>
                            <Input name="labelName" onChange={(e) => setNewLabelName(e.target.value)} />
                            <Title level={5} style={{ fontSize: '11px', margin: '5px 0' }} className="title-custom">
                                {L('MyPage.SelectColor')}
                            </Title>
                            <Row style={{ gap: '0 5px' }}>
                                {colors.map((item: any) => (
                                    <Col
                                        span={4}
                                        style={{
                                            backgroundColor: `${item.color}`,
                                            height: '30px',
                                            marginBottom: '5px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        key={item.color}
                                        onClick={() => dispatch(mypageSelectColor(item.color))}
                                    >
                                        {item.color === colorChecked && <CheckOutlined />}
                                    </Col>
                                ))}
                            </Row>
                            <Row justify="start">
                                <Col
                                    span={4}
                                    style={{
                                        backgroundColor: '#c9c9c9',
                                        height: '30px',
                                        marginBottom: '5px',
                                        marginRight: '5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onClick={() => dispatch(mypageSelectColor('#c9c9c9'))}
                                >
                                    {colorChecked === '#c9c9c9' && <CheckOutlined />}
                                </Col>
                                <Col span={18}>
                                    <p style={{ fontSize: '14px', lineHeight: '12px' }}>
                                        {L('MyPage.NoColor')}
                                        <br />
                                        {L('MyPage.NoColor-desc')}
                                    </p>
                                </Col>
                            </Row>

                            <Button type="primary" onClick={handleCreateNewLabel}>
                                {L('MyPage.Create')}
                            </Button>
                        </div>
                    )}
                </>
            )}
            visible={popupLabel}
        >

            {cardLabel.map((item:CardLabels) => (
                <Tag
                    key={item.labelId}
                    color={`${item.color}`}
                    style={{ padding: '1px 8px' }}
                    onClick={() => handleOpenPopupLabel()}
                >
                    {item.labelName}
                </Tag>
            ))}
            <Button
                size="small"
                className="bg-custom"
                onClick={() => handleOpenPopupLabel()}
                icon={<PlusOutlined style={{ fontSize: '11px' }} />}
                loading={labelLoading}
            />
        </Popover>
    );
};

export default PopupLabels;
