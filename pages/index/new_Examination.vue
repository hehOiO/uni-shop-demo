<template>
	<view id="newEcamination">
		<view v-if="question.length==0">
			<view class="title-exam">亿客拉接手任务考试</view>
			<view class="exam-content">你好，为了你的财产安全以及避免新手用户在使用过程中出现操作问题带来不必要的麻烦，平台规定在使用此应用前需要完成新手考试后才能开始接手任务，请你认真完成以下选择器（如果在具体的操作中遇到其他问题建议你先去系统的帮助中心寻找答案哦~）</view>
			<view class="exam-button" @tap="start">开始考试</view>
		</view>
		<view v-if="examIndex==index" v-for="(child , index) in question">
			<view class="step-index">第{{examIndex+1}}题，共10题</view>
			<view class="step-question">{{child.content}}</view>
			<view class="step-check">
				 <view v-for="item in child.list" @tap="getCheck"  :data-id="item.id" :data-indexnum="index" >
					 <view  :class="['step-item-icon',item.id===child.targetId?'checked':'']"></view>
					 <view class="step-item-text">{{item.question}}</view>
				 </view>

			</view>
			<view class="step-button" v-if="examIndex==0" @tap="nextExam" :data-indexnum="index">下一题</view>
			<view class="step-button-box" v-if="examIndex!=0" >
				<view @tap="lastExam" >上一题</view>
				<view @tap="nextExam" :data-indexnum="index">下一题</view>
			</view>
		</view>
		<view v-if="examIndex==10">
			<view class="success-box" v-if="pass">
				<image src="../../static/images/common/successIcon.png" mode="widthFix"></image>
				<view style="font-size: 32rpx;font-weight: 900;color: #969799;margin-top: 50rpx;">
					恭喜通过考试~
				</view>
			</view>
			<view class="result-box" v-if="!pass">
				<view v-for="item in arrReslut">
					<image src="../../static/images/help/right.png" mode="widthFix" v-if="item.right"></image>
					<image src="../../static/images/help/fault.png" v-if="!item.right" mode="widthFix"></image>
					<view>{{item.content}}</view>
				</view>
				<view style="padding: 24rpx!important;text-align: center;color:rgb(251, 113, 128)">您本次考试不及格，请点击按钮重新开始考试~</view>
				<view style="border:none!important;" class="reset-btn" @tap="resetExamination">
					重新考试
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	var base = require('../../common/lib/base.js');
	export default {
		data() {
			return {
				examIndex:0,//题目步骤
				arrReslut:[],//答题结果总汇
				question:[//题目数据
				],
				userid:"",
				lsobj:{},//每一步答题结果
				pass:true,//是否通过考试
			}
		},
		methods: {
			start(){
				this.question = [
					{
						list:[//问题选项
							{
								id:0,
								question:"A、认真在新手教学频道深造，掌握任务基础技能。",
								right:false,
							},
							{
								id:1,
								question:"B、向自己的师傅（直接邀请人）虚心请教，在群里向高手提问，以及及时交流使用感受，给客服汇报APP的错误。",
								right:false,
							},
							{
								id:2,
								question:"C、在旺旺上逼问商家回答不知道的问题，赖着不走并提及任务相关的内容。",
								right:true,
							}
						],
						content:"1、当我是第一次使用该类软件时，________,会被处罚冻结账号。",//问题内容
						index:0,//问题下标
						targetId:"",//选中下标
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、主图一致，商品搜索价格一致，截图模式链接核对正确，寻词模式猜对短词。",
								right:false,
							},
							{
								id:1,
								question:"B、任务顶部的店铺名、店铺旺旺名基本一致，商品搜索价格一致。",
								right:false,
							},
							{
								id:2,
								question:"C、核对商品搜索价格、任务顶部的店铺名、旺旺名、主图、链接正确、商品详情内找到完整的短词。",
								right:true,
							}
						],
						content:"2、任务里的目标商品找了很久才找到，但不能确定是否正确，我只要________就可以下单了。",
						index:1,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、旺旺上联系商家返款，并抖动骚扰。",
								right:false,
							},
							{
								id:1,
								question:"B、在官方qq群上向接待客服抱怨商家返款真慢，通过任务内的申诉，私信功能或催返款功能向商家传递自己的心声。",
								right:true,
							},
							{
								id:2,
								question:"C、电话联系商家",
								right:false,
							}
						],
						content:"3、任务已完成，我正在心急如焚的等待商家返款，这个时候可以_________.",
						index:2,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、退款错误商品，申诉请求继续任务或等待商家告知下一步行动。",
								right:true,
							},
							{
								id:1,
								question:"B、不管不顾，指望蒙混过关。",
								right:false,
							},
							{
								id:2,
								question:"C、拒不承认自己拍错的事实。",
								right:false,
							}
						],
						content:"4、提交任务后被申诉告知排错商品，我应该_________.",
						index:3,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、然后被平台核实后冻结账号，冻结钱包。",
								right:true,
							},
							{
								id:1,
								question:"B、退款应该会自动撤销任务，没有任何关系。",
								right:false,
							},
							{
								id:2,
								question:"C、虽然平台承诺48小时返款，但是这是我的自由，没有关系。",
								right:false,
							}
						],
						content:"我已提交任务，但是忽然需要资金周转，在未申诉之前点了退款，________.",
						index:4,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、先申诉，5天后截取物流信息，上传两张物流截图完成任务，等待10天自动收货评价",
								right:false,
							},
							{
								id:1,
								question:"B、通过物流的单号在物流官网查询了解实时物流信息，向平台汇报自己的所属地区的物流限制情况。",
								right:false,
							},
							{
								id:2,
								question:"C、以上都对，物流信息没有更新但其实已经发货，提前收货依然会被处罚。",
								right:true,
							}
						],
						content:"6、物流信息久久没有更新，我已经等的心急如焚了，这时候我应该______.",
						index:5,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、立刻默认好评。",
								right:false,
							},
							{
								id:1,
								question:"B、等待一两天，按照任务评价要求完成评价，无要求则客观又真实的描述自己的满意感受。",
								right:true,
							},
							{
								id:2,
								question:"C、夸夸奇谈，生怕别人不知道自己在好评。",
								right:false,
							}
						],
						content:"7、物流信息已经自动变更为收货状态，一个优秀的买手会__________.",
						index:6,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、平台单量较少。",
								right:false,
							},
							{
								id:1,
								question:"B、今天运气差。",
								right:false,
							},
							{
								id:2,
								question:"C、账号最近购买量过大导致账号异常，接单排队靠后。",
								right:true,
							}
						],
						content:"8、点击接单后，半小时还没接到单，是以下哪个原因造成的？",
						index:7,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、去淘宝评价前，先打开平台查看商家的评价要求，按照要求进行默认好评，文字好评及图片好评",
								right:true,
							},
							{
								id:1,
								question:"B、不管商家的评价要求，直接去淘宝确认收货，评价后在平台APP中上传截图收取佣金。",
								right:false,
							},
							{
								id:2,
								question:"C、随便上传两张截图收取佣金。",
								right:false,
							}
						],
						content:"9、物流显示签收后，如果确认收货及评价是正确的？",
						index:8,
						targetId:"",
						isNext:false,//是否可以下一题
					},
					{
						list:[
							{
								id:0,
								question:"A、找不到的话可以随意卡条件搜索.",
								right:false,
							},
							{
								id:1,
								question:"B、在综合排序下通过搜索关键词找到主图左下角带有hot标记的目标商品，如有问题联系平台客服。",
								right:true,
							},
							{
								id:2,
								question:"C、联系商家旺旺咨询。",
								right:false,
							}
						],
						content:"10、怎么做直通车任务？",
						index:9,
						targetId:"",
						isNext:false,//是否可以下一题
					}
				]
			},
			resetExamination(){//重新考试按钮
				this.examIndex = 0;
				this.arrReslut = [];
				this.lsobj = {};
				this.pass = true;
				this.question = [];
			},
			getCheck(e){
				var indexnum = e.currentTarget.dataset.indexnum;//当前题目下标
				var id = e.currentTarget.dataset.id;//当前题目的选项下标
				this.question[indexnum].targetId = parseInt(e.currentTarget.dataset.id);//判断check选中状态
				console.log(this.question[indexnum].list[id].right);
				if(this.question[indexnum].list[id].right){//如果选中的是正确答案
					this.lsobj = {
						content:this.question[indexnum].content,
						right:true,
						xbindex:indexnum
					}
				}else{
					this.lsobj = {
						content:this.question[indexnum].content,
						right:false,
						xbindex:indexnum
					}
				}
				this.question[indexnum].isNext = true;
			},
			lastExam(e){
				this.examIndex = this.examIndex - 1 ;
				console.log(this.arrReslut.length-1);
				this.arrReslut.splice(this.arrReslut.length-1,1);
				console.log(this.arrReslut)
			},
			nextExam(e){
				var indexnum = e.currentTarget.dataset.indexnum;//当前题目下标
				if(this.question[indexnum].isNext){//选择了选项
					if(indexnum==9){
						this.examIndex = this.examIndex + 1 ;
						this.arrReslut.push(this.lsobj);
						this.arrReslut.forEach(item=>{
							if(item.right==false){
								this.pass = false;
							}
						})
						if(this.pass == true){
							this.$Request("member/setNoviceCheck", {
								uid: this.userid,
							}).then(res => {
								if (res.code == 200) {
									
								} else {
							
								}
							})
						}
						
					}else{
						this.examIndex = this.examIndex + 1 ;
						this.arrReslut.push(this.lsobj);
					}
				}else{
					uni.showToast({
						title:"答案不能为空哦~",
						icon:"none"
					})
				}
				
				console.log(this.arrReslut)
			}
		},
		onLoad: function(param) {
			var userid = this.$SysUser.openid();
			this.userid = userid; 
		},
		onShow: function() {
			
		},
		onUnload: function() {
			
		},
		
	}
