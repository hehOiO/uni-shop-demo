
/**
 * 支付管理 
 * @type {Object}
 */
var payment = {
    getProvider:function(){
        // 获取支付通道 
        return new Promise((res)=>{
            uni.getProvider({
                service: "payment",
                success:function(e){
                    var providerList = e.provider.map((value) => {
                        switch (value) {
                            case 'alipay':
                                return {
                                    name: '支付宝',
                                    id: value,
                                    loading: false
                                }
                            case 'wxpay':
                                return {
                                    name: '微信',
                                    id: value,
                                    loading: false
                                }
                        }
                    }); 

                    res(providerList); 
                },
                fail : function(err){
                    res(false); 
                }
            }); 
        })

    }
}

module.exports = payment;