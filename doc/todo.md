# TODO = Bugs + Feat

## Common (cross-page utils)

- [x] feat: 检查当前用户登录态，未登陆 / 登陆 ID 无效 => go Login page
  - [x] react-route-dom 记录跳转前路由，登陆后回到上次的路由
  - [x] "" => "/game/detail" => "/login" => "/game/detail" ("/game/detail")
- [ ] feat: 按设备记录 uuid -> clientId
- [ ] feat: 各列表页添加页面内 reload，刷新到最新列表数据
- [x] fix: race-condition 处理
- [x] 开发环境工具箱：Debug组件

## Login

- [x] bug: Switch User 时需要清理 localStorage 登录态
- [x] fix: validateAPI => getUser / getUserInfo
- [ ] bug: 区分请求失败 还是 (查出用户不存在 => 1001=用户不存在:"用户不存在，请重新登入", 1002=登陆态失效:"登入已过期，请重新登入")
- [ ] refact: 抽出公共 commonApiTransformer 方法
- [x] feat: 记录登录过用户（写在 localStorage） => 点击直接登入

## Home: GameList

- [x] feat: 分几个 Tab 页：GameList、Stattistics、Utils、Setting
- [ ] bug: 登出之后重新登陆 GameList 没有刷新
- [ ] feat: 按时间倒序
- [ ] feat: Setting 下支持管理 Player

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
- [x] 选完之后的 Generate => 改成 Save + 自动跳转到 HandDetail
- [x] 适配手机端 UI
  - [ ] Mobile 的 CardSelector 使用抽屉
  - [ ] addAction 后自动滚动到最下记录
- [x] potSize 不用输入框了 => do nothing at onChange
- [x] 出现过的牌不能再选
- [x] bug: hand create 关联接口
- [ ] feat: 修改记录
- [ ] feat: 回退一步
- [ ] feat: BB check
- [ ] feat: 用户 Input 简化，区分受控模式与非受控模式

## HandDetail

- [x] 基础信息展示
- [x] feat: 对接 handDetail 接口

## BuyIn

- [x] Playing 页面的下面操作区域修改
- [x] Detail 页面把 buyInData.id 加到 url
- [x] Detail 页面把 数据源与 create 页分开
- [x] currentBuyInData => createBuyInData => 把 Create 页与 Detail 页的状态管理区分开来
- [x] Detail 页面多展示每个人计算后的总买入 totalBuyIn
- [x] Settle 页面改变 UI（hands x amount = totalBuyIn; _rest_ - totalBuyIn = profit）
- [x] PlayResult、PlayResultView 抽成一个组件
- [x] Header 返回逻辑
  - [x] Prepare => Home
  - [x] Playing => check(Modal) => Prepare
  - [x] Settle => Playing
  - [x] Detail => Home
- [x] fix: 一手金额 > 0
- [x] fix: Playing 的 UI
- [x] fix: Playing 的按钮名称可以简化一点
- [x] fix: History 下文案：上一步、下一步、取消、确认，进入按钮 icon
- [x] feat: 宽度 400px 下 UI 正常
- [x] fix: 换行
- [x] Final Result(BuyInView) => GameDetail
  - [x] Post 请求更新到服务端
  - [x] fetch 要求 getGameDetail 接口重新请求
- [ ] 删除 BuyInData 功能（弹出二次确认）

- 体验优化

- [ ] 列出优化不良的点，尝试提出解决方案
  - [] fix: button 高度不够（包括控制页面跳转的按钮和操作 hands 的按钮）
    - 调高高度
  - [] bug: button 不居中（控制页面跳转的按钮）
    - 调整布局
  - [] 输入框太窄, 字体太小
    - 调高输入框，字体调大
  - [] 输入时自动放大，但是取消输入并不会自动放缩
    - 测试一下 判断是否是浏览器自身原因
  - [] bug: settle 页面的控制按钮排布间距不等、显示结果和按钮的排列不合理
    - 重新调整布局

# Backend API

- [x] 增加 buyIn data 接口
  - POST /api/buyin
  - body: { gameId, buyInData: BuyInData }
  - response: { code: 200, data: null }
- [x] 查询用户状态 API
  - GET /api/user/{userId}
  - response: { code: 200, data: User | null }
- [x] refact: 检查是否已有 buyin data 存在
  - [x] POST /api/buyin 接口
- [x] feat: 更新 BuyInData 接口
  - [x] PUT /api/buyin
- [x] refact: 查询用户接口参数从路由换成查询参数
  - [x] GET /api/user/{userId} => /api/user?uid=xxx
- [x] feat: 新增 admin 请求域，区分管理员与普通用户
  - [x] GET /api/admin/users 查询所有用户列表
- [x] refact: 查询游戏接口 改成查询参数
  - GET /api/game => /api/game/list
  - GET /api/game/{gameId} => /api/game?id=xxx
- [x] refact: 查询手牌接口 改成查询参数
  - GET /api/hand/{handId} => /api/hand?id=xxx
- [x] feat: 添加手牌接口
  - POST /api/hand
  - body: HandRecord
- [ ] feat: 查询登陆过用户接口
  - GET /api/user/recent?uuid=xxx
  - refact: 登陆接口新增 uuid 字段，记录设备与用户映射关系
- [ ] feat: 删除 BuyInData 接口
  - DELETE /api/buyin
- [ ] feat: 新增玩家接口
  - POST /api/player
  - body: { uid, player }
- [ ] feat: 查询玩家接口
  - GET /api/player?uid=xxx
- [ ] feat: 利用 ExceptionHandler 机制处理通用 error
- [ ] refact: 返回对象从 ResponseVO 迁移到原始 ResponseEntity 上
- [ ] feat: 支持 uid 间数据关联
