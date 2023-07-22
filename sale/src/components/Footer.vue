<template>
  <footer class="footer">
    <div class="main container">
        <div class="f-about fl">
            <p class="title pb1">关于本站</p>
            <div class="intro">"融销通"实现数字经济与农业相结合，将融资和销售等功能一体化，使得农产品在疫情期间得到很好地经营。</div>
        </div>
        <div class="f-contact fl">
            <p class="title pb1">联系我们</p>
            <div><p>合作或咨询可通过如下方式：</p>
<p><i class="iconfont icon-qq-fill"></i>QQ：7766771234567</p>
</div>
        </div>
        <div class="f-qr fr">
            <p class="title pb1">关注我们</p>
            <div><img class="img br" alt="融销通二维码" src="../assets/img/erweima.png"/></div>
        </div>
    </div>
  </footer>
</template>

<style>
.footer {
    margin-top:100px;
    width: 100%;
    background: #252d38;
    color: #888b98;
}
.footer .main {
    padding: 0 1em;
}
.container {
    max-width: 1240px;
    margin: 0 auto;
}
.f-about {
    width: 46%;
    padding: 3% 0;
}
.f-about, .f-contact, .f-qr {
    display: inline-block;
}
.fl {
    float: left;
}
.footer .title {
    font-size: 18px;
    padding-bottom: 1em;
}
.f-contact {
    width: 40%;
    padding: 3% 10%;
}
.f-about, .f-contact, .f-qr {
    display: inline-block;
}
.fl {
    float: left;
}
.f-qr {
    width: 120px;
    padding: 3% 0;
}
.f-about, .f-contact, .f-qr {
    display: inline-block;
}
.fr {
    float: right;
}
.f-qr .img {
    width: 100px;
    height: 100px;
}
img {
    max-width: 100%;
}
</style>
