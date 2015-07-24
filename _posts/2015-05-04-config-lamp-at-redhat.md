---
layout: post
title: 在redhat系统上配置LAMP环境
author: 施浩宏
category: blog
---

首先安装mysql

yum install mysql mysql-server mysql-devel

出现“系统不支持mysql”：

yum install php-mysql

出现无法解析url：

```
<Directory "/var/www/test">
  Options FollowSymLinks
  AllowOverride All
  Order allow,deny
  Allow from all
</Directory>
```

将AllowOverride原先的None改为All。

通常利用Apache的rewrite模块对 URL 进行重写的时候， rewrite规则会写在 .htaccess 文件里。但要使 apache 能够正常的读取.htaccess 文件的内容，就必须对.htaccess 所在目录进行配置

AllowOverride参数就是指明Apache服务器是否去找.htacess文件作为配置文件，如果设置为none,那么服务器将忽略.htacess文件，如果设置为All,那么所有在.htaccess文件里有的指令都将被重写。对于AllowOverride，还可以对它指定如下一些能被重写的指令类型.

***************

2.在要支持url rewirte的目录启用 Options FollowSymLinks和AllowOverride All

复制代码 代码如下:

Alias /php "c:/web/php/"
<Directory "c:/web/php/">
Options Indexes FollowSymLinks
AllowOverride All
Order allow,deny
Allow from all
</Directory>


这样通过http://localhost:8080/php/访问时，/php/和其下面的子目录将支持url rewrite

1  AuthConfig  允许使用所有的权限指令，他们包括AuthDBMGroupFile AuthDBMUserFile  AuthGroupFile  AuthName AuthTypeAuthUserFile和Require
2  FileInfo    允许使用文件控制类型的指令。它们包括AddEncoding AddLanguage  AddType  DEfaultType ErrorDocument LanguagePriority
3  Indexes     允许使用目录控制类型的指令。它们包括AddDescription  AddIcon  AddIconByEncoding AddIconByType  DefaultIcon  DirectoryIndex  FancyIndexing  HeaderName  IndexIgnore  IndexOptions ReadmeName
4  Limit       允许使用权限控制指令。它们包括Allow Deny和Order
5  Options     允许使用控制目录特征的指令.他们包括Options 和XBitHack
Options
1  All         准许以下除MultiViews以外所有功能
2  MultiViews  允许多重内容被浏览，如果你的目录下有一个叫做foo.txt的文件，那么你可以通过/foo来访问到它，这对于一个多语言内容的站点比较有用
3  Indexes     若该目录下无index文件，则准许显示该目录下的文件以供选择
4  IncludesNOEXEC  准许SSI，但不可使用#exec和#include功能
5  Includes    准许SSI
6  FollowSymLinks  在该目录中，服务器将跟踪符号链接。注意，即使服务器跟踪符号链接，它也不会改变用来匹配不同区域的路径名，如果在<Local>;标记内设置，该选项会被忽略
7  SymLinksIfOwnerMatch  在该目录中仅仅跟踪本站点内的链接
8  ExecCGI     在该目录下准许使用CGI
