import APIS from '../../config/server'
Page({
    data:{
      hero:{},
      isShow:false,
      showInfo:{
        title:"",
        img:"",
      }
    },
    fatchData(id,url){
      const _this = this
      wx.request({
        url:APIS.heroDetail,
        method:'POST',
        data:{id,url},
        success:function(res){
            // console.log(res);
            // return false;
          if(res.data.success){
            _this.setData({
              hero:res.data.data
            })
          }
        }
      })
    },
    showHistory() {
        let _this = this;
        wx.showModal({
            title: _this.data.hero.historyTitle,
            content: _this.data.hero.historyContent.trim(),
            success: function (res) {
                if (res.confirm) {
                    // console.log('用户点击确定')
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })
    },
    showImg(e){
        let _this = this
         let imgUrl = e.target.dataset.item.text
         _this.setData({
             showInfo:{
                 title:_this.data.hero.historyTitle,
                 img: imgUrl
             },
             isShow:true
         });
    },
    checkImage(){
        if(this.data.isShow){
            this.setData({
                isShow:!this.data.isShow
            })
        }
    },
    onLoad:function(option){
        let params = JSON.parse(option.params)
        this.fatchData(params.id,params.url)
    },
    onShareAppMessage:function(res){
        let _this = this;
        if(res.from === "button") {
            console.log(res.target)
        }
        return{
            title:_this.data.hero.historyTitle,
            path:'/pages/index/index'
        }
    }
})