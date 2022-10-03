import * as React from 'react';

import {
    Breadcrumb,
    Button,
    Col,
    Form,
    Input,
    Row,
} from 'antd';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import { L } from '../../../lib/abpUtility';
import {
    makeSelectDetailFormOpen,
    makeSelectContactId,
    makeSelectContactDetail,
    makeSelectSaveLoading,
} from '../selectors';
import {
    toggleDetailForm,
    updateContactStart,
    createContactStart,
} from '../actions';

const stateSelector = createStructuredSelector<any, any>({
    detailFormOpen: makeSelectDetailFormOpen(),
    contactId: makeSelectContactId(),
    contactDetail: makeSelectContactDetail(),
    saveLoading: makeSelectSaveLoading(),
});
const ContactDetail: React.FunctionComponent = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {
        detailFormOpen,
        contactId,
        contactDetail,
        saveLoading,
    } = useSelector(stateSelector);

    useEffect(() => {
        if (detailFormOpen && contactId === 0) {
            form.resetFields();
        }
    }, [detailFormOpen, contactId, form]);

    const handleSubmit = async (values: any) => {
        const body = { ...values };
        if (contactId !== 0) {
            body.id = contactId;
            dispatch(updateContactStart(body));
        } else {
            dispatch(createContactStart(body));
        }
    };

    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
    };
    return (
        <Form
            onFinish={handleSubmit}
            {...layout}
            form={form}
            initialValues={{ ...contactDetail }}
        >
            <Row>
                <Col sm={{ span: 12, offset: 0 }}>
                    <h2>{contactId === 0 ? L('ContactScreen.Detail.AddNewTitle') : L('ContactScreen.Detail.EditTitle')}</h2>
                </Col>
                <Col sm={{ span: 12, offset: 0 }} style={{ textAlign: 'right' }}>
                    <Breadcrumb separator="/" className="app-breadcrumb">
                        <Breadcrumb.Item>
                            <a href="/admin/dashboard">{L('Menu.Dashboard')}</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/admin/contact">{L('Menu.Contact')}</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{contactId === 0 ? L('ContactScreen.Detail.AddNewBreadcrumb') : L('ContactScreen.Detail.EditBreadcrumb')}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item name="organizationId" label={L('ContactScreen.Detail.OrganizationId')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.OrganizationId')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="lastName" label={L('ContactScreen.Detail.LastName')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.LastName')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="firstName" label={L('ContactScreen.Detail.FirstName')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.FirstName')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="middleName" label={L('ContactScreen.Detail.MiddleName')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.MiddleName')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="loginName" label={L('ContactScreen.Detail.LoginName')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.LoginName')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="loginPassword" label={L('ContactScreen.Detail.LoginPassword')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.LoginPassword')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="email" label={L('ContactScreen.Detail.Email')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.Email')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="phone" label={L('ContactScreen.Detail.Phone')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.Phone')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="phoneSecurity" label={L('ContactScreen.Detail.PhoneSecurity')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.PhoneSecurity')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="tittle" label={L('ContactScreen.Detail.Tittle')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.Tittle')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="description" label={L('ContactScreen.Detail.Description')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.Description')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="createdDate" label={L('ContactScreen.Detail.CreatedDate')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.CreatedDate')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="changeBy" label={L('ContactScreen.Detail.ChangeBy')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.ChangeBy')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="changeDate" label={L('ContactScreen.Detail.ChangeDate')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.ChangeDate')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="isActive" label={L('ContactScreen.Detail.IsActive')}>
                        <Input
                            placeholder={L('ContactScreen.Detail.IsActive')}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>

            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => dispatch(toggleDetailForm(0))}>
                        {L('Common.Back')}
                    </Button>
                    &nbsp;
                    <Button type="primary" htmlType="submit" loading={saveLoading} icon={<SaveOutlined />}>
                        {L('Common.Save')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ContactDetail;
