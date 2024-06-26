const WXAPI = require('apifm-wxapi')
Page({
  data: {
    categoryId: undefined, // 分类id
  },
  onLoad (options) {
    this.data.categoryId = options.categoryId
    this.cmsCategoryDetail()
    this.articles()
  },
  onShow: function () {

  },
  async cmsCategoryDetail() {
    const res = await WXAPI.cmsCategoryDetail(this.data.categoryId)
    if (res.code == 0) {
      this.setData({
        category: res.data
      })
      wx.setNavigationBarTitle({
        title: res.data.info.name,
      })
    }
  },
  async articles() {
    wx.showLoading({
      title: '',
    })
    const res = await WXAPI.cmsArticlesV3({
      categoryId: this.data.categoryId || ''
    })
    wx.hideLoading()
    if (res.code == 0) {
      this.setData({
        cmsArticles: res.data.result
      })
    } else {
      this.setData({
        cmsArticles: null
      })
    }
  },
  onShareAppMessage: function() {    
    return {
      title: this.data.category.info.name,
      path: '/pages/cms/list?categoryId='+ this.data.categoryId +'&inviter_id=' + wx.getStorageSync('uid')
    }
  },
  onShareTimeline() {    
    return {
      title: this.data.category.info.name,
      query: 'categoryId='+ this.data.categoryId +'&inviter_id=' + wx.getStorageSync('uid'),
      imageUrl: this.data.category.info.icon,
    }
  },
})