import React, { useEffect } from 'react';
import { Card, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors';
import reducer from './reducer';
import saga from './saga';
import './index.less';
import { makeSelectDatas, makeSelectReloadF } from './selectors';
import ListCard from './components/ListCard';
import { getListMembers, mypageDrapCardStart, mypageGetCardStatusStart } from './actions';
import { CardList } from './dtos/cardList';
import PopupCardDetail from './components/PopupCardDetail';

declare const abp: any;

const key = 'mypage';
const stateSelector = createStructuredSelector<any, any>({
    reloadF: makeSelectReloadF(),
    datas: makeSelectDatas(),
});
const MyPage:React.FunctionComponent = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const { reloadF, datas } = useSelector(stateSelector);
    const id = abp.session.userId;

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, fromList: any) => {
        const list = datas.find((item:any) => item.id === fromList);
        const card = list.cards.find((item:any) => `${item.id}` === e.currentTarget.id);
        dispatch(mypageDrapCardStart({
            taskId: parseInt(e.currentTarget.id, 0),
            fromList,
            cardTitle: card.cardTitle,
        }));
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    useEffect(() => {
        dispatch(mypageGetCardStatusStart(id));
        dispatch(getListMembers({
            skipCount: 1,
            maxResultCount: 1000,
        }));
    }, [dispatch, id]);
    return (
        <>
            <Card>
                {reloadF ? '' : ''}
                <Col
                    style={{
                        overflowX: 'scroll',
                        display: 'flex',
                        minHeight: '80vh',
                        gap: '5px',
                    }}
                >
                    {datas?.map((item:CardList) => (
                        <Col span={6} key={item.id}>
                            <ListCard
                                cardList={item}
                                onDragStart={(e:any) => onDragStart(e, item.id)}
                                onDragOver={(e:any) => onDragOver(e)}
                            />
                        </Col>
                    ))}
                </Col>
            </Card>
            <PopupCardDetail />
        </>
    );
};
export default MyPage;
