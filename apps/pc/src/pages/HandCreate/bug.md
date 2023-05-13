# Bugfix

- [x] 玩家动作【UserAction】后自动跳下一个位置
- [x] 玩家 Fold 牌后变成 disabled 状态
- [x] Call 自动补齐成上次的 Bet size
- [x] 自动提示/计算 Pot size
- [x] Turn、River 只能选择一张牌
- [x] CardSelector 添加更多提示：可选张数透出、当前选中 cards 透出
- [ ] Showdown 阶段控制模块
- [ ] Pro-flop 阶段 + 上盲
- [ ] Allin 输入框 enabled
- [ ] Call 平应禁用 User Action 直到 stage 切换
- [ ] 上一步操作
- [ ] 选中某一项纪录进行修改

# Refact

- 设计 GameHelper 作为整局游戏的状态机
  - 流程图
  - 状态图
  - 类设计
