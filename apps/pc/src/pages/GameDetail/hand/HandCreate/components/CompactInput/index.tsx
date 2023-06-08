import { Button, Input, Space } from 'antd';
import React, { ComponentProps } from 'react';

interface ICompactInputProps<T extends string | number> extends ComponentProps<typeof Space> {
  placeholder?: string;
  disabled?: boolean;
  disabledInput?: boolean;
  disabledConfirm?: boolean;
  value: T;
  onValueChange: (input: string) => void;
  onOk: (value: T) => void;
  okText?: string;
}

const CompactInput = <T extends string | number>({
  style,
  placeholder,
  disabled = false,
  disabledInput = false,
  disabledConfirm = false,
  value,
  onValueChange,
  onOk,
  okText = 'Confirm',
}: ICompactInputProps<T>) => {
  return (
    <Space style={{ ...style }}>
      <Space.Compact size="large">
        <Input
          placeholder={placeholder}
          type="number"
          disabled={disabled || disabledInput}
          value={value === 0 ? '' : value}
          onChange={(e) => onValueChange(e.target.value)}
        />
        <Button type="primary" disabled={disabled || disabledConfirm} onClick={() => onOk(value)}>
          {okText}
        </Button>
      </Space.Compact>
    </Space>
  );
};

export default CompactInput;
