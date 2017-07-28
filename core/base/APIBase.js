'use strict';
const ControllerBase = require('./ControllerBase');

class APIBase {
    constructor(router,app) {
        this._router = router;
        this._app = app;
    }

    controllerLoader(controller){
        let ctl = new controller(this._app.dbManager)
        if(ctl instanceof ControllerBase){
            return ctl;
        }else{
            console.error(`must be extends ControllerBase`);
        }
    }

    get router() {
        return this._router;
    }
    
    post(routerPath,fn){
            this._router.post(routerPath,fn);
    }

    get(routerPath,fn){
            this._router.get(routerPath,fn);
    }
}

module.exports = APIBase;
