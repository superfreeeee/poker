import { useState } from 'react';
import { ALL_SETTING_STAGES, HandStage, SettingHandStage } from '../../../../../models/hand';

export const getNextStage = (stage: SettingHandStage) =>
  ALL_SETTING_STAGES[ALL_SETTING_STAGES.indexOf(stage) + 1] as Exclude<
    SettingHandStage,
    HandStage.Init
  >;

export const useHandStage = () => {
  const [stage, setStage] = useState<SettingHandStage>(HandStage.Init);

  const nextStage = () => {
    setStage(getNextStage(stage));
  };

  return { stage, nextStage };
};
