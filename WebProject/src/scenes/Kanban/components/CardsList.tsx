import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Space,
} from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { L } from '../../../lib/abpUtility';
import { kanbanDrapCardEnd } from '../actions';
import { CardListDto } from '../dtos/cardListDto';
import { makeSelectDatas, makeSelectDragInfo } from '../selectors';
import CardInformation from './CardInformation';
import './CardsList.less';

const { TextArea } = Input;

interface IProps {
    cardList: CardListDto;
    handleDragStart: (e:any) => void;
    allowDrop: (e:any) => void;
}

const stateKanban = createStructuredSelector<any, any>({
    dragInfo: makeSelectDragInfo(),
    datas: makeSelectDatas(),
});

const CardsList = ({ cardList, handleDragStart, allowDrop }:IProps) => {
    const [ToggleAddCard, setToggleAddCard] = useState(false);
    const { id, title, cards } = cardList;
    const total = cards.length;
    const { datas, dragInfo } = useSelector(stateKanban);
    const dispatch = useDispatch();
    const handleEmptyListDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (datas[e.currentTarget.id].cards.length === 0) {
            const index = datas[dragInfo.fromList]
                .cards.findIndex((item:any) => `${item.timeId}` === dragInfo.taskId);
            const taskCard = datas[dragInfo.fromList].cards[index];
            datas[dragInfo.fromList].cards.splice(index, 1);
            datas[e.currentTarget.id].cards.push({ ...taskCard, listNumber: e.currentTarget.id });
            dispatch(kanbanDrapCardEnd(datas));
        }
    };

    return (
        <Card
            className="cardsList-container"
            style={{ minHeight: '150px' }}
        >
            <Row justify="space-between">
                <Col>
                    <p className="title-custom">{title}</p>
                    <p
                        className="title-custom"
                        style={{ opacity: '0.5' }}
                    >
                        {total} {L('Kanban.totalCards')}
                    </p>
                </Col>
                <Button
                    size="small"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        padding: 0,
                    }}
                >
                    <EllipsisOutlined />
                </Button>
            </Row>
            <div
                id={`${id}`}
                className="target-drop"
                onDragOver={allowDrop}
                style={{
                    minHeight: '50px',
                }}
                onDrop={handleEmptyListDrop}
            >
                {cards.map((item:any) => (
                    <CardInformation
                        key={item.timeId}
                        cardDetail={item}
                        handleDragStart={handleDragStart}
                    />
                ))}
            </div>
            {!ToggleAddCard ? (
                <Button
                    id="add-card-button"
                    icon={<PlusOutlined />}
                    type="text"
                    onClick={() => setToggleAddCard(true)}
                >
                    {L('Kanban.AddCardBtn')}
                </Button>
            ) : (
                <Form
                    style={{ marginTop: '8px' }}
                >
                    <Form.Item name="ListTitle">
                        <TextArea
                            placeholder={L('Kanban.InputPlaceholder.Cardtitle')}
                            autoSize={{ minRows: 2, maxRows: 3 }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Space size="small">
                            <Button type="primary" htmlType="submit">
                                {L('Kanban.AddCardBtn')}
                            </Button>
                            <Button onClick={() => setToggleAddCard(false)}>
                                {L('Kanban.CancelBtn')}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            )}
        </Card>

    );
};

export default CardsList;