</script>

<style lang="less">
	.reset-btn{
		margin: 0;
		padding: 0;
		width: 50%;
		height: 60rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 60rpx;
		border: none;
		background-color: rgb(251, 113, 128);
		border-radius: 10rpx;
		color: #fff;
		padding: 0!important;
	}
	.result-box{
		padding: 24rpx;
		font-size: 26rpx;
		color:#6B6B6B;
	}
	.result-box>view{
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 2upx solid #e4e4e4;
		padding-left: 60rpx;
		position: relative;
	}
	.result-box image{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
	uni-page-body{
		background-color: #F5F6F6!important;
		height: 100%;
	}
	.success-box{
		padding-top: 40%;
		text-align: center;
		image{
			width: 160rpx;
		}
	}
	.title-exam{
		color: #585757;
		font-weight:900;
		padding: 24rpx;
		text-align: center;
	}
	.exam-content{
		color: #888686;
		font-size: 30rpx;
		padding: 24rpx 50rpx;
		letter-spacing: 6rpx;
		text-indent:70rpx;
	}
	.exam-button{
		color: #FF485B;
		background-color: #fff;
		width: 100%;
		text-align: center;
		padding: 20rpx;
		position: absolute;
		bottom: 100rpx;
	}
	.step-item-icon{
		width: 30rpx;
		height: 30rpx;
		border-radius: 100%;
		background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#DEDEDE));
		border: 2rpx solid #acacac;
		// padding: 5rpx;
		box-sizing: border-box;
		position: relative;
		margin-right: 30rpx;
		margin-top: 10upx;
	}
	.checked:after{
		content:"";
		display: block;
		width:12rpx;
		height: 12rpx;
		border-radius: 100%;
		position: absolute;
		left: 50%;
		top:50%;
		margin-left:-6rpx;
		margin-top: -6rpx;
		background-color: #FF485B;
	}
	.step-index{
		color: #878585;
		font-size: 30rpx;
		text-align: center;
		padding: 24rpx;
	}
	.step-question{
		color: #585757;
		font-weight: 900;
		padding: 24rpx;
		font-size: 32rpx;
	}
	.step-check{
		padding: 24rpx;
	}
	.step-check>view{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		color: #888686;
		font-size: 30rpx;
		margin-bottom: 30rpx;
		
	}
	.step-item-text{
		letter-spacing: 6rpx;
		width: calc(100% - 60rpx);
		word-break: break-all;
	}
	.step-button{
		color: #FF485B;
		background-color: #fff;
		width: 100%;
		text-align: center;
		padding: 20rpx;
		margin-top: 24rpx;
	}
	.step-button-box{
		margin-top: 24rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		view{
			padding: 20rpx;
			color: #FF485B
		}
	}
</style>

