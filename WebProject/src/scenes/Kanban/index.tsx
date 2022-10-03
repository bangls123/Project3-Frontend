import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Space,
} from 'antd';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useInjectReducer } from '../../redux/reduxInjectors';
import {
    makeSelectAddListButtonFlag,
    makeSelectDatas,
    makeSelectDragInfo,
    makeSelectReloadF,
} from './selectors';
import reducer from './reducer';

import { kanbanDrapCardStart, toggleAddListButton } from './actions';
import './index.less';
import CardsList from './components/CardsList';
import { L } from '../../lib/abpUtility';
import PopupCardDetail from './components/PopupCardDetail';

const key = 'kanban';

const stateKanban = createStructuredSelector<any, any>({
    addListButtonFlag: makeSelectAddListButtonFlag(),
    reloadF: makeSelectReloadF(),
    datas: makeSelectDatas(),
    dragInfo: makeSelectDragInfo(),
});

const Kanban:React.FunctionComponent = () => {
    useInjectReducer(key, reducer);
    const dispatch = useDispatch();
    const {
        addListButtonFlag,
        reloadF,
        datas,
    } = useSelector(stateKanban);

    const handleDragStart = (event:React.DragEvent<HTMLDivElement>, fromList:any) => {
        dispatch(kanbanDrapCardStart({
            taskId: event.currentTarget.id,
            fromList,
        }));
    };
    const allowDrop = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Card>
                {reloadF ? '' : ''}
                <div
                    style={{
                        overflowX: 'scroll',
                        display: 'flex',
                        minHeight: '30em',
                        gap: '5px',
                    }}
                >
                    {datas.map((item:any) => (
                        <Col span={6} key={item.title}>
                            <CardsList
                                cardList={item}
                                handleDragStart={(e) => handleDragStart(e, `${item.id}`)}
                                allowDrop={(e) => allowDrop(e)}
                            />
                        </Col>
                    ))}
                    <Col span={6}>
                        {!addListButtonFlag ? (
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => dispatch(toggleAddListButton())}
                                style={{ backgroundColor: '#f0f0f0', width: '100%' }}
                                className="btn-custom"
                            >
                                {L('Kanban.AddAnotherList')}
                            </Button>
                            ) : (
                                <Form style={{ backgroundColor: '#f0f0f0', padding: '8px' }}>
                                    <Form.Item name="ListTitle">
                                        <Input placeholder={L('Kanban.InputPlaceHolder.ListTitle')} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Space size="small">
                                            <Button type="primary" htmlType="submit">
                                                {L('Kanban.AddListBtn')}
                                            </Button>
                                            <Button onClick={() => dispatch(toggleAddListButton())}>
                                                {L('Kanban.CancelBtn')}
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            )}
                    </Col>
                </div>
            </Card>
            <PopupCardDetail />
        </>
    );
};

export default Kanban;
