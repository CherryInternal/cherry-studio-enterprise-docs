# Cherry Studio 企业版 - 云应用一键部署

## 🚀 快速开始

Cherry Studio 企业版现已上线腾讯云应用市场，支持一键部署，无需复杂配置即可快速体验完整的企业级 AI 平台。

**腾讯云应用市场链接**：[https://app.cloud.tencent.com/detail/SPU_BHFHEJFDEE4965](https://app.cloud.tencent.com/detail/SPU_BHFHEJFDEE4965)

## 📋 部署流程

### 第一步：启动安装

1. 访问 [腾讯云 Cherry Studio 安装页面](https://app.cloud.tencent.com/detail/SPU_BHFHEJFDEE4965)
2. 完成腾讯云账户认证登录
3. 点击**安装**按钮，进行资源选购
4. 选择就近的服务器区域进行部署

![启动安装](../assets/images/cloudappinstall/17579023125922.webp)

### 第二步：配置部署参数

系统会自动检测您的网络环境，如果您已有合适的网络和安全组配置，可直接进入下一步。

![生成应用](../assets/images/cloudappinstall/17579059506041.webp)

### 第三步：等待创建完成

应用创建过程需要几分钟时间，请耐心等待。

![创建等待](../assets/images/cloudappinstall/17579075417655.webp)

### 第四步：获取访问入口

创建完成后，进入应用设置页面获取访问入口：

![应用设置入口](../assets/images/cloudappinstall/17579075847068.webp)

点击**后台管理页面入口（公网）**，即可直接访问 Cherry Studio 企业后台。

### 第五步：首次登录

使用应用设置页面提供的**Cherry Studio 企业后台管理账号**信息登录：

- 初始用户名：见应用设置页面
- 初始密码：见应用设置页面

![后台管理入口](../assets/images/cloudappinstall/17579076770749.webp)

### 第六步：修改默认密码

**强烈建议**首次登录后立即修改默认管理员密码：

![修改密码1](../assets/images/cloudappinstall/17579077250676.webp)

![修改密码2](../assets/images/cloudappinstall/17579077573416.webp)

![修改密码3](../assets/images/cloudappinstall/17579079312441.webp)

## ✅ 部署完成

至此，Cherry Studio 企业版已成功部署完成！您可以：

- 配置 AI 服务商和模型
- 创建用户和角色权限
- 上传知识库文档
- 开始使用 AI 助手功能

## 🔧 高级配置参考

如果在部署过程中遇到网络配置问题，或需要进行服务器管理，请参考以下说明：

### 网络配置说明

#### 新建私有网络设置

如果您没有合适的私有网络，可以参考以下步骤创建：

![新建私有网络设置1](../assets/images/cloudappinstall/17579046919582.webp)

![新建私有网络设置2](../assets/images/cloudappinstall/17579058693624.webp)

![新建私有网络设置3](../assets/images/cloudappinstall/17579058898409.webp)

#### 安全组配置说明

没有安全组时，可以参考以下设置：

- 安全组需要在您服务器所在区域的【安全/安全组】中配置
- 如果不熟悉网络配置，建议寻求网络工程师协助

新建过程：

![新建安全组过程](../assets/images/cloudappinstall/17579025304834.webp)

新建模板参考：

![新建模板参考](../assets/images/cloudappinstall/17579045676416.webp)

**重要**：需要额外开放以下端口，允许 0.0.0.0 访问：

- 36700 （API 服务端口）
- 36800 （管理后台端口）
- 32811 （系统管理端口）

利用模板创建后，进入修改页面进行端口配置：

![端口配置1](../assets/images/cloudappinstall/17579080497271.webp)

![端口配置2](../assets/images/cloudappinstall/17579080735339.webp)

![端口配置3](../assets/images/cloudappinstall/17579080886847.webp)

### 1Panel 服务器管理（可选）

系统还提供了 1Panel 面板用于数据库和服务器管理：

![1panel管理页面](../assets/images/cloudappinstall/17579081724093.webp)

1Panel 访问入口：

![1panel访问入口](../assets/images/cloudappinstall/17579081125820.webp)

**强烈建议**：修改 1Panel 的初始密码

![1panel密码修改](../assets/images/cloudappinstall/17579082746447.webp)

## ❓ 常见问题

### Q: 选择可用区时没有机器列表怎么办？

A: 可以咨询腾讯云客服，询问哪个可用区有机器资源。例如广州 6 区/7 区可能有机器，而 2 区可能没有。您可以在有可用机器的区域重新创建【私有网络】和【子网】。

### Q: 部署后无法访问怎么办？

A: 请检查以下几点：

1. 确保安全组已正确配置所需端口（36700、36800、32811）
2. 检查网络连接是否正常
3. 确认使用正确的访问地址和端口

### Q: 忘记管理员密码怎么办？

A: 可以通过 1Panel 面板重置，或联系技术支持协助恢复。

## 📞 技术支持

如需技术支持，请通过以下方式联系我们：

- 官网：[Cherry Studio](https://cherry-ai.com)
- 邮箱：support@cherry-ai.com
