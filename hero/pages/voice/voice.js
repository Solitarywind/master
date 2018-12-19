const app = getApp()
import APIS from '../../config/server'

Page({
    data: {
        heroNav: [],
        detail: {},
        navIndex: 0,
        poster: "",
        name: "王者荣耀语音",
        author: "GF",
        src: "",
    },
    onLoad() {
        this.fatchNav()
    },
    onReady(e) {
        this.audioCtx = wx.createAudioContext('myAudio')
    },
    fatchNav() {
        const _this = this
        wx.request({
            url: APIS.voiceNav,
            data: {},
            success: function (res) {
                if (res.data.success) {
                    let r = res.data.data
                    _this.setData({
                        heroNav: r.dhty_e9
                    })
                    let id = r.dhty_e9[0].yxid_a7
                    _this.fatchDetail(id)
                }
            }
        })
    },
    fatchDetail(id) {
        const _this = this
        wx.request({
            url: APIS.voiceDetail,
            data: {
                id
            },
            success: function (res) {
                if (res.data.success) {
                    let type = Object.prototype.toString.call(res.data.data.yxpfyy_fe)

                    if (/undefined/gi.test(type)) {
                        _this.setData({
                            detail: res.data.data || {}
                        })
                        return;
                    }

                    if (/Object/.test(type)) {
                        let arr = [];
                        arr.push(res.data.data.yxpfyy_fe)
                        res.data.data.yxpfyy_fe = arr
                    }

                    let r = res.data.data
                    r.yxpfyy_fe.map((item) => {
                        if (!/^http/.test(item.pfbanner_ed)) {
                            'https:' + item.pfbanner_ed
                        }
                        return item
                    })

                    _this.setData({
                        detail: r
                    })
                }
            }
        })
    },
    selectAear(e) {
        const index = e.target.dataset.index
        const id = e.target.dataset.id
        this.setData({
            navIndex: index
        })
        this.fatchDetail(id)
    },
    toDateil(e) {
        let item = e.target.dataset.item
        let current = this.data.heroNav[item]
        let id = current.yxid_a7
        wx.navigateTO({
            url: "../heroDetail/heroDetail?id=" + id
        })
    },
    play(e) {
        const _this = this
        let url = e.target.dataset.url
        if (!/^http/.test(url)) {
            url = "https:" + url;
        }
        this.setData({
            src: url
        })

        setTimeout(() => {
           _this.audioCtx.play()
        },10);
    }
})