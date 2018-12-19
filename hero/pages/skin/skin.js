import APIS from '../../config/server'

Page({
    data:{
        skin:[]
    },
    fatchData(){
        const _this = this;
        wx.request({
            url:APIS.skin,
            data:{},
            success:function(res){
                if(res.data.success){
                    _this.setData({
                        skin:res.data.data
                    })
                }
            }
        })
    },
    onLoad(){
        this.fatchData()
    },
    open(e){
        let index = e.target.dataset.index
        let data = this.data.skin[index]

        wx.navigateTo({
            url:`../outer/outer?url=`+ data.url
        })
    }

})