import {
    Typography,
    Breadcrumb,
    Input,
    Button,
    Space,
    Table,
    Modal,
    Upload,
    Card,
    Popconfirm,
    Row,
    Col,
} from 'antd';
import {
    ApartmentOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadFile } from 'antd/lib/upload/interface';
import { createStructuredSelector } from 'reselect';
import { DepartmentsData } from './dtos/departmentsData';
import { L } from '../../lib/abpUtility';
import './index.less';
import {
    deleteStart,
    exportStart,
    getListStart,
    toggleUploadModal,
    uploadStart,
} from './actions';
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors';
import reducer from './reducer';
import saga from './saga';
import {
    makeSelectDepartmentsList,
    makeSelectDownloadLoading,
    makeSelectLoading,
    makeSelectUpdateReload,
    makeSelectUploadLoading,
    makeSelectUploadModalVisible,
} from './selectors';

const { Title } = Typography;
const { Search } = Input;
const key = 'departments';

const stateSelector = createStructuredSelector<any, any>({
    departmentsList: makeSelectDepartmentsList(),
    loading: makeSelectLoading(),
    updateReload: makeSelectUpdateReload(),
    downloadLoading: makeSelectDownloadLoading(),
    uploadLoading: makeSelectUploadLoading(),
    uploadModalVisible: makeSelectUploadModalVisible(),
});

const Departments: React.FunctionComponent = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const [listFile, setListFile] = useState<UploadFile[]>([]);
    const [skipCount, setSkipCount] = useState<number>(1);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [keyword, setKeyword] = useState<string>('');

    const dispatch = useDispatch();
    const {
        departmentsList,
        loading,
        updateReload,
        downloadLoading,
        uploadLoading,
        uploadModalVisible,
    } = useSelector(stateSelector);

    const history = useHistory();
    const onSearch = (value: string) => {
        setKeyword(value);
        setSkipCount(1);
    };
    const handleOkModalUpload = () => {
        dispatch(uploadStart(listFile));
    };
    const handleCancelModalUpload = () => {
        dispatch(toggleUploadModal());
    };
    const openAddDepartmentPage = () => {
        history.push('/admin/departments/0');
    };
    const handleExport = () => {
        dispatch(exportStart());
    };

    useEffect(() => {
        dispatch(getListStart({ keyword, skipCount, maxResultCount }));
    }, [dispatch, skipCount, maxResultCount, keyword, updateReload]);

    const columns: ColumnsType<DepartmentsData> = [
        {
            title: L('Departments.DepartmentName'),
            dataIndex: 'departmentName',
            key: 'departmentName',
            render: (values: string) => <div>{values}</div>,
        },
        {
            title: L('Departments.Notes'),
            dataIndex: 'notes',
            key: 'notes',
            render: (values: string) => <div>{values}</div>,
        },
        {
            key: 'action',
            width: '10%',
            render: (_: any, record: DepartmentsData) => (
                <Space size="small">
                    <Link to={`/admin/departments/${record.id}`}>
                        <Button size="small" type={'link'} icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm
                        title={L('Departments.Title')}
                        onConfirm={() => dispatch(deleteStart(record.id))}
                    >
                        <Button
                            size="small"
                            type="text"
                            style={{ border: 'none', color: 'red' }}
                            icon={<DeleteOutlined />}
                            key={`${record.departmentName}-delete`}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <Row justify="space-between">
                <Title level={3}>{L('Departments.DepartmentsList')}</Title>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined />
                        <Link to="/">{L('Departments.Home')}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <ApartmentOutlined />
                        <span>{L('Departments.Departments')}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row justify="space-between">
                <Col span={8}>
                    <Search placeholder="Filter" onSearch={onSearch} enterButton="Search" />
                </Col>
                <Col className="btn">
                    <Button
                        icon={<CloudDownloadOutlined />}
                        onClick={handleExport}
                        loading={downloadLoading}
                    >
                        {L('Departments.Export')}
                    </Button>
                    <Button
                        onClick={() => {
                            setListFile([]);
                            dispatch(toggleUploadModal());
                        }}
                        icon={<CloudUploadOutlined />}
                    >
                        {L('Departments.Import')}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={openAddDepartmentPage}
                    >
                        {L('Departments.AddNew')}
                    </Button>
                </Col>
            </Row>
            <div className="table">
                <Table
                    size="middle"
                    rowKey={(record) => record.id.toString()}
                    columns={columns}
                    dataSource={departmentsList.items}
                    loading={loading}
                    pagination={{
                        pageSize: maxResultCount,
                        total: departmentsList.totalCount,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                        onChange(page) {
                            setSkipCount(page);
                        },
                        onShowSizeChange(_, size) {
                            setMaxResultCount(size);
                        },
                        current: skipCount,
                    }}
                />
            </div>
            <Modal
                title={L('Departments.Upload')}
                visible={uploadModalVisible}
                onOk={handleOkModalUpload}
                onCancel={handleCancelModalUpload}
                width={400}
                destroyOnClose
                maskClosable={false}
                okButtonProps={{ disabled: listFile.length === 0 }}
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
                    <Button>{L('Departments.SelectAFile')}</Button>
                </Upload>
            </Modal>
        </Card>
    );
};

export default Departments;
