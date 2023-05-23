export type ResetSetting = (props?: {
  onOk?: VoidFunction;
  onCancel?: VoidFunction;
}) => Promise<boolean>;
