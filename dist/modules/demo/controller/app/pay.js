"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoPayController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const pay_1 = require("@cool-midway/pay");
const xml2js_1 = require("xml2js");
/**
 * 支付示例
 */
let DemoPayController = class DemoPayController extends core_1.BaseController {
    /**
     * 微信扫码支付
     */
    async wx() {
        const orderNum = await this.wxPay.createOrderNum();
        const data = await this.wxPay.getInstance().unifiedOrder({
            out_trade_no: orderNum,
            body: '测试微信支付',
            total_fee: 1,
            trade_type: 'NATIVE',
            product_id: 'test001',
        });
        return this.ok(data);
    }
    /**
     * 微信支付通知回调
     */
    async wxNotify() {
        let data = '';
        this.ctx.req.setEncoding('utf8');
        this.ctx.req.on('data', chunk => {
            data += chunk;
        });
        const results = await new Promise((resolve, reject) => {
            this.ctx.req.on('end', () => {
                xml2js_1.parseString(data, { explicitArray: false }, async (err, json) => {
                    if (err) {
                        return reject('success');
                    }
                    const checkSign = await this.wxPay.signVerify(json.xml);
                    if (checkSign && json.xml.result_code === 'SUCCESS') {
                        // 处理业务逻辑
                        console.log('微信支付成功', json.xml);
                        return resolve(true);
                    }
                    return resolve(false);
                });
            });
        });
        if (results) {
            this.ctx.body =
                '<xml><return_msg>OK</return_msg><return_code>SUCCESS</return_code></xml>';
        }
    }
    /**
     * 支付宝app支付
     * @returns
     */
    async alipay() {
        const orderNum = await this.aliPay.createOrderNum();
        // app支付
        const params = await this.aliPay.getInstance().appPay({
            subject: '测试商品',
            body: '测试商品描述',
            outTradeId: orderNum,
            timeout: '10m',
            amount: '10.00',
            goodsType: '0',
        });
        return this.ok(params);
    }
    /**
     * 支付宝支付回调
     */
    async aliNotify(body) {
        const { trade_status, out_trade_no } = body;
        const check = await this.aliPay.signVerify(body);
        if (check && trade_status === 'TRADE_SUCCESS') {
            // 处理逻辑
            console.log('支付宝支付成功', out_trade_no);
        }
        this.ctx.body = 'success';
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", pay_1.CoolWxPay)
], DemoPayController.prototype, "wxPay", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", pay_1.CoolAliPay)
], DemoPayController.prototype, "aliPay", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], DemoPayController.prototype, "ctx", void 0);
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], DemoPayController.prototype, "app", void 0);
__decorate([
    decorator_1.Post('/wx'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "wx", null);
__decorate([
    decorator_1.Post('/wxNotify'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "wxNotify", null);
__decorate([
    decorator_1.Post('/alipay'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "alipay", null);
__decorate([
    decorator_1.Post('/aliNotify'),
    __param(0, decorator_1.Body(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "aliNotify", null);
DemoPayController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], DemoPayController);
exports.DemoPayController = DemoPayController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9jYXNlL2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVtby9jb250cm9sbGVyL2FwcC9wYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTRFO0FBQzVFLDRDQUFtRTtBQUNuRSwwQ0FBeUQ7QUFDekQsbUNBQXFDO0FBSXJDOztHQUVHO0FBR0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxxQkFBYztJQWVuRDs7T0FFRztJQUVILEtBQUssQ0FBQyxFQUFFO1FBQ04sTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25ELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkQsWUFBWSxFQUFFLFFBQVE7WUFDdEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxTQUFTLEVBQUUsQ0FBQztZQUNaLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLFVBQVUsRUFBRSxTQUFTO1NBQ3RCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsUUFBUTtRQUNaLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzlCLElBQUksSUFBSSxLQUFLLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMs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