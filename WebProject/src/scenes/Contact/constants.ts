enum ActionTypes {
    CHANGE_OPTION_SEARCH = '[Contact] Change option search',

    GET_CONTACTS_START = '[Contact] Get contacts start',
    GET_CONTACTS_SUCCESS = '[Contact] Get contacts success',
    GET_CONTACTS_ERROR = '[Contact] Get contacts error',

    TOGGLE_DETAIL_FORM = '[Contact] Toggle detail form',
    GET_CONTACT_DETAIL_START = '[Contact] Get contact detail start',
    GET_CONTACT_DETAIL_SUCCESS = '[Contact] Get contact detail success',
    GET_CONTACT_DETAIL_ERROR = '[Contact] Get contact detail error',

    DELETE_CONTACT_START = '[Contact] Delete contact start',
    DELETE_CONTACT_SUCCESS = '[Contact] Delete contact success',
    DELETE_CONTACT_ERROR = '[Contact] Delete contact error',

    UPDATE_CONTACT_START = '[Contact] Update contact start',
    UPDATE_CONTACT_SUCCESS = '[Contact] Update contact success',
    UPDATE_CONTACT_ERROR = '[Contact] Update contact error',

    CREATE_CONTACT_START = '[Contact] Create contact start',
    CREATE_CONTACT_SUCCESS = '[Contact] Create contact success',
    CREATE_CONTACT_ERROR = '[Contact] Create contact error',

    DOWNLOAD_CONTACTS_START = '[Contact] Download contacts start',
    DOWNLOAD_CONTACTS_SUCCESS = '[Contact] Download contacts success',
    DOWNLOAD_CONTACTS_ERROR = '[Contact] Download contacts error',

    TOGGLE_UPLOAD_MODAL = '[Contact] Toggle upload modal',
    UPLOAD_CONTACTS_START = '[Contact] Upload contacts start',
    UPLOAD_CONTACTS_SUCCESS = '[Contact] Upload contacts success',
    UPLOAD_CONTACTS_ERROR = '[Contact] Upload contacts error',
}

export default ActionTypes;
