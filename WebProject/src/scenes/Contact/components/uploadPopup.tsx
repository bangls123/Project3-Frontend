import * as React from 'react';

import { Button, Modal, Upload } from 'antd';
import { CheckOutlined, FileExcelOutlined, StopOutlined } from '@ant-design/icons';
import { L } from '../../../lib/abpUtility';

export interface IUploadPopupProps {
    visible: boolean;
    uploadProps: any;
    fileList: File[];
    uploadLoading: boolean;
    onClose: () => void;
    onOk: () => void;
}

const UploadPopup: React.FunctionComponent<IUploadPopupProps> = (props: IUploadPopupProps) => {
    const {
        visible,
        uploadProps,
        fileList,
        uploadLoading,
        onClose,
        onOk,
    } = props;

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            onOk={onOk}
            title={L('Common.UploadExcelData')}
            width={300}
            maskClosable={false}
            footer={[
                <Button key="back" onClick={onClose} icon={<StopOutlined />}>
                    {L('Common.Cancel')}
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={fileList.length === 0}
                    loading={uploadLoading}
                    onClick={onOk}
                    icon={<CheckOutlined />}
                    ghost
                >
                    {L('Common.OK')}
                </Button>,
            ]}
        >
            <Upload {...uploadProps} fileList={fileList} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                <Button icon={<FileExcelOutlined />}>{L('Common.SelectFile')}</Button>
            </Upload>
        </Modal>
    );
};

export default UploadPopup;
