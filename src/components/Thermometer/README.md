# 温度计、液位计组件

### 如何使用：
可以自行去修改各自组件的css
```js
import React from 'react'
import { render } from 'react-dom'
import Thermometer from './Thermometer/Thermometer.jsx';//温度计
import ContentGage from './Thermometer/ContentGage.jsx';//液位计

render(
  <Thermometer
      theme="light"
      value={33}
      max="100"
      steps="5"
      format="°C"
      size="small"
      height="300"
  />
, document.getElementById('container'))
```
### API

参数 | 类型 | 说明 | 默认值
---|---|---|---
theme|String|Light or Dark|light
value|Number|温度值|0
max|Number|温度计最大值|100
steps|Number|温度计分隔|0
format|String|单位格式|""
size|String|温度计的尺寸.可以是小的(small)、正常(normal)或者大的(large)|normal
height|Number|温度计的高度|200



