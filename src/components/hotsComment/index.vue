<template>
  <div class="hots-comment">
    <template v-if="hotsCommentsList.length !== 0">
      <h1 class="title wonder-comment-title">精彩评论</h1>
      <div class="wonder-comment">
        <div class="wonder-comment-context" v-for="item of hotsCommentsList" :key="item">
          <div class="wonder-comment-context-left">
            <img :src="item.avatarUrl" alt="">
          </div>
          <div class="wonder-comment-context-right">
            <p class="wonder-comment-content">
              <span class="reviewer-name">
                {{item.nickname}}:
              </span>
              {{item.content}}
            </p>
            <div class="argued" v-if="item.parentCommentId !== 0">
              <span class="reviewer-name">{{item.beRepliedObj.nickname}}</span>
              {{item.beRepliedObj.content}}
            </div>
            <div class="comment-fun">
              <div class="comment-time">
                <span>{{item.timeStr}}</span>
              </div>
              <ul class="comment-tag">
                <li class="tag showJubao">
                  <span>举报</span>
                </li>
                <li class="showJubao">
                  <span class="gekai">|</span>
                </li>
                <li class="tag">
                  <i class="iconfont iconzan1"></i>
                  <span v-if="item.likedCount !== 0">{{item.likedCount}}</span>
                </li>
                <li>
                  <span class="gekai">|</span>
                </li>
                <li class="tag">
                  <i class="iconfont iconfenxiang"></i>
                </li>
                <li>
                  <span class="gekai">|</span>
                </li>
                <li class="tag">
                  <i class="iconfont iconpinglun"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="wonder-comment-footer">
          <span class="more-comment">更多精彩评论></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'index',
  props: {
    hotsCommentsList: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.hots-comment {
  padding-top: 20px;

  .title {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #000001;
  }

  .wonder-comment {

    .wonder-comment-context {
      display: flex;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #e9e9e9;
      flex-direction: row;

      .wonder-comment-context-left {
        padding: 5px 10px 0 0;

        img {
          width: 45px;
          height: 45px;
          cursor: pointer;
          background-color: #d0d0d0;
          border-radius: 50%;
        }
      }

      .wonder-comment-context-right {
        font-size: 12px;
        flex: 1;

        .wonder-comment-content {
          padding-bottom: 10px;
          line-height: 1.5;
          color: #313131;

          .reviewer-name {
            color: #0c73c2;
            cursor: pointer;
          }
        }

        .argued {
          width: 100%;
          padding: 6px;
          margin-bottom: 10px;
          line-height: 1.2;
          letter-spacing: .5px;
          color: #8b8b8f;
          background-color: #f5f5f6;
          border-radius: 2px;
          box-sizing: border-box;

          .reviewer-name {
            color: #0c73c2;
            cursor: pointer;
          }
        }

        .comment-fun {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .comment-time {
            color: #D0D0D0;
          }

          .comment-tag {
            display: flex;
            color: #676767;
            align-items: center;

            .showJubao {
              display: none;
            }

            .tag {

              i, span {
                cursor: pointer;
              }
            }

            .gekai {
              padding: 0 10px;
              color: #D0D0D0;
            }
          }

          &:hover {

            .comment-tag {

              .showJubao {
                display: inline-block;
              }
            }
          }
        }
      }
    }

    .wonder-comment-footer {
      display: flex;
      align-items: center;
      height: 50px;
      padding-bottom: 20px;
      justify-content: center;

      .more-comment {
        padding: 5px 10px;
        font-size: 14px;
        color: #313131;
        cursor: pointer;
        border: 1px solid #D0D0D0;
        border-radius: 13px;

        &:hover {
          color: #2b2b2b;
        }
      }
    }
  }
}
</style>
