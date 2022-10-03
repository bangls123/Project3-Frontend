import {
    Avatar,
    Col,
    Tag,
} from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { mypageDrapCardEnd, mypageGetCardStart } from '../actions';
import {
    makeSelectColors,
    makeSelectDatas,
    makeSelectDragInfo,
} from '../selectors';
import { L } from '../../../lib/abpUtility';
import './taskCard.less';
import { CardMember } from '../dtos/cardMember';
import { CardLabels } from '../dtos/cardLabels';
import { CardDto } from '../dtos/cardDto';

interface ITaskCardProps {
    cardStatusId:number,
    cardDetail: CardDto,
    onDragStart: (e:any) => void
}

const stateSelector = createStructuredSelector<any, any>({
    colors: makeSelectColors(),
    datas: makeSelectDatas(),
    dragInfo: makeSelectDragInfo(),
});

const TaskCard = ({ cardDetail, cardStatusId, onDragStart } : ITaskCardProps) => {
    const {
        id,
        cardTitle,
        cardMembers,
        cardLabels,
    } = cardDetail;
    const { dragInfo } = useSelector(stateSelector);
    const dispatch = useDispatch();
    const showPopup = () => {
        dispatch(mypageGetCardStart(id));
    };

    const getDropCard = () => {
        dispatch(mypageDrapCardEnd({
            id: dragInfo.taskId,
            cardStatusId,
            cardTitle: dragInfo.cardTitle,
        }));
    };

    return (
        <>
            <Col
                id={`${id}`}
                onDragStart={onDragStart}
                draggable
                onClick={showPopup}
                className="task"
                onDrop={getDropCard}
                onKeyDown={showPopup}
                role="presentation"
            >
                <Col style={{ height: 50 }}>
                    {cardLabels && cardLabels?.map((item:CardLabels) => (
                        <Tag
                            key={item.labelId}
                            color={`${item.color}`}
                            style={{ width: 50, height: 15 }}
                        />
                    ))}
                    <p>{L('MyPage.#')}{id} {cardTitle}</p>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <Avatar.Group
                        maxCount={10}
                        maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                        }}
                    >
                        {cardMembers?.map((item:CardMember) => (
                            <Avatar
                                style={{ background: `${item.color}` }}
                                key={item.employeeId}
                                className="avt"
                            >
                                {item.employeeName.split(' ').reverse().join(' ').charAt(0)}
                            </Avatar>
                        ))}
                    </Avatar.Group>
                </Col>
            </Col>
        </>
      );
};

export default TaskCard;
