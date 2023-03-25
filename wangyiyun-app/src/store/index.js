import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    playList: [
      {
        al: {
          id: 130148423,
          name: "纵横四海",
          pic: 109951168159576910,
          picUrl:
            "https://p2.music.126.net/dvBE3I5IYmDTmZq9SyKoRA==/109951168159576909.jpg",
          pic_str: "109951168159576909",
        },
        id: 1925396986,
      },
    ],
    playListIndex: 0,
    isbtnShow: true,
    detailShow: false,
    lyricList: {},
    currentTime: 0,
    isLogin: false,
    isFooterMusic: true,
  },
  getters: {},
  mutations: {
    pushPlayList: function (state, value) {
      state.playList.push(value);
    },
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    updatePlayList: function (state, value) {
      state.playList = value;
      // console.log(state.playList);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
      console.log(state.currentTime);
    },
  },
  actions: {
    getLyric: function (context, value) {
      axios.get(`http://localhost:3000/lyric?id=${value}`).then((res) => {
        console.log(res);
        // console.log(res.data.banners);
        // musicList.massages = res.data.result;
        context.commit("updateLyricList", res.data.lrc.lyric);
      });
    },
  },
  modules: {},
});
