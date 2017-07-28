const APIBase = require('../core/base/APIBase');
const ExtensionController = require('./controller/ExtensionController');
const UserController = require('./controller/UserController');
const SellerController = require('./controller/SellerController');
const MessageCallback = require('./controller/MessageCallback');
class API extends APIBase{
	constructor(router,app) {
		super(router,app);
		//加载controller
		this.extensionController = this.controllerLoader(ExtensionController);
		this.userController = this.controllerLoader(UserController);
		this.sellerController = this.controllerLoader(SellerController);
		this.messageCallback = this.controllerLoader(MessageCallback);
		this.setRouter();
	}

	setRouter(){
        this.get('/test/test',this.userController.test);
        this.post('/selectUser',this.userController.selectUser);
		this.post('/updateJob',this.userController.updateJob);
		this.post('/selectJob',this.userController.selectJob);
		this.post('/login',this.userController.userLogin);
		this.post('/selectUsers',this.userController.selectUsers);
		this.post('/register',this.userController.register);
		this.post('/gm.html',this.userController.gm);

		this.post('/selectPlayers',this.sellerController.selectPlayers)
        this.post('/selectPlayer',this.sellerController.selectPlayer)
        this.post('/Rechange',this.sellerController.Rechange);
        this.post('/buyCard',this.sellerController.buyCard);
        this.post('/addReturnCard',this.sellerController.addReturnCard);
        this.post('/selectReward',this.sellerController.selectReward);
        this.post('/selectSell',this.sellerController.selectSell);
        this.post('/bindSeller',this.sellerController.bindSeller);
        this.get('/buildQrcodeSeller',this.sellerController.buildQrcodeSeller);
        this.post('/changeDiscountSeller',this.sellerController.changeDiscountSeller);
        this.post('/selectSeller',this.sellerController.selectSeller);
        this.post('/selectNow_seller',this.sellerController.selectNow_seller);


        this.get('/test',this.extensionController.test);
		this.post('/extension',this.extensionController.extension);
		this.post('/extract',this.extensionController.extract);
		this.get('/buildQrcodeExtension',this.extensionController.buildQrcodeExtension);
		this.post('/addExtension',this.extensionController.addExtension);
		this.get('/buildQrcodeExtensioner',this.extensionController.buildQrcodeExtensioner);
		this.post('/bindExtension',this.extensionController.bindExtension);
		this.post('/changePercentageExtension',this.extensionController.changePercentageExtension);
		this.post('/selectExtract',this.extensionController.selectExtract);
		this.post('/selectExtensioner',this.extensionController.selectExtensioner);
		this.post('/giveMoney',this.extensionController.giveMoney);
		this.post('/selectNow_extension',this.extensionController.selectNow_extension);
		this.post('/selectNow_extract',this.extensionController.selectNow_extract);



		this.post('/callback',this.messageCallback.callback)
		this.get('/rechargeCallback',this.messageCallback.rechargeCallback)

		

	}
}
module.exports = API;