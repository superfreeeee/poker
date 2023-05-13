# poker

## Get Started

- 开发（本地运行）

```sh
pnpm install  # or `pnpm i`
pnpm start:pc
```

- 打包

```sh
pnpm build:pc
```

## 工程规范/配置

- 使用 webpack 打包项目
  - `start:xx` 为开发时命令
  - `build:xx` 为打包最终产物命令
- 使用 husky 配置 git-hooks
  - `pre-commit` 阶段配置使用 `lint-staged`
    - 配置在 `package.json/lint-staged` 下
    - 脚本使用 `eslint` 检查
    - 样式使用 `stylelint` 检查
    - 暂不启用 `--fix` 的自动修正或是 `prettier --fix` 的自动格式化
  - `commit-msg` 阶段配置 `commitlint` 检测
    - feat/
    - type 分类详见 `commitlint.config.js` 配置
- `main` 分支开启了保护分支，需要在 github 上提交 pull request 进行合并

## future

- buyin
- hand (1) HandCreate 重构：HandHelper 设计
- GameList (2) 牌局列表：Game 数据结构、列表页展示
- GameDetail (3) 牌局详情页
- backend

1. 需求理解 - Story（业务需求）
   1. 记录一场牌局的过程
2. 用例 - 完成目标一个动作
   1. 记录买入信息
   2. 记录手牌过程

- 用例文档
- 体系设计
- 详细设计
  - 流程图
    - buyin：
      1. 【起始】选人数
      2. 设定玩家名
      3. 输入买入手数
      4. re-buy => 3.
      5. 【结算】输入剩余筹码
      6. 生成盈亏表
  - 设计类图 class => entity(data)、control
  - 开发
- 代码
