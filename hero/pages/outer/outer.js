Page({
    data:{
        url:""
    },
    onLoad:function(option){
        let url = "https:"+option.url
        this.setData({
            url:url
        })
    }
})