<!--评论模块-->
<template>
  <div class="container">
    <div class="comment" v-for="item in comments">
      <!--<show-more style="margin-top: 10px" :showHeight="showHeight" :content="item.content">-->
        <div>
          <div class="info"><img class="avatar" :src="item.senderLogo" width="36" height="36"/>
            <div class="right">
              <div class="name">{{item.senderName}}</div>
                <div class="date">{{transTime(item.createTime)}}</div>
            </div>
          </div>
          <div class="content" v-html="item.content"></div>
          <div ><span @click="showCommentInput(item,item)">
          <i class="iconfont icon-comment"></i> <el-button type="text" style="font-size: smaller;color: #555;padding: 0;margin: 0">回复</el-button> </span>
          </div>
          <div class="control">

            <!--<span class="like" :class="{active: item.isLike}" @click="likeClick(item)"> <i-->
            <!--class="iconfont icon-like"></i> <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span> </span>-->
          </div>
          <div class="reply">
            <div class="item" v-for="reply in item.bookReplyDtos">
              <div class="reply-content"><span class="from-name">{{reply.senderName}}</span><span>: </span> <span
                class="to-name">@{{reply.acceptName}}</span> <span v-html="reply.content"></span></div>
              <div class="reply-bottom"><span>{{transTime(reply.createTime)}}</span> <span class="reply-text"
                                                                                @click="showCommentInput(item, reply)"> <i
                class="iconfont icon-comment"></i> <span>回复</span> </span></div>
            </div>
            <!--<div class="write-reply" v-if="item.bookReplyDtos.length > 0" @click="showCommentInput(item)"><i-->
            <!--class="el-icon-edit"></i> <span class="add-comment">添加新评论</span></div>-->
            <transition name="fade">
              <div class="input-wrapper" v-if="showItemId === item.id">
                <el-input class="gray-bg-input" v-model="inputComment" type="textarea" :rows="3" autofocus
                          placeholder="写下你的评论"></el-input>
                <div class="btn-control"><span class="cancel" @click="cancel">取消</span>
                  <el-button class="btn" type="success" round @click="commitComment(item)">确定</el-button>
                </div>
              </div>
            </transition>
          </div>
        </div>

      <!--</show-more>-->
    </div>
  </div>
</template>
<script> import Vue from 'vue'
import { formatDate } from 'element-ui/packages/date-picker/src/util';
import request from '@/utils/request'
import showMore from './ShowMore'

export function addReplyRequest(form) {
  return request({
    url: '/zuul/bookReply/saveReply',
    headers: {
      'content-type': 'application/json'
    },
    method: 'post',
    data: form
  })
}

export default {
  props: {comments: {type: Array, required: true}},
  components: {showMore},
  data() {
    return {
      showHeight: 100,
      userColorName: '',
      inputComment: '', showItemId: '',
      replyForm: {
        parentId: '',
        bookId: '',
        acceptId: '',
        acceptName: '',
        content: '123'
      },
    }
  }, computed: {},
  methods: {
    transTime(a){
      return  formatDate(a, 'yyyy-MM-dd HH:mm:ss')
    },
    /** * 点赞 */
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, "isLike", true);
        item.likeNum++
      } else {
        if (item.isLike) {
          item.likeNum--
        } else {
          item.likeNum++
        }
        item.isLike = !item.isLike;
      }
    }, /** * 点击取消按钮 */ cancel() {
      this.showItemId = ''
    }, /** * 提交评论 */
    commitComment(item) {
      var arr = this.inputComment.split(this.userColorName);
      if(arr.length>1){
        debugger
        arr.shift();
      }
      this.replyForm.content = arr.toString();
      this.replyForm.contentx = 'sdf'
      addReplyRequest(this.replyForm).then(response => {
        // this.replyData=response
        this.showItemId = ''
        item.bookReplyDtos.push(response.data)
      }).then(err => {
        console.log(err)
      })

    }, /** * 点击评论按钮显示输入框 * item: 当前大评论 * reply: 当前回复的评论 */
    showCommentInput(item, reply) {
      if (reply) {
        this.userColorName = "@" + reply.senderName + ""
        this.inputComment = "@" + reply.senderName + " "
        this.replyForm.parentId = (reply.parentId == 0) ? reply.id : reply.parentId
        this.replyForm.bookId = reply.bookId
        this.replyForm.acceptId = reply.senderId
        this.replyForm.acceptName = reply.senderName
      } else {
        this.inputComment = ''
      }
      this.showItemId = item.id
    }
  }, created() {
    console.log(this.comments)
  }
} </script>

<style scoped lang="scss">
  @import "./index";

  .container {
    padding: 0 10px;
    box-sizing: border-box;
    .comment {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-bottom: 1px solid $border-fourth;
      .info {
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
        }
        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .name {
            font-size: 16px;
            color: $text-main;
            margin-bottom: 5px;
            font-weight: 500;
          }
          .date {
            font-size: 12px;
            color: $text-minor;
          }
        }
      }
      .content {
        font-size: 16px;
        color: $text-main;
        line-height: 20px;
        padding: 10px 0;
      }
      .control {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        .like {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          &.active, &:hover {
            color: $color-main;
          }
          .iconfont {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .comment-reply {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            color: $text-333;
          }
          .iconfont {
            font-size: 16px;
            margin-right: 5px;
          }
        }
      }
      .reply {
        margin: 10px 0;
        border-left: 2px solid $border-first;
        .item {
          margin: 0 10px;
          padding: 10px 0;
          border-bottom: 1px dashed $border-third;
          .reply-content {
            /*display: flex;*/
            /*align-items: center;*/
            font-size: 14px;
            color: $text-main;
            .from-name {
              color: $color-main;
            }
            .to-name {
              color: $color-main;
              margin-left: 5px;
              margin-right: 5px;
            }
          }
          .reply-bottom {
            display: flex;
            align-items: center;
            margin-top: 6px;
            font-size: 12px;
            color: $text-minor;
            .reply-text {
              display: flex;
              align-items: center;
              margin-left: 10px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
              .icon-comment {
                margin-right: 5px;
              }
            }
          }
        }
        .write-reply {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-minor;
          padding: 10px;
          cursor: pointer;
          &:hover {
            color: $text-main;
          }
          .el-icon-edit {
            margin-right: 5px;
          }
        }
        .fade-enter-active, fade-leave-active {
          transition: opacity 0.5s;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }
        .input-wrapper {
          padding: 10px;
          .gray-bg-input, .el-input__inner { /*background-color: #67C23A;*/
          }
          .btn-control {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-top: 10px;
            .cancel {
              font-size: 16px;
              color: $text-normal;
              margin-right: 20px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
            }
            .confirm {
              font-size: 16px;
            }
          }
        }
      }
    }
  }

</style>

