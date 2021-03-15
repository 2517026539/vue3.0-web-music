declare interface Artists {
  id: number;
  name: string;
}

declare interface Mv {
  id: number;
  name: string;
  artistId: number;
  artistName?: string;
  artists: Artists[];
  artistUrl: string;
  videoGroup: { id: number, name: string, type: number}[];
  duration?: number;
  durationStr?: string;
  likedCount?: number;
  playCount?: number;
  shareCount: number;
  subCount: number;
  publishTime: string;
  desc: string;
  commentCount: number;
  [propName: string]: any;
}

declare interface SongComment {
  commentId: number,
  beRepliedObj: any,
  content: string,
  likedCount: number,
  parentCommentId: number,
  timeStr: string,
  avatarUrl: string,
  nickname: string,
  userId: number,
  commentLocationType: number,
  [params: string]: any
}

declare interface Related {
  title: string,
  coverUrl: string,
  durationmsStr: string,
  playTime: number,
  vid: string,
  creator: {
    userName: string,
    userId: number,
    [params: string]: any
  }[],
  [params: string]: any
}


// 歌单详情
declare interface PlaylistDetail {
  id: number;
  name: string;
  coverImgUrl: string;
  userId: number;
  nickname: string;
  avatarUrl: string;
  tags: string;
  playCount: number | string;
  subscribedCount: number | string;
  shareCount: number | string;
  trackCount: number;
  commentCount: number;
  createTime: string;
  subDescription: string;
  description: string;
  songs: Song[];
  [params: string]: any;
}


