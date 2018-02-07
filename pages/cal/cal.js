// pages/cal/cal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //页面上可以读取的页面数据
  id1:"back",
  id2:"clear",
  id3:"regative",
  id4:"+",
  id5: "9",
  id6: "8",
  id7: "7",
  id8: "－",
  id9: "6",
  id10: "5",
  id11: "4",
  id12: "×",
  id13: "3",
  id14: "2",
  id15: "1",
  id16: "÷",
  id17: "0",
  id18: ".",
  id19: "history",
  id20: "=",
  screenData:"0",
  lastisOperator:false,
  arr:[],
  logs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  history:function(){
    wx.navigateTo({
      url: '../list/list'
    })
  }
  , clickButton:function(event){
    console.log(event);
    console.log(event.currentTarget.id);
    var id = event.currentTarget.id;
    console.log(id);
    if(id==this.data.id1){//退格
      var data = this.data.screenData;
        if(data==0){
          return;
        }
        data=data.substring(0,data.length-1);
        if(data==""||data=="."){
          data=0;
        }
        this.setData({ screenData:data});
        this.data.arr.pop();
    }else if(id==this.data.id2){//清屏
      this.setData({ screenData:"0"});
      this.data.arr.length = 0;
    }else if(id==this.data.id3){//正负号
      var data = this.data.screenData;
      if(data==0){
        return;
      }
      var firstword=data.substring(0,1);
      if(firstword=="-"){
        data=data.substring(1,data.length);
        this.data.arr.shift();
      }else{
        data="-"+data;
        this.data.arr.unshift();
      }
      this.setData({screenData:data});

    } else if (id == this.data.id20){//=
      var data = this.data.screenData;
      if (data == 0) {
        return;
      }
      var lastword=data.substring(data.length-1,data.length);
      if(isNaN(lastword)){
        return;
      }
      var num="";
      var lastOperator;
      var arr=this.data.arr;
      var optarr=[];
      for(var i in arr){
        if(isNaN(arr[i])==false||arr[i]==this.data.id18||arr[i]==this.data.id3){
          num+=arr[i];
        }else{
          lastOperator=arr[i];
            optarr.push(num);
          optarr.push(arr[i]);
          num="";
        }
      }
      optarr.push(Number(num));
      var result=Number(optarr[0])*1.0;
      for(var i=1;i<optarr.length;i++){
        if(isNaN(optarr[i])){
          if(optarr[1]==this.data.id4){
            result+=Number(optarr[i+1]);
          } else if (optarr[1] == this.data.id8){
            result -= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.id12) {
            result *= Number(optarr[i + 1]);
          } else if (optarr[1] == this.data.id16) {
            result /= Number(optarr[i + 1]);
          }
        }
      }

      this.data.logs.push(data+"="+result);
      wx.setStorageSync('callogs', this.data.logs);
      var value = wx.getStorageSync('callogs');
      console.log(value);
      this.data.arr.length=0;
      this.data.arr.push(result);
      this.setData({screenData:result+""});
    }else{

      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        if (this.data.lastisOperator==true||this.data.screenData==0){
          return;
        }
      } 
      var sd = this.data.screenData;
      var data ;
      if(sd==0){
        data = id;
      }else{
        data = sd + id;
      }
      
      this.setData({ screenData: data});
      this.data.arr.push(id);
      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16){
        this.setData({ lastisOperator:true});
      }else{
        this.setData({ lastisOperator: false });
      }



      } 
  }
})