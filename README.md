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
    - commit message 规则应符合 `<type>: <message>`
    - type 分类详见 `commitlint.config.js` 配置
- `main` 分支开启了保护分支，需要在 github 上提交 pull request 进行合并



🫡收到
