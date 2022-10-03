import { Avatar } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { kanbanDrapCardEnd, togglePopupCardDetail } from '../actions';
import { CardDetailDto } from '../dtos/cardDetailDto';
import {
    makeSelectCardDetailVisible,
    makeSelectDatas,
    makeSelectDragInfo,
} from '../selectors';
import './CardInformation.less';

interface IProps {
    cardDetail: CardDetailDto;
    handleDragStart: (e:any) => void;
}

const stateKanban = createStructuredSelector<any, any>({
    datas: makeSelectDatas(),
    dragInfo: makeSelectDragInfo(),
    cardDetailVisible: makeSelectCardDetailVisible(),
});

const CardInformation = ({ cardDetail, handleDragStart }:IProps) => {
    const { taskText, timeId, listNumber } = cardDetail;
    const {
        datas,
        dragInfo,
    } = useSelector(stateKanban);
    const dispatch = useDispatch();
    const showPopup = () => {
        dispatch(togglePopupCardDetail(cardDetail));
    };
    const handleGetDropPosition = () => {
        const startIndex = datas[dragInfo.fromList]
            .cards.findIndex((item:any) => `${item.timeId}` === dragInfo.taskId);
        const taskCard = datas[dragInfo.fromList].cards[startIndex];
        const index = datas[listNumber].cards.findIndex((item:any) => item.timeId === timeId);
        datas[dragInfo.fromList].cards.splice(startIndex, 1);
        datas[listNumber].cards.splice(index, 0, { ...taskCard, listNumber });
        dispatch(kanbanDrapCardEnd(datas));
    };

    return (
        <>
            <div
                id={`${timeId}`}
                className="card-information-container"
                style={{
                    backgroundColor: '#ffffff',
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '5px',
                    cursor: 'pointer',
                }}
                onClick={showPopup}
                onDragStart={handleDragStart}
                draggable
                onKeyDown={showPopup}
                onDrop={handleGetDropPosition}
                role="presentation"
            >
                <div
                    style={{
                        backgroundColor: 'green',
                        width: '30px',
                        height: '10px',
                        marginBottom: '5px',
                    }}
                />
                <p className="non-customise-text">#{timeId} {taskText}</p>
                <Avatar
                    style={{
                        alignSelf: 'flex-end',
                        marginTop: '10px',
                        color: '#000000',
                        backgroundColor: '#dbdbdb',
                    }}
                    size="small"
                >
                    H
                </Avatar>
            </div>
        </>
    );
};

export default CardInformation;
