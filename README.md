# ls-verification-helper
内部用的验证辅助库（依赖ivew自带的async-validator）
与async-validator使用不冲突，该文件只提供一些常用的校验

用法：

1.npm install ls-verification-helper --save
2.在相应的文件中引入：import validators from 'ls-verification-helper'
3.直接使用方法


校验方法（具体方法名与传参查看index文件）：

1. 正则类：
 a.手机号
  b.固定电话
  c.邮箱
  d.邮编
  e.传真
  f.输入值只能包含字母数字下划线
  g.输入值不能含有数字和特殊字符
  h.输入值不能为中文
2. 方法类：
  a.身份证校验
  b.异步字段校验
3. 其他类型验证
 a.长度校验
