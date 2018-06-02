
#页面
  必须采用less,js html 分离的结构去写 且统一用page组件把html内容包起来
  表格列表页获取列表数据的方法约定用getList来命名;同时分页统一用mixins中的page-mixins.js 去实现，
  需要呈现序号的数据统一走一遍page-mixins.js中的getAddIndexTableData方法
  请求统一采用async await的写法
 （具体参考已有页面 如 award）
#表单校验
 动态切换的表单统一提出子表单
 修改时初始化时使用eventbus(已挂载在vue实例的$bus属性上)去初始化那些子表单的数据，初始化子表单时父表单发布事件时统一用一个eventName, 在子组件内部进行判断
 常用的校验函数都统一封装到commom目录下的validators中
 requeired 为true的 校验方式  统一 用  blur （避免手动修改model字段触发change事件从而导致校验）