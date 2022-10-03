import { EllipsisOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Row,
    Typography,
} from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mypageDrapCardEnd } from '../actions';
import { makeSelectDatas, makeSelectDragInfo } from '../selectors';
import './listcard.less';
import { L } from '../../../lib/abpUtility';
import TaskCard from './TaskCard';
import { CardList } from '../dtos/cardList';
import { CardStatusDto } from '../dtos/CardStatusDto';

export interface IListCardProps {
    cardList: CardList,
    onDragStart: (e: any) => void,
    onDragOver: (e: any) => void,
}

const stateSelector = createStructuredSelector<any, any>({
    datas: makeSelectDatas(),
    dragInfo: makeSelectDragInfo(),
});
const ListCard = ({ cardList, onDragStart, onDragOver }: IListCardProps) => {
    const { id, cardStatusTitle, cards } = cardList;
    const { datas, dragInfo } = useSelector(stateSelector);
    const total = cards ? cards.length : 0;
    const dispatch = useDispatch();
    const dropList = (e: React.DragEvent<HTMLDivElement>) => {
        const targetIndex = datas.findIndex((item:CardStatusDto) => `${item.id}` === e.currentTarget.id);
        if (datas[targetIndex].cards.length === 0) {
            dispatch(mypageDrapCardEnd({
                id: dragInfo.taskId,
                cardStatusId: parseInt(e.currentTarget.id, 0),
                cardTitle: dragInfo.cardTitle,
            }));
        }
    };

    return (
        <Col className="list" style={{ minHeight: 700 }}>
            <Row justify="space-between">
                <Col span={6}>
                    <Typography.Title
                        level={5}
                        className="title"
                    >{cardStatusTitle}
                    </Typography.Title>
                    <p style={{ color: '#7C7C7C' }}>{total} {L('MyPage.Cards')}</p>
                </Col>
                <Col>
                    <Button
                        style={{
                            border: 'none',
                            background: 'none',
                            boxShadow: 'none',
                            paddingLeft: 10,
                        }}
                        icon={<EllipsisOutlined />}
                    />
                </Col>
            </Row>
            <Col id={`${id}`} onDragOver={onDragOver} style={{ minHeight: 90 }} onDrop={dropList}>
                {cards?.map((item:any) => (
                    <TaskCard
                        key={item.id}
                        cardStatusId={id}
                        cardDetail={item}
                        onDragStart={onDragStart}
                    />
                ))}
            </Col>
        </Col>
    );
};

export default ListCard;
