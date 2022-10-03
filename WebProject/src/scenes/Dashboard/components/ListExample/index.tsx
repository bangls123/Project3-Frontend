import * as React from 'react';

import { List } from 'antd';

import './index.less';

export interface ListItem {
    title: string;
    body: string | React.ReactNode;
}
export interface IListExampleProps {
    value: ListItem[];
    header?: string;
    footer?: string;
}
const ListExample: React.FunctionComponent<IListExampleProps> = (props: IListExampleProps) => {
    const { header, footer, value } = props;
    return (
        <List
            header={header}
            footer={footer}
            split={false}
            size="small"
            dataSource={value}
            renderItem={(item: any) => (
                <List.Item>
                    <List.Item.Meta title={item.title} />
                    {item.body}
                </List.Item>
            )}
        />
    );
};

export default ListExample;
