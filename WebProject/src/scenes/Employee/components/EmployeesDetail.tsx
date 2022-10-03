import {
 HomeOutlined, RollbackOutlined, SaveOutlined, UserAddOutlined, UserOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Card,
    Row,
    Typography,
    Form,
    Input,
    Button,
    Select,
    Space,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useHistory, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { L } from '../../../lib/abpUtility';
import { useInjectReducer, useInjectSaga } from '../../../redux/reduxInjectors';
import {
    createEmployeeStart,
    getDepartmentStart,
    getDetailEmployeesStart,
    resetUpdateCompletedStatus,
    updateEmployeeStart,
} from '../actions';
import saga from '../saga';
import reducer from '../reducer';
import {
    makeSelectDepartmentDatas,
    makeSelectDetailEmployeeDatas,
    makeSelectDetailLoading,
    makeSelectDetailSaveLoading,
    makeSelectDetailUpdateCompleted,
    makeSelectloadingDepartment,
} from '../selectors';
import './EmployeesDetail.less';
import { DepartmentResult } from '../dtos/departmentResult';
import { ParamType } from '../dtos/ParamType';
import { CreateEmployee } from '../dtos/createEmployee';

const { Title } = Typography;
const { Option } = Select;
const key = 'employee';
const stateSelector = createStructuredSelector<any, any>({
    departmentDatas: makeSelectDepartmentDatas(),
    employeeDetail: makeSelectDetailEmployeeDatas(),
    saveLoading: makeSelectDetailSaveLoading(),
    updateCompleted: makeSelectDetailUpdateCompleted(),
    detaiLoading: makeSelectDetailLoading(),
    loadingDepartment: makeSelectloadingDepartment(),
});
const EmployeesDetail: React.FunctionComponent = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const {
        departmentDatas,
        employeeDetail,
        saveLoading,
        updateCompleted,
        detaiLoading,
        loadingDepartment,
    } = useSelector(stateSelector);
    const { id } = useParams<ParamType>();

    useEffect(() => {
        dispatch(getDepartmentStart({ keyword: '', skipCount: 1, maxResultCount: 100000 }));
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getDetailEmployeesStart(id));
        }
    }, [dispatch, id]);

    const handlerSubmit = (values: CreateEmployee) => {
        if (id) {
            dispatch(updateEmployeeStart({ id: Number(id), ...values }));
        } else {
            dispatch(createEmployeeStart(values));
        }
    };

    useEffect(() => {
        if (id) {
            form.setFieldsValue(employeeDetail);
        } else {
            form.resetFields();
        }
    }, [employeeDetail, form, id]);
    const backEmployeesPage = () => {
        history.push('/admin/employee');
    };

    useEffect(() => {
        if (updateCompleted === true) {
            dispatch(resetUpdateCompletedStatus());
            history.push('/admin/employee');
        }
    }, [dispatch, history, updateCompleted]);

    return (
        <Card loading={detaiLoading}>
            <Row justify="space-between">
                <Title level={3}>{L('Employee.EmployeeDetail.Header')}</Title>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined />
                        <Link to="/"><span>{L('Employee.bcHome')}</span></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <UserOutlined />
                        <Link to="/admin/employee"><span>{L('Employee.bcEmployees')}</span></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {id ? '' : <UserAddOutlined />}
                        <span>{id ? L('Employee.Update') : L('Employee.Add')}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Row>

            <Form
                name="basic"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 5 }}
                initialValues={{ remember: true }}
                onFinish={handlerSubmit}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label={L('Employee.EmployeeDetail.EmployeeName')}
                    name="employeeName"
                    rules={[
                        { required: true, message: `${L('Employee.EmployeeDetail.ValidateName')}` },
                    ]}
                    key="employeeName"
                >
                    <Input placeholder={L('Employee.EmployeeDetail.EmployeeName')} />
                </Form.Item>

                <Form.Item
                    label={L('Employee.EmployeeDetail.Department')}
                    name="departmentId"
                    rules={[
                        { required: true, message: `${L('Employee.EmployeeDetail.ValidateDeparments')}` },
                    ]}
                >
                    <Select placeholder="Departmnet Name" loading={loadingDepartment}>
                        {departmentDatas.items?.map((item:DepartmentResult) => (
                            <Option key={`${item.id}`} value={`${item.id}`}>{item.departmentName}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label={L('Employee.EmployeeDetail.Color')} name="color">
                    <Select placeholder="Color">
                        <Option value="red">Red</Option>
                        <Option value="green">Green</Option>
                        <Option value="blue">Blue</Option>
                        <Option value="gray">Gray</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={L('Employee.EmployeeDetail.UserName')}
                    name="username"
                    rules={[
                        { required: true, message: `${L('Employee.EmployeeDetail.ValidateUserName')}` },
                    ]}
                    key="username"
                >
                    <Input placeholder={L('Employee.EmployeeDetail.UserName')} autoComplete="new-username" />
                </Form.Item>

                <Form.Item
                    label={L('Employee.EmployeeDetail.Password')}
                    name="password"
                    rules={[
                        { required: !id, message: `${L('Employee.EmployeeDetail.ValidatePassword')}` },
                        { min: 8, message: `${L('Employee.EmployeeDetail.ValidatePasswordMin')}` },
                    ]}
                    key="password"
                    hasFeedback
                >
                    <Input.Password placeholder={L('Employee.EmployeeDetail.Password')} autoComplete="new-password" />
                </Form.Item>

                <Form.Item
                    label={L('Employee.EmployeeDetail.ConfirmPassword')}
                    name="confirmPassword"
                    key="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: !id, message: `${L('Employee.EmployeeDetail.ValidateConfirmPassword')}` },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve().then(() => {
                                        if (id && getFieldValue('password') !== value) {
                                           return Promise.reject(new Error(`${L('Employee.EmployeeDetail.ValidateConfirmPasswordMatch')}`));
                                        }
                                        return value;
                                    });
                                }
                                return Promise.reject(new Error(`${L('Employee.EmployeeDetail.ValidateConfirmPasswordMatch')}`));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder={L('Employee.EmployeeDetail.ConfirmPassword')} />
                </Form.Item>

                <Form.Item label={L('Employee.EmployeeDetail.Notes')} name="notes">
                    <TextArea rows={4} placeholder={L('Employee.EmployeeDetail.Notes')} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 3 }}>
                    <Space>
                        <Button onClick={() => backEmployeesPage()} icon={<RollbackOutlined />}>
                            {L('Employee.EmployeeDetail.Back')}
                        </Button>
                        <Button icon={<SaveOutlined />} type="primary" loading={saveLoading} htmlType="submit">{L('Employee.EmployeeDetail.Save')}</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
      );
};

export default EmployeesDetail;
