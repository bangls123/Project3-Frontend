import {
    ApartmentOutlined,
    HomeOutlined,
    RollbackOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import {
    Card,
    Row,
    Col,
    Breadcrumb,
    Form,
    Input,
    Button,
    Space,
    Typography,
} from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { L } from '../../../lib/abpUtility';
import { useInjectReducer, useInjectSaga } from '../../../redux/reduxInjectors';
import {
    createNewDepartmentStart,
    getDepartmentDetailStart,
    resetUpdateCompletedStatus,
    updateDepartmentStart,
} from '../actions';
import { ParamType } from '../dtos/paramType';
import '../index.less';
import { makeSelectDepartmentDetail, makeSelectUpdateCompleted, makeSelectUpdateLoading } from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import { CreateDepartmentDto } from '../dtos/createDepartmentDto';

const { TextArea } = Input;
const { Title } = Typography;

const key = 'departments';

const stateSelector = createStructuredSelector<any, any>({
    departmentDetail: makeSelectDepartmentDetail(),
    updateLoading: makeSelectUpdateLoading(),
    updateCompleted: makeSelectUpdateCompleted(),
});

const DepartmentDetail = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();
    const { departmentId } = useParams<ParamType>();
    const { departmentDetail, updateLoading, updateCompleted } = useSelector(stateSelector);

    useEffect(() => {
        if (departmentId !== '0') {
            dispatch(getDepartmentDetailStart(departmentId));
        }
    }, [departmentId, dispatch]);

    const backToDepartmentsPage = () => {
        history.push('/admin/departments');
    };
    const handleSubmitForm = (values:CreateDepartmentDto) => {
        if (departmentId === '0') {
            dispatch(createNewDepartmentStart(values));
        } else {
            dispatch(updateDepartmentStart({ id: Number(departmentId), ...values }));
        }
    };

    useEffect(() => {
        if (departmentId !== '0') {
            form.setFieldsValue(departmentDetail);
        } else {
            form.resetFields();
        }
    }, [departmentId, departmentDetail, form]);

    useEffect(() => {
        if (updateCompleted === true) {
            dispatch(resetUpdateCompletedStatus());
            history.push('/admin/departments');
        }
    }, [history, dispatch, updateCompleted]);

    return (
        <Card>
            <Row justify="space-between">
                <Col>
                    <Title level={3}>{L('Departments.Detail.Header')}</Title>
                </Col>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <HomeOutlined />
                            <Link to="/">
                                {L('Departments.Detail.bcHome')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <ApartmentOutlined />
                            <Link to="/admin/departments">
                                {L('Departments.Detail.bcDepartment')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {departmentId === '0' ? L('Departments.Detail.AddNew') : L('Departments.Detail.Update')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
                <Col span={10}>
                    <Form labelCol={{ span: 8 }} form={form} onFinish={handleSubmitForm}>
                        <Form.Item
                            name="departmentName"
                            label={L('Departments.Detail.DepartmentName')}
                            key="form-department-name"
                            rules={[{
                                required: true,
                                message: L('Departments.Detail.ThisFieldIsRequired'),
                            }]}
                        >
                            <Input placeholder={L('Departments.Detail.DepartmentName')} />
                        </Form.Item>
                        <Form.Item name="notes" label={L('Departments.Detail.Notes')} key="form-department-notes">
                            <TextArea placeholder={L('Departments.Detail.Notes')} rows={3} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8 }}>
                            <Space size="small">
                                <Button key="back-button" onClick={backToDepartmentsPage} icon={<RollbackOutlined />}>
                                    {L('Departments.Detail.BackBtn')}
                                </Button>
                                <Button
                                    type="primary"
                                    key="submit"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={updateLoading}
                                >
                                    {L('Departments.Detail.SaveBtn')}
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default DepartmentDetail;
