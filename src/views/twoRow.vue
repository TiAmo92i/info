<template>
  <div class="twoRow">
    <div class="list">
      <h3>近期发布</h3>
    </div>
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
    h3 {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      text-align: center;
      margin: 10px 10px 10px 50px;
      width: 75%;
    }
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
