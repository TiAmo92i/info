<template>
  <div class="twoRow">
    <div class="list">菜单</div>
    <div class="content">内容</div>
  </div>
</template>

<script>
export default {
  name: 'twoRow',
}
</script>

<style scoped lang="less">
.twoRow {
  margin: 20px 100px;
  height: 800px;
  .list {
    width: 350px;
    height: 100%;
    background-color: white;
    border-radius: 8px;
    margin-right: 20px;
    float: left;
  }
  .content {
    width: 730px;
    height: 100%;
    background-color: white;
    border-radius: 8px;
    float: right;
  }
}
</style>
