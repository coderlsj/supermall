<template>
  <div v-if="Object.keys(itemComment).length != 0" class="comment-info">
    <div class="header">
      <div class="title-left">用户评价</div>
      <div class="title-right">更多</div>
    </div>
    <div class="contain">
      <div class="top">
        <img :src="itemComment.user.avatar" alt="">
        <span >{{itemComment.user.uname}}</span>
      </div>
      <div class="middle">
        <div class="content">{{itemComment.content}}</div>
        <div class="character">
          <span>{{itemComment.created | showDate}}</span>
          <span class="styles">{{itemComment.style}}</span>
        </div>
      </div>
      <div class="info-image">
        <img v-for="(item, index) in itemComment.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils.js'

export default {
  name: 'DetailCommentInfo',
  props: {
    itemComment: {
      type: Object
    }
  },
  filters: {
    showDate (value){
      const date = new Date(value * 1000);
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    margin-bottom: 10px;
    border-bottom: 5px solid rgba(0, 0, 0, 0.1);
  }
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  .title-left {
    float: left;
    font-size:15px;
  }
  .title-right {
    float: right;
    font-size: 13px;
  }

  .contain .top {
    padding: 10px 0 5px;
  }
  .contain .top img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .contain .top span {
    position: relative;
    left: 10px;
    top: -15px;
  }
  .middle {
    padding: 0 5px 10px;
    margin: 0;
  }
  .middle .content {
    font-size: 12px;
    line-height: 1.5;
  }
  .middle .character {
    padding: 10px 0 0;
    font-size: 12px;
    color: #999;
  }
  .middle .styles {
    margin-left: 10px;
  }
  .info-image img{
    width: 70px;
    height: 70px;
    margin-left: 5px;
  }
</style>