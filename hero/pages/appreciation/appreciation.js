const app = getApp();

Page({
    data:{
        motto:'hello world'
    },
    onLoad(){

    },
    toGo(e){
        const str = e.target.dataset.url
        if(str === ''){
            wx.showModal({
                content:"敬请期待",
                confirmText:"确定",
                cancelText:"取消"

            })
        }else{
            wx.navigateTo({
                url:`../${str}/${str}`
            })
        }
    }
})