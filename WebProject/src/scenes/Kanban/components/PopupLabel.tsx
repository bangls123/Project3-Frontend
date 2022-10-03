import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Input,
    Popover,
    Row,
    Space,
    Typography,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { L } from '../../../lib/abpUtility';
import { kanbanSelectColor, kanbanSelectLabel, togglePopupLabel } from '../actions';
import {
    makeSelectColorChecked,
    makeSelectColors,
    makeSelectLabelChecked,
    makeSelectLabels,
    makeSelectPopupLabel,
} from '../selectors';
import './CardInformation.less';

const { Title } = Typography;
const { Search } = Input;

const stateKanban = createStructuredSelector<any, any>({
    colors: makeSelectColors(),
    colorChecked: makeSelectColorChecked(),
    labels: makeSelectLabels(),
    labelChecked: makeSelectLabelChecked(),
    popupLabel: makeSelectPopupLabel(),
});

const PopupLabel = () => {
    const dispatch = useDispatch();
    const {
        colors,
        colorChecked,
        labels,
        labelChecked,
        popupLabel,
    } = useSelector(stateKanban);
    const [toggleCreateLabel, setToggleCreateLabel] = useState(false);
    const handleHidePopup = () => {
        dispatch(togglePopupLabel(false));
        setToggleCreateLabel(false);
    };
    return (
        <Popover
            placement="bottomLeft"
            title={(
                <Row justify="center" align="middle">
                    <p>{L('Kanban.Labels.labels')}</p>
                    <Button
                        size="small"
                        style={{
                            position: 'absolute',
                            top: '18px',
                            right: '8px',
                        }}
                        onClick={handleHidePopup}
                        className="card-info-btn-custom"
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
                            <Search
                                placeholder={L('Kanban.InputPlaceholder.SearchMember')}
                            />
                            <Title
                                level={5}
                                style={{ fontSize: '11px', fontWeight: 'bold' }}
                                className="card-info-title-custom"
                            >
                                {L('Kanban.Labels.labels')}
                            </Title>
                            <Space size={4} direction="vertical" style={{ width: '100%' }}>
                                {labels.map((item:any) => (
                                    <Row
                                        key={item.id}
                                        style={{
                                            backgroundColor: `${item.color}`,
                                            color: '#ffffff',
                                            padding: '2px 5px',
                                        }}
                                        onClick={() => dispatch(kanbanSelectLabel(item.label))}
                                        justify="space-between"
                                        align="middle"
                                    >
                                        <Title
                                            level={5}
                                            className="card-info-title-custom"
                                        >
                                            {item.label}
                                        </Title>
                                        {item.label === labelChecked && <CheckOutlined />}
                                    </Row>
                                ))}
                                <Button
                                    style={{ width: '100%' }}
                                    onClick={() => setToggleCreateLabel(true)}
                                >
                                    {L('Kanban.Labels.CreateNewLabel')}
                                </Button>
                            </Space>
                        </div>
                    ) : (
                        <div>
                            <Title
                                level={5}
                                style={{ fontSize: '11px', fontWeight: 'bold' }}
                                className="card-info-title-custom"
                            >
                                {L('Kanban.Labels.nameSearchLabel')}
                            </Title>
                            <Input placeholder={L('Kanban.InputPlaceholder.NameLabel')} />
                            <Title
                                level={5}
                                style={{ fontSize: '11px', fontWeight: 'bold' }}
                                className="card-info-title-custom"
                            >
                                {L('Kanban.Labels.SelectAColor')}
                            </Title>
                            <Row style={{ gap: '5px' }}>
                                {colors.map((item:any) => (
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
                                        onClick={() => dispatch(kanbanSelectColor(item.color))}
                                    >
                                        {item.color === colorChecked && (
                                            <CheckOutlined />
                                        )}
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
                                    onClick={() => dispatch(kanbanSelectColor('#c9c9c9'))}
                                >
                                    {colorChecked === '#c9c9c9' && <CheckOutlined />}
                                </Col>
                                <Col span={18}>
                                    <p style={{ fontSize: '14px', lineHeight: '12px' }}>
                                        {L('Kanban.Labels.noColor')}<br />
                                        {L('Kanban.Labels.noColorDescription')}
                                    </p>
                                </Col>
                            </Row>
                            <Button
                                type="primary"
                                onClick={() => setToggleCreateLabel(false)}
                            >
                                {L('Kanban.Labels.CreateBtn')}
                            </Button>
                        </div>
                    )}
                </>
            )}
            visible={popupLabel}
            overlayStyle={{
                width: '300px',
            }}
        >
            <Space size={4}>
                <Button
                    size="small"
                    style={{
                        border: 'none',
                        backgroundColor: '#70ad47',
                        color: '#ffffff',
                        borderRadius: '2px',
                    }}
                    onClick={() => dispatch(togglePopupLabel(true))}
                >
                    {L('Kanban.Labels.Task')}
                </Button>
                <Button
                    size="small"
                    className="card-info-btn-custom"
                    style={{
                        border: 'none',
                        backgroundColor: '#dbdbdb',
                    }}
                    onClick={() => dispatch(togglePopupLabel(true))}
                >
                    <PlusOutlined style={{ fontSize: '13px' }} />
                </Button>
            </Space>
        </Popover>
    );
};

export default PopupLabel;
