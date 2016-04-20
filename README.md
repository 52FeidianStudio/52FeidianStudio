# 52FeidianStudio.github.io

Feidian Studio Homepage

## 本仓库调制指南

Github Page服务是以Jekyll为基础的。Jekyll是基于Ruby的一套博客系统。因此clone到本地调试时，需要安装Ruby环境和Jekyll模块：

### Windows下安装环境

1. 安装 Ruby
2. 安装 DevKit
3. 安装 Jekyll

#### 安装 Ruby

1、前往[Ruby官网](http://rubyinstaller.org/downloads/)，在 “RubyInstallers” 部分，下载相应的安装包；

2、安装时注意：

- 尽量还是使用默认路径，避免一些奇怪的错误。另外路径中避免空格；
- 勾选 “Add Ruby executables to your PATH”，添加到环境变量；

3、在命令行中执行``ruby -v``，若出现版本号即安装成功；

#### 安装Devkit

DevKit 是一个帮助简化安装及使用拓展的开发库，Windows环境中不可少。

1、在[Ruby官网](http://rubyinstaller.org/downloads/)的DevKit部分，下载对应操作系统、对应Ruby版本的Devkit安装包。

2、运行安装包。完成后进入DevKit目录，执行

	ruby dk.rb init

编辑生成的``config.yml``文件：在最后添加一行：

	---
	- /your/absolute/path/to/ruby

然后在命令行中执行审查和安装：

	ruby dk.rb review
	ruby dk.rb install

#### 安装Jekyll

Jekyll是Ruby的一个模块，要通过Ruby的包管理器——gem进行安装。一般情况下，安装完以上后，gem已经自带了。

执行：

	gem install jekyll

即完成Jekyll的安装。

在安装jekyll时可能出现如下问题：

    ERROR:  While executing gem ... (Gem::RemoteFetcher::FetchError)
    Errno::ECONNRESET: An existing connection was forcibly closed by the remote host. - SSL_conn

解决办法:

    S:\> gem source -r https://rubygems.org/
    S:\> gem soruce -a http://ruby.taobao.org/
  
  问题：ERROR:  Could not find a valid gem 'jekyll' (>= 0) in any repository
  解决：https://github.com/juthilo/run-jekyll-on-windows/issues/34
    $ gem sources --remove https://rubygems.org/
    $ gem sources -a http://rubygems.org/
    $ gem install jekyll


**以上过程可能因系统、版本等因素出现异常。如果出现异常，请尝试自己查阅资料解决，并完善本文档。**

### Jekyll使用教程。

在你希望的目录中执行

	jekyll new yourblog

创建博客目录。当然本仓库不需要这一步了。进入目录，执行：

	jekyll server --watch
	// server 指启动服务
	// --watch指监听文件变化，自动应用；

就可以启动服务。根据打印的提示，你可以在``http://localhost:4000``访问到页面。

**关于Jekyll的具体配置和语法，待编辑...**

## css预处理工具-MCSS的使用

本站点的css部分使用了MCSS——出自网易前端牛人@leeluolee 之手的css预处理器。具体使用方式请移步：[leeluolee/mcss](https://github.com/leeluolee/mcss).

由于GFW的存在，适用于Sublime的语法高亮插件无法下载。因此我已经下载后放在本仓库``/public/mcss/MCSS.tmLanguage``。

安装方法：

打开Sublime，preferences > Browses apckages，新建MCSS目录，将上述的语法文件拷贝进去即可。

windows下推荐版本控制推荐使用sourceTree来代替命令行，图形界面使用起来很方便，适合新手更深入了解，可以很愉快的解决冲突。

## 沸点成员须读

### 发布博文或新闻教程

本站采用Jekyll搭建，发布文章时，在正文前须添加相关属性。

```
---
layout: post			    # 必须，部署样式，统一用post
title: This is title  # 必须，文章标题
author: your nickname	# 必须，无论原创或转载，填写你的姓名
category: blog				# 必须，文章类型，“news（新闻）”或“blog（博客）”
image: filename.jpg   # 在文章列表中显示的图片，请尽量添加。该图片或文章中出现的图片请放到/public/img/目录中
from: http://example.com/article.html 	# 当为转载文章时，请在这里填写原文地址
otherOption: value
---

# 开始正文内容，使用Markdown语法
```
