import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export interface CreateButtonProps {
    basePath?: string;
    label?: string;
    type?: 'primary' | 'dashed' | 'danger' | 'link';
    ghost?: boolean;
    icon?: string;
    disabled?: boolean;
    shape?: 'circle' | 'round';
    size?: 'small' | 'large';
}

const CreateButton: FunctionComponent<CreateButtonProps> = props => {
    const { basePath, label, type, ghost, icon, disabled, shape, size } = props;
    const history = useHistory();

    const handleClick = () => history.push(`${basePath}/create`);

    return (
        <Button
            type={type}
            ghost={ghost}
            icon={icon}
            disabled={disabled}
            shape={shape}
            size={size}
            onClick={handleClick}
        >
            {label}
        </Button>
    );
};

CreateButton.defaultProps = {
    label: '添加',
    type: 'primary',
};

export default CreateButton;
