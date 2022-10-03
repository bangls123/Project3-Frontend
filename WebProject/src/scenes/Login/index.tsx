import * as React from 'react';

import {
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    Row,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

import { L } from '../../lib/abpUtility';
import rules from './index.validation';
import './index.less';
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCompleted, makeSelectLoading } from './selectors';
import { requestLoginStart } from './actions';

declare const abp: any;
const FormItem = Form.Item;
const key = 'login';
const stateSelector = createStructuredSelector<any, any>({
    loading: makeSelectLoading(),
    completed: makeSelectCompleted(),
});
const Login: React.FunctionComponent = () => {
    useInjectReducer(key, reducer);
    useInjectSaga(key, saga);
    const dispatch = useDispatch();
    const { loading, completed } = useSelector(stateSelector);

    const handleSubmit = async (values: any) => {
        dispatch(requestLoginStart(values));
    };

    if (completed) {
        window.location.href = '/admin';
    }

    return (
        <Form className="" onFinish={handleSubmit}>
            <Row style={{ marginTop: 10 }}>
                <Col span={8} offset={8}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <h3>{L('LoginScreen.WellcomeMessage')}</h3>
                        </div>
                        <FormItem name="username" rules={rules.userNameOrEmailAddress}>
                            <Input
                                placeholder={L('LoginScreen.UserName')}
                                autoComplete="new-password"
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                size="large"
                            />
                        </FormItem>

                        <FormItem name="password" rules={rules.password}>
                            <Input.Password
                                placeholder={L('LoginScreen.Password')}
                                autoComplete="new-password"
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                size="large"
                            />
                        </FormItem>
                        <Row style={{ margin: '0px 0px 10px 15px ' }}>
                            <Col span={12} offset={0}>
                                <Checkbox style={{ paddingRight: 8 }} />
                                {L('LoginScreen.RememberMe')}
                            </Col>

                            <Col span={8} offset={4}>
                                <Button
                                    loading={loading}
                                    style={{ backgroundColor: '#f5222d', color: 'white' }}
                                    htmlType="submit"
                                    danger
                                    block
                                >
                                    {L('LoginScreen.LogIn')}
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default Login;
