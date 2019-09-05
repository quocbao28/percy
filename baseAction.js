class BaseAction {
    async type (selector, text){
        await this.page.waitFor(selector);
        await this.page.type(selector, text,  {delay: 100});
    }
     async click (selector){
        await this.page.waitFor(selector);
        await this.page.click(selector);
    }
    
    constructor(page){
        this.page = page;
    }
}

module.exports = BaseAction;
