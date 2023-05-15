# TODO = Bugs + Feat

## HandCreate page

- [x] 玩家动作【UserAction】后自动跳下一个位置
- [x] 玩家 Fold 牌后变成 disabled 状态
- [x] Call 自动补齐成上次的 Bet size
- [x] 自动提示/计算 Pot size
- [x] Turn、River 只能选择一张牌
- [x] CardSelector 添加更多提示：可选张数透出、当前选中 cards 透出
- [x] Pro-flop 阶段 + 上盲
- [x] Allin 输入框 enabled
- [x] Call 平应禁用 User Action 直到 stage 切换
- [x] Blinds：Input 盲注结构
- [x] Showdown：摊牌选择
- [ ] 修改记录
- [ ] 回退一步
- [ ] 出现过的牌不能再选
- [ ] 选完之后的 Generate => 改成 Save + 自动跳转到 HandDetail
- [x] 适配手机端 UI
  - [ ] Mobile 的 CardSelector 使用抽屉
  - [ ] addAction 后自动滚动到最下记录
- [x] potSize 不用输入框了 => do nothing at onChange

## HandRecordList

- [x] 加 create 入口
- [x] 列表 UI 加 gap
- [x] 适配手机端 UI

## HandDetail

- [ ] 基础信息展示
