import {
    call,
    put,
    race,
    takeLatest,
} from 'redux-saga/effects';
import { L } from '../../lib/abpUtility';
import { showSuccessNotification } from '../../redux/global/actions';
import {
    addCardLabelError,
    addCardLabelSuccess,
    addCardMemberError,
    addCardMemberSuccess,
    addNewLabelError,
    addNewLabelSuccess,
    deleteCardLabelError,
    deleteCardLabelSuccess,
    deleteCardMemberError,
    deleteCardMemberSuccess,
    deleteCommentError,
    deleteCommentSuccess,
    editCommentSuccess,
    getListMembersError,
    getListMembersSuccess,
    moveCardError,
    moveCardSuccess,
    mypageAddCommentsSuccess,
    mypageEditListCardError,
    mypageEditListCardSuccess,
    mypageGetCardError,
    mypageGetCardLabelError,
    mypageGetCardLabelSuccess,
    mypageGetCardMemberError,
    mypageGetCardMemberSuccess,
    mypageGetCardStatusError,
    mypageGetCardStatusSuccess,
    mypageGetCardSuccess,
    mypageGetLabelError,
    mypageGetLabelSuccess,
} from './actions';
import ActionTypes from './constants';
import MyPageServices from './services';

function* getCardStatusDatas(input: any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.getCardStatus, input.payload),
        });
        if (output) {
            yield put(mypageGetCardStatusSuccess(output));
        } else {
            yield put(mypageGetCardStatusError());
        }
    } catch (error) {
        yield put(mypageGetCardStatusError());
    }
}

function* updateCard(input: any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.update, input.payload),
        });
        if (output) {
            yield put(mypageEditListCardSuccess(output));
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.DataUpdated'),
            }));
        } else {
            yield put(mypageEditListCardError());
        }
    } catch (error) {
        yield put(mypageEditListCardError());
    }
}

function* getCardDatas(input: any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.getCard, input.payload),
        });
        if (output) {
            yield put(mypageGetCardSuccess(output));
        } else {
            yield put(mypageGetCardError());
        }
    } catch (error) {
        yield put(mypageGetCardError());
    }
}

function* createComments(input: any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.createComments, input.payload),
        });
        if (output) {
            yield put(mypageAddCommentsSuccess(output));
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.CreateSuccess'),
            }));
        } else {
            yield put(mypageEditListCardError());
        }
    } catch (error) {
        yield put(mypageEditListCardError());
    }
}

function* getCardMember(input: any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.getCardMember, input.payload),
        });
        if (output) {
            yield put(mypageGetCardMemberSuccess(output));
        } else {
            yield put(mypageGetCardMemberError());
        }
    } catch (error) {
        yield put(mypageGetCardMemberError());
    }
}

function* getCardLabel(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.getCardLabel, input.payload),
        });
        if (output) {
            yield put(mypageGetCardLabelSuccess(output));
        } else {
            yield put(mypageGetCardLabelError());
        }
    } catch (error) {
        yield put(mypageGetCardLabelError());
    }
}

function* getCardLabels(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.getCardLabels, input.payload),
        });
        if (output) {
            yield put(mypageGetLabelSuccess(output));
        } else {
            yield put(mypageGetLabelError());
        }
    } catch (error) {
        yield put(mypageGetLabelError());
    }
}

function* addCardLabels(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.addCardLabels, input.payload),
        });
        if (output) {
            yield put(addCardLabelSuccess(output));
        } else {
            yield put(addCardLabelError());
        }
    } catch (error) {
        yield put(addCardLabelError());
    }
}

function* deleteCardLabels(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.deleteCardLabels, input.payload),
        });
        if (output) {
            yield put(deleteCardLabelSuccess(output));
        } else {
            yield put(deleteCardLabelError());
        }
    } catch (error) {
        yield put(deleteCardLabelError());
    }
}

function* addNewLabels(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.addNewLabels, input.payload),
        });
        if (output) {
            yield put(addNewLabelSuccess(output));
        } else {
            yield put(addNewLabelError());
        }
    } catch (error) {
        yield put(addNewLabelError());
    }
}

function* updateCardComment(input: any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.editComment, input.payload),
        });
        if (output) {
            yield put(editCommentSuccess(output));
            yield put(showSuccessNotification({
                message: L('Common.Success'),
                description: L('Common.DataUpdated'),
            }));
        } else {
            yield put(mypageEditListCardError());
        }
    } catch (error) {
        yield put(mypageEditListCardError());
    }
}

function* deleteCardComment(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.deleteComment, input.payload),
        });
        if (output) {
            yield put(deleteCommentSuccess(output));
        } else {
            yield put(deleteCommentError());
        }
    } catch (error) {
        yield put(deleteCommentError());
    }
}

function* addCardMembers(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.addCardMembers, input.payload),
        });
        if (output) {
            yield put(addCardMemberSuccess(output));
        } else {
            yield put(addCardMemberError());
        }
    } catch (error) {
        yield put(addCardMemberError());
    }
}

function* getCardMembers(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.getListMember, input.payload),
        });
        if (output) {
            yield put(getListMembersSuccess(output));
        } else {
            yield put(getListMembersError());
        }
    } catch (error) {
        yield put(getListMembersError());
    }
}

function* deleteCardMember(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.deleteCardMember, input.payload),
        });
        if (output) {
            yield put(deleteCardMemberSuccess(output));
        } else {
            yield put(deleteCardMemberError());
        }
    } catch (error) {
        yield put(deleteCardMemberError());
    }
}

function* moveCard(input:any) {
    try {
        const { output } = yield race({
            output: call(MyPageServices.moveCard, input.payload),
        });
        if (output) {
            yield put(moveCardSuccess(output));
        } else {
            yield put(moveCardError());
        }
    } catch (error) {
        yield put(moveCardError());
    }
}

export default function* watchMypageScreenAction() {
    yield takeLatest(
        ActionTypes.MYPAGE_CARDSTATUS_START,
        getCardStatusDatas,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_PUT_CARD_START,
        updateCard,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_GET_CARD_START,
        getCardDatas,
    );
    yield takeLatest(
        ActionTypes.MY_PAGE_ADD_COMMENTS_START,
        createComments,
    );
    yield takeLatest(
        ActionTypes.MY_PAGE_GET_CARDMEMBER_START,
        getCardMember,
    );
    yield takeLatest(
        ActionTypes.MY_PAGE_GET_LABEL_START,
        getCardLabels,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_ADD_CARD_LABEL_START,
        addCardLabels,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_DELETE_CARD_LABEL_START,
        deleteCardLabels,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_ADD_NEW_LABEL_START,
        addNewLabels,
    );
    yield takeLatest(
        ActionTypes.MY_PAGE_GET_CARDLABEL_START,
        getCardLabel,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_EDIT_COMMENT_START,
        updateCardComment,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_DELETE_COMMENT_START,
        deleteCardComment,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_ADD_CARD_MEMBER_START,
        addCardMembers,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_GET_LIST_MEMBERS_START,
        getCardMembers,
    );
    yield takeLatest(
        ActionTypes.MYPAGE_DELETE_CARD_MEMBER_START,
        deleteCardMember,
    );
    yield takeLatest(
        ActionTypes.MY_PAGE_DRAP_CARD_END,
        moveCard,
    );
}
