import APIS from '../../config/server'

Page({
    data:{
        music:{},
        poster:"",
        name:"王者荣耀语言",
        author:"demo",
        src:"",
    },
    onReady(e){
        this.audioCtx = wx.createAudioContext('myAudio')
    },
    onLoad(){
        this.fatchData()
    },
    fatchData(){
        const _this = this;
        wx.request({
            url:APIS.music,
            data:{},
            success:function(res){
                if(res.data.success){
                    if(res.data.success){
                        _this.setData({
                            music:res.data.data
                        })
                    }
                }
            }
        })
    },
    play(e){
      const _this = this
      let url = e.target.dataset.url
      if(!/^http/.test(url)){
          url = 'https:' + url 
      }
      this.setData({
          src:url
      })
      setTimeout(() => {
          _this.audioCtx.play()
      },10)
    },
    playMain(){
        const _this = this;
        let url = this.data.music.yllb_38[0].gq_db
        if(!/^http/.test(url)){
            url = 'http:' + url;
        }
        this.setData({
            url : url
        })

        setTimeout(() => {
            _this.audioCtx.play()
        },10)
    }
})