# React + TypeScript + Vite

todolist


1. usefetch

2. ...


3. checkadmin addlog HOC




Performance optimization

fcp 优化 : FCP 测量在用户导航到页面后浏览器呈现第一段 DOM 内容所花费的时间。页面上的图像、非白色元素和 SVG 被视为 DOM 内容；不包括 iframe 内的任何内容。

1. 文本压缩 开启gzip
```
  import viteCompression from 'vite-plugin-compression';
  plugins: [
    viteCompression()
  ],
```
nginx 配合修改

2. 
  css 放在<head></head>标签里面没有使用异步加载或者延迟加载 css会阻塞

  coverage 查看index.css的未使用率为30% 暂不优化


LCP:  LCP 测量视口中最大的内容元素何时呈现到屏幕上。近似于页面的主要内容对用户可见的时间。

LCP 比较长: 
1. 方案 渐进式加载是一种逐步显示图片的技术，它首先加载一张低分辨率或模糊的占位图像，然后再加载高质量的图像。   懒加载 IntersectionObserverAPI 这个api来监听图片进入可视范围之内 ( 首屏需要展示 遂不采用 )

2. 预加载lcp所用图片?


TBT: total blocking time
总阻塞时间


cls: 累计布局偏移




最佳做法: 

  http2?



  https




seo: 

文档缺少meta描述--- meta 标签添加 content 描述


图片缺少alt



others: 

  调整图片大小:  小图标图片无需提供很大的图片 pochita 图标减小
  图片格式 使用webp avif等压缩效果更好的图片 ?






hash ? contenthash? 







features:


  bgm


todo: 
  LCP 时间过长 (首页 done )  chapter  && manga
  chapter 图片可以缩小