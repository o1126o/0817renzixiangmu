import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)


/* 

这段代码是使用 webpack 的 require.context 方法来实现动态导入 svg 文件的功能。

首先，require.context 方法接受三个参数：

要搜索的目录
是否搜索子目录
匹配文件的正则表达式


然后，通过 requireContext.keys() 获取到匹配到的所有文件路径，并使用 .map(requireContext) 将每个文件路径传递给 requireContext 方法来实现动态导入。

*/

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
