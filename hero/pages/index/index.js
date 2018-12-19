//index.js
//获取应用实例
import APIS from '../../config/server'

Page({
  data: {
    toView: "green",
    allHero: [],
    heroHero: [],
    navIndex: 0,
    herolist: []
  },
  onLoad() {
    this.fatchData()
  },
  fatchData() {
    const _this = this;
    wx.request({
      url: APIS.heroList,
      data: {},
      success: function (res) {
        if (res.data.success) {
          _this.setData({
            heroNav: res.data.data.nav,
            herolist: res.data.data.heroList,
            allHero: res.data.data.heroList
          })
        }
      }
    })
  },
  scroll() {},
  selectAear(e) {
    const index = e.target.dataset.index
    const selectItem = e.target.dataset.item
    let allHero = this.data.allHero
    if (selectItem.type === "all") {
      this.setData({
        navIndex: 0,
        herolist: allHero
      });
    } else {
      let r = allHero.filter(item => item.camptype === selectItem.type)
      this.setData({
        navIndex: index,
        herolist: r
      })
    }
  },
  toDetail(e) {
    let item = e.target.dataset.item
    let urlArr = item.infourl.split("?");
    let params = {
      id: item.heroid,
      url: urlArr[0]
    }

    wx.navigateTo({
      url:'../heroDetail/heroDetail?params='+JSON.stringify(params)
    })
  }


});