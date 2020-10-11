import React from 'react';
import Button from '@material-ui/core/Button';

const ActionButton = ({
    className,
    style,
    name,
    onClick,
}) => (
    <Button
        className={className}
        style={style}
        onClick={onClick}
    >
        {name}
    </Button>
);

export default ActionButton;