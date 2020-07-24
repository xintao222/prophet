import React, { useState, FC } from 'react';
import { Button, Drawer } from 'antd';

export interface ShowDrawerButtonProps {
    children?: any;
    label?: string;
    drawer?: any;
    button?: any;
}

const ShowWithDrawerButton: FC<ShowDrawerButtonProps> = ({
    children,
    label,
    drawer,
    button,
}) => {
    const [visible, setVisible] = useState(false);

    const onClose = () => setVisible(false);
    const onShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type="link" onClick={onShow} {...button}>
                {label}
            </Button>
            <Drawer visible={visible} onClose={onClose} {...drawer}>
                {React.cloneElement(children, {
                    onOk: onClose,
                    onCancel: onClose,
                })}
            </Drawer>
        </React.Fragment>
    );
};

ShowWithDrawerButton.defaultProps = {
    label: '查看',
};

export default ShowWithDrawerButton;
