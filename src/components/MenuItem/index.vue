<script setup lang="ts">

</script>
<template>
  <div class="menu-item rounded">
    <div class="title box-border">工具</div>
    <div class="menu-item-content flex-col flex gap-y-1.5 cursor-pointer" >
      <div class="item">百度</div>
      <div class="item">卡片</div>
      <div class="item">新浪</div>
      <div class="item">腾讯</div>
    </div>
  </div>
</template>
<style scoped lang="less">
.menu-item{
background: #ffffff;
  width:150px;
}
.title{
  height: 40px;
  padding: 10px;
  background: #f5f5f5;
}
.item{
padding: 6px 12px;
  font-size: 14px;
  background: red;
  border-radius: 4px;
}
.menu-item-content{
  padding: 10px;
}

</style>
