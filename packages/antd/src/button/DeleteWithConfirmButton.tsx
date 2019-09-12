import React from 'react';
import { useDeleteController } from 'prophet-core';
import { Popconfirm, message } from 'antd';
import { Link } from '../Link';

export const DeleteWithConfirmButton = props => {
    const { label, disabled, className, style, update, record } = props;

    const onConfirm = () =>
        update(record.id, record, {
            onSuccess() {
                message.info('删除成功');
            },
            onFailure(error) {
                message.error(error.message);
            },
            refresh: true,
        });

    return (
        <Popconfirm
            title="你确定要删除吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={onConfirm}
        >
            <Link
                to=""
                type="link"
                disabled={disabled}
                className={className}
                style={style}
            >
                {label}
            </Link>
        </Popconfirm>
    );
};

const DeleteWithButton = props => (
    <DeleteWithConfirmButton {...props} {...useDeleteController(props)} />
);

export default DeleteWithButton;
