import {
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Input,
    Modal,
    Popconfirm,
    Row,
    Space,
    Table,
    Tag,
    Typography,
    Upload,
} from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { L } from '../../lib/abpUtility';
import { EmployeeResult } from './dtos/employeeResult';
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors';
import {
    makeSelectDatas,
    makeSelectDownloadLoading,
    makeSelectKeyword,
    makeSelectLoading,
    makeSelectmaxResultCount,
    makeSelectReloadF,
    makeSelectSkipcount,
    makeSelectUploadLoading,
    makeSelectUploadModalOpen,
} from './selectors';
import {
    changeOptionSearch,
    deleteEmployeeStart,
    downloadEmploy,
    getEmployeesStart,
    toggleUploadModal,
    uploadEmployeeStart,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import './index.less';

const { Search } = Input;
const { Title } = Typography;
const key = 'employee';
const stateSelector = createStructuredSelector<any, any>({
    loading: makeSelectLoading(),
    downloadLoading: makeSelectDownloadLoading(),
    datas: makeSelectDatas(),
    reloadF: makeSelectReloadF(),
    uploadLoading: makeSelectUploadLoading(),
    uploadModalOpen: makeSelectUploadModalOpen(),
    keyword: makeSelectKeyword(),
    currentPage: makeSelectSkipcount(),
    maxResultCount: makeSelectmaxResultCount(),
});

const Employee: React.FunctionComponent = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const {
        loading,
        currentPage,
        maxResultCount,
        downloadLoading,
        datas,
        reloadF,
        uploadModalOpen,
        uploadLoading,
        keyword,
    } = useSelector(stateSelector);
    const [listFile, setListFile] = useState<UploadFile[]>([]);
    const history = useHistory();

    useEffect(() => {
        dispatch(getEmployeesStart({ keyword, skipCount: currentPage, maxResultCount }));
    }, [dispatch, keyword, maxResultCount, currentPage, reloadF]);

    const handleOkUpload = () => {
        dispatch(uploadEmployeeStart(listFile));
    };

    const handleCancelUpload = () => {
        dispatch(toggleUploadModal());
    };
    const handleExport = () => {
        dispatch(downloadEmploy());
    };

    const columns = [
        {
            title: L('Employee.Table.Name'),
            width: '20%',
            dataIndex: 'employeeName',
            key: 'employeeName',
        },
        {
            title: L('Employee.Table.Department'),
            width: '20%',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },
        {
            title: L('Employee.Table.Color'),
            width: '10%',
            dataIndex: 'color',
            key: 'color',
            render: (_: any, record: EmployeeResult) => (
                <Tag
                    color={record.color ? record.color : 'white'}
                    style={{ height: '15px', width: '30px', border: 'none' }}
                />
            ),
        },
        {
            title: L('Employee.Table.Notes'),
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            key: 'actions',
            width: '10%',
            render: (_: any, record: EmployeeResult) => (
                <Space size="small">
                    <Link to={`employee/${record.id}/edit`} key={`${record.employeeName}-edit`}>
                        <Button size="small" type={'link'} icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm title={L('Employee.Table.PopconfirmTitle')} onConfirm={() => dispatch(deleteEmployeeStart(record.id))}>
                        <Button
                            size="small"
                            type="text"
                            style={{ border: 'none', color: 'red' }}
                            key={`${record.employeeName}-delete`}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Card>
                <Row justify="space-between">
                    <Title level={3}>{L('Employee.Header')}</Title>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <HomeOutlined />
                            <Link to="/">{L('Employee.bcHome')}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <UserOutlined />
                            <span>{L('Employee.bcEmployees')}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
                <Row justify="space-between">
                    <Col span={8}>
                        <Search
                            placeholder="Filter"
                            enterButton="search"
                            onSearch={(value:string) => dispatch(changeOptionSearch({
                                keyword: value,
                                maxResultCount,
                                skipCount: 1,
                            }))}
                        />
                    </Col>
                    <Col className="function_clickable">
                        <Button icon={<CloudDownloadOutlined />} size="middle" onClick={() => handleExport()} loading={downloadLoading}>
                            {L('Employee.fcExport')}
                        </Button>
                        <Button icon={<CloudUploadOutlined />} onClick={() => { setListFile([]); dispatch(toggleUploadModal()); }}>
                            {L('Employee.fcImport')}
                        </Button>
                        <Button icon={<PlusCircleOutlined />} type="primary" onClick={() => history.push('employee/add')}>
                            {L('Employee.fcAddnew')}
                        </Button>
                    </Col>
                </Row>
                <Table
                    rowKey={(record) => record.id.toString()}
                    columns={columns}
                    size="middle"
                    style={{ marginTop: '30px' }}
                    pagination={{
                        pageSize: maxResultCount,
                        total: datas.totalCount,
                        current: currentPage,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50', '100'],
                    }}
                    loading={loading}
                    dataSource={datas.items}
                    onChange={(page:any) => dispatch(changeOptionSearch({
                        keyword,
                        maxResultCount: page.pageSize,
                        skipCount: page.current,
                    }))}
                />
            </Card>
            <Modal
                title={L('Employee.Modal.Title')}
                okText={L('Employee.Modal.OkText')}
                cancelText={L('Employee.Modal.CancelText')}
                width={400}
                visible={uploadModalOpen}
                onOk={handleOkUpload}
                onCancel={handleCancelUpload}
                okButtonProps={{ disabled: listFile.length === 0 }}
                maskClosable={false}
                confirmLoading={uploadLoading}
            >
                <Upload
                    accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    beforeUpload={(file: UploadFile) => {
                        setListFile([file]);
                        return false;
                    }}
                    fileList={listFile}
                    onRemove={() => setListFile([])}
                >
                    <Button>{L('Employee.Modal.SelectFile')}</Button>
                </Upload>
            </Modal>
        </div>
   );
};

export default Employee;
