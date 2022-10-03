import * as React from 'react';

import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Input,
    Popconfirm,
    Row,
    Table,
} from 'antd';
import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors';
import { L } from '../../lib/abpUtility';
import {
    makeSelectCurrentPage,
    makeSelectDatas,
    makeSelectKeyword,
    makeSelectLoading,
    makeSelectMaxResultCount,
    makeSelectReloadF,
    makeSelectDownloadLoading,
    makeSelectUploadLoading,
    makeSelectUploadModalOpen,
    makeSelectDetailFormOpen,
    makeSelectDetailLoading,
    makeSelectContactId,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import './index.less';
import {
    changeOptionSearch,
    getContactsStart,
    deleteContactStart,
    downloadContactsStart,
    toggleUploadModal,
    uploadContactsStart,
    toggleDetailForm,
    getContactDetailStart,
} from './actions';
import { ContactDto } from './dtos/contactDto';
import UploadPopup from './components/uploadPopup';
import DetailForm from './components/detailForm';

const { Search } = Input;
const key = 'contact';
const stateSelector = createStructuredSelector<any, any>({
    loading: makeSelectLoading(),
    keyword: makeSelectKeyword(),
    currentPage: makeSelectCurrentPage(),
    maxResultCount: makeSelectMaxResultCount(),
    datas: makeSelectDatas(),
    reloadF: makeSelectReloadF(),
    downloadLoading: makeSelectDownloadLoading(),
    uploadLoading: makeSelectUploadLoading(),
    uploadModalOpen: makeSelectUploadModalOpen(),
    detailFormOpen: makeSelectDetailFormOpen(),
    detailLoading: makeSelectDetailLoading(),
    contactId: makeSelectContactId(),
});
const Contact: React.FunctionComponent = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const {
        loading,
        keyword,
        currentPage,
        maxResultCount,
        datas,
        reloadF,
        downloadLoading,
        uploadLoading,
        uploadModalOpen,
        detailFormOpen,
        detailLoading,
        contactId,
    } = useSelector(stateSelector);
    const [filesUpload, setFilesUpload] = useState<File[]>([]);

    useEffect(() => {
        dispatch(getContactsStart({
            keyword,
            skipCount: currentPage,
            maxResultCount,
        }));
    }, [keyword, currentPage, maxResultCount, reloadF, dispatch]);

    useEffect(() => {
        if (contactId !== 0) {
            dispatch(getContactDetailStart({ id: contactId }));
        }
    }, [contactId, dispatch]);

    const columns = [
        {
            title: L('ContactScreen.Table.ContactId'),
            dataIndex: 'id',
            key: 'id',
            render: (value: number) => <div>{value}</div>,
        },
        {
            title: L('ContactScreen.Table.OrganizationId'),
            dataIndex: 'organizationId',
            key: 'organizationId',
            render: (value: number) => <div>{value}</div>,
        },
        {
            title: L('ContactScreen.Table.LastName'),
            dataIndex: 'lastName',
            key: 'lastName',
            render: (value: string) => <div>{value}</div>,
        },
        {
            title: L('ContactScreen.Table.FirstName'),
            dataIndex: 'firstName',
            key: 'firstName',
            render: (value: string) => <div>{value}</div>,
        },
        {
            title: L('ContactScreen.Table.MiddleName'),
            dataIndex: 'middleName',
            key: 'middleName',
            render: (value: string) => <div>{value}</div>,
        },
        {
            title: L('ContactScreen.Table.LoginName'),
            dataIndex: 'loginName',
            key: 'loginName',
            render: (value: string) => <div>{value}</div>,
        },

        {
            title: '',
            render: (value: string, item: ContactDto) => (
                <div>
                    <Button type="text" icon={<EditOutlined />} onClick={() => dispatch(toggleDetailForm(item.id))} size="small" />
                    &nbsp;
                    <Popconfirm
                        title={L('PopupDelete.ConfirmMessage')}
                        onConfirm={() => dispatch(deleteContactStart({ id: item.id }))}
                        okText={L('PopupDelete.OK')}
                        cancelText={L('PopupDelete.Cancel')}
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const uploadProps = {
        onRemove: (file: File) => {
            setFilesUpload([]);
        },
        beforeUpload: (file: File) => {
            setFilesUpload([file]);
            return false;
        },
    };
    return (
        <>
            <Card hidden={detailFormOpen}>
                <Row>
                    <Col sm={{ span: 12, offset: 0 }}>
                        <h2>{L('ContactScreen.Title')}</h2>
                    </Col>
                    <Col sm={{ span: 12, offset: 0 }} style={{ textAlign: 'right' }}>
                        <Breadcrumb separator="/" className="app-breadcrumb">
                            <Breadcrumb.Item>
                                <a href="/admin/dashboard">{L('Menu.Dashboard')}</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{L('Menu.Contact')}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{ span: 5, offset: 0 }}>
                        <Search
                            placeholder={L('ContactScreen.Filter')}
                            onSearch={(value: string) => dispatch(changeOptionSearch({
                                keyword: value,
                                maxResultCount,
                                skipCount: 1,
                            }))}
                        />
                    </Col>
                    <Col sm={{ span: 19, offset: 0 }} style={{ textAlign: 'right' }}>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            size="middle"
                            onClick={() => dispatch(downloadContactsStart())}
                            loading={downloadLoading}
                            ghost
                        >
                            {L('Common.Export')}
                        </Button>
                        &nbsp;
                        <Button
                            type="primary"
                            icon={<UploadOutlined />}
                            size="middle"
                            onClick={() => {
                                dispatch(toggleUploadModal());
                                setFilesUpload([]);
                            }}
                            ghost
                        >
                            {L('Common.Import')}
                        </Button>
                        &nbsp;
                        <Button type="primary" icon={<PlusOutlined />} size="middle" onClick={() => dispatch(toggleDetailForm(0))}>
                            {L('Common.AddNew')}
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col sm={{ span: 24, offset: 0 }}>
                        <Table
                            rowKey={(record) => record.id.toString()}
                            size={'middle'}
                            bordered
                            columns={columns}
                            pagination={{
                                pageSize: maxResultCount,
                                total: datas.totalCount,
                                defaultCurrent: 1,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20', '50', '100'],
                            }}
                            loading={loading}
                            dataSource={datas.items}
                            onChange={(pagination: any) => dispatch(changeOptionSearch({
                                keyword,
                                maxResultCount: pagination.pageSize,
                                skipCount: pagination.current,
                            }))}
                        />
                    </Col>
                </Row>
                <UploadPopup
                    visible={uploadModalOpen}
                    uploadProps={uploadProps}
                    fileList={filesUpload}
                    uploadLoading={uploadLoading}
                    onClose={() => {
                        dispatch(toggleUploadModal());
                        setFilesUpload([]);
                    }}
                    onOk={() => dispatch(uploadContactsStart(filesUpload))}
                />
            </Card>
            <Card hidden={!detailFormOpen} loading={detailLoading}>
                <DetailForm />
            </Card>
        </>
    );
};

export default Contact;
