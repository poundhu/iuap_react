# Tinper-React 前端开发框架

> 基于`uba` + `react` + `tinper-bee` + `mirrorx` 搭建基本快速开发脚手架，包含相关示例系统以及参照组件等

## 1、框架介绍与快速上手

### 特性与说明

- 本脚手架依赖于前端集成开发工具[ uba ](https://github.com/iuap-design/tinper-uba)，项目生成的时候需要安装全局工具命令来使用，参与开发人员无需重复安装全局使用.

- 集成常规的使用插件等配置，可以满足常规开发需求，无需繁琐复杂的配置项，简单、干净、舒服.

- 依赖强大的集成开发工具 `uba` 内置 `数据模拟`、`代理请求`、`静态托管`、`开放配置`等功能.

- 方便开发人员在快速搭建`react`前端开发项目，无需学习复杂配置环境，拆箱即用.

### 安装与使用

```
$ git clone git@github.com:yonyou-iuap/iuap_pap_react.git
$ cd iuap_pap_react && npm i
$ npm run dev
```


### 技术栈说明

- `react`、`mirrorx`、`react-router v4`、`webpack`.
- `babel`、`ES7`、`Postcss`、`Less`、`Png\Jpg\Svg\Woff`.
- 框架中默认使用 tinper-bee 组件库，配套的文档请访问：bee.tinper.org

### 框架目录说明

```base
root
├── mock                          # 本地数据模拟
│   └── user
└── src                           # 项目源代码
    ├── components                # 公共提取复用组件
    │   └── Reference             # 演示使用参照组件
    ├── layout                    # 布局组件
    ├── modules                   # 业务模块
    │   └── bdm                   # 具体业务模块
    │       ├── components        # 业务级别复用组件
    │       │   └── User          # 演示组件
    │       ├── containers        # 容器类组件
    │       ├── models            # 数据模型
    │       └── services          # 数据请求服务
    ├── routes                    # 路由表
    ├── static                    # 资源
    │   ├── font
    │   └── images
    └── utils                     # 工具类

```

## 2、前后端协作开发

1. 基于业务约定默认的 API 接口文档
2. 可以选择采用本地 Mock JSON 和使用在线的 Mock 接口管理平台两种方式实现接口数据的模拟，实现并行开发。
3. 我们推荐使用 Mock 接口管理平台：https://mock.yonyoucloud.com/

## 3、发布与集成

发布到maven镜像仓库

```
$ gulp
```

发布到 NPM

```
$ npm publish
```