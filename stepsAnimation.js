import $ from "jquery";

export class StepEntity{
    constructor(options = {}){
        const defaultOptions = {
            entity: null,
            attributes: null,
            manual: false,
            callback: null,
        };

        for(var optionName in defaultOptions){
            this[optionName] = options.hasOwnProperty(optionName) ? options[optionName] : defaultOptions[optionName];
        }
    }

    numberBetween(a, b, traveled){
        return (a + traveled * (b - a));
    }

    update(traveled){
        //If it has a custom function that works with the position
        if(this.manual && this.callback){
            this.callback(traveled);
            return true;
        }
        //If not, continue with normal workflow

        if(!this.attributes)
            return false;

        for(var attributeName in this.attributes){
            const attributeData = this.attributes[attributeName];
            const initialVal = attributeData.initialVal;
            const finalVal = attributeData.finalVal;
            const valBetween = initialVal.valueBetween ? initialVal.valueBetween(finalVal, traveled) : this.numberBetween(initialVal, finalVal, traveled);
            // console.log(attributeName, valBetween);
            this.entity.setAttribute(attributeName, valBetween);
        }
    }
}

export class StepAnimation{
    constructor(options = {}){
        // console.log(options);
        const defaultOptions = {
            /**
            *   @property {jQuery} $elem - an element that indicates the limits of the steps.
            *   If not passed, initOffset and endOffset should be setted
            */
            $elem: null,
            /**
            *   @property {jQuery} $scrollRelative -
            */
            $scrollRelative: null,
            /**
            *   @property {number} initOffset - The offset from the document that indicates the beginning of the step
            */
            initOffset: null,
            /**
            *   @property {number} endOffset - The offset from the document that indicates the end of the step
            */
            endOffset: null,
            /**
            *   @property {bool} startOnView - If the animation should start as soon as the initOffset comes into view.
            *   If false, the animation starts when the window offset top reaches the initOffset
            */
            startOnView: false,
            /**
            *   @property {function} endsOnView - If the animation should end as soon as the endOffset comes into view.
            *   If false, the animation ends when the window offset top reaches the endOffset
            */
            endsOnView: true,
            /**
            *   @property {function} onEnter - A function to run when entering the step
            *   @param {bool} fromTop                Indicates if the step is being entered from the top (true) or bottom (false)
            */
            onEnter: null,
            /**
            *   @property {function} onExit - A function to run when exiting the step
            *   @param {bool} toTop                  Indicates if the step is being exited from the top (true) or bottom (false)
            */
            onExit: null,
            /**
            *   @property {function} callback - A function to run while traversing the step
            */
            callback: null,
            /**
            *   @property {StepAnimation[]} dependencies - An array of other StepAnimation that should be done before this one starts
            */
            dependencies: null,
            /**
            *   @property {mixed[]} entities
            */
            entities: null,
        };

        for(var optionName in defaultOptions){
            this[optionName] = options.hasOwnProperty(optionName) ? options[optionName] : defaultOptions[optionName];
        }

        this.animationLoop = this.animationLoop.bind(this);
        this.init();
    }

    /**
    *   The element's relative container. Sets the positions and scrolls to listen for
    */
    getRelativeElem(){
        return this.$scrollRelative ? this.$scrollRelative : $(window);
    }

    isRelativeToWindow(){
        return this.getRelativeElem()[0] == window;
    }

    // Store the data necessary to set the correct settings for the new frame
    updateParameters(){
        const $scrollRelative = this.getRelativeElem();
        this.relativeParams = {
            offsetTop: this.isRelativeToWindow() ? 0 : $scrollRelative.offset().top,
            scrollTop: $scrollRelative.scrollTop(),
            height: $scrollRelative.height(),
        };
        const elemOffsetTop = this.$elem.offset().top;
        this.elementParams = {};
        this.elementParams.offsetTop = this.isRelativeToWindow() ? elemOffsetTop : elemOffsetTop + this.relativeParams.scrollTop - this.relativeParams.offsetTop
        this.elementParams.height = this.$elem.innerHeight()
        this.elementParams.initOffset = this.getInitOffset()
        this.elementParams.endOffset = this.getEndOffset()
    }

    /*
    *   The offset relative to the relative container scrollY.
    *   It the scrollY where travel == 0. Before this point, travel < 0
    *   If this.startOnView, the offset is equal to the scrollY where the
    *   relative container bottom meets the elem top
    */
    getInitOffset(){
        var initialOffset = this.initOffset;
        if(this.$elem){
            initialOffset = this.elementParams.offsetTop;
            if(this.startOnView)
                initialOffset -= this.relativeParams.height;
        }
        return initialOffset;
    }

    /*
    *   The offset relative to the relative container scrollY.
    *   It the scrollY where travel == 1. After this point, travel > 1
    *   If this.endsOnView, the offset is equal to the scrollY where the
    *   relative container top meets the elem bottom
    */
    getEndOffset(){
        var endOffset = this.endOffset;
        if(this.$elem){
            endOffset = this.elementParams.offsetTop + this.elementParams.height;
            if(this.endsOnView)
                endOffset -= this.relativeParams.height;
        }
        return endOffset;
    }

    /**
    *   @return {bool} true if the relative container is window (always in view),
    *   or if it its in view
    */
    isRelativeContainerInView(){
        return this.isRelativeToWindow() || (
            ( (window.scrollY + window.innerHeight) > this.relativeParams.offsetTop) &&
            ( window.scrollY < (this.relativeParams.offsetTop + this.relativeParams.height) )
        );
    }

    isInView(){
        if( !this.isRelativeContainerInView() )
            return false;
        return !this.isBefore() && !this.isAfter();
    }

    isBefore(){
        return this.relativeParams.scrollTop < this.elementParams.initOffset;
    }

    isAfter(){
        return this.relativeParams.scrollTop > this.elementParams.endOffset;
    }

    /**
    *   @return {float} how long the step is from the start to the end
    */
    getLength(){
        return this.elementParams.endOffset - this.elementParams.initOffset;
    }

    /**
    *   Distance scrolled in the step. On update, the current travel is set on currentTravel.
    *   @return {float} percentage of the distance traveled (0 to 1)
    */
    traveled(){
        return (this.relativeParams.scrollTop - this.getInitOffset()) * 1 / this.getLength();
    }

    // Goes to a point in the animation.
    goTo(travel){
        if(this.callback)
            this.callback(travel, this);
        this.updateEntities({
            traveled: travel,
        });
    }

    //Goes to the end of the step animation
    finish(){
        this.goTo(1);
    }

    //Goes to the beginning part of the step animation
    start(){
        this.goTo(0);
    }

    hasDependencies(){
        return this.dependencies && this.dependencies.length;
    }

    // If the element was in view using the previous frame travel
    wasInView(){
        return this.previousTravel >= 0 && this.previousTravel <= 1;
    }

    doOnEnter(){
        this.onEnter ? this.onEnter(this.previousTravel < 0 ? true : false) : false;
    }

    doOnExit(){
        this.onExit ? this.onExit(this.currentTravel < 0 ? true : false) : false;
    }

    hasOffsetData(){
        return this.$elem.length != 0 || (this.initOffset != null && this.endOffset != null)
    }

    update(){
        if(!this.hasOffsetData())
            return;
        this.updateParameters();
        this.currentTravel = this.traveled();

        if(this.isInView()){
            // console.log('In view', this.traveled());
            if(!this.wasInView() )
                this.doOnEnter();
            this.goTo(this.currentTravel);
        }
        else{
            if( (this.previousTravel == null || this.previousTravel >= 0) && this.isBefore() ){
                // console.log('Before');
                if(!this.hasDependencies()){
                    this.doOnExit()
                    this.start();
                }
            }
            else if( (this.previousTravel == null || this.previousTravel <= 1) && this.isAfter() ){
                // console.log('After');
                this.doOnExit();
                this.finish();
            }
        }
        this.previousTravel = this.currentTravel;
    }

    updateEntities(options = {}){
        if(!this.entities)
            return false;
        var {traveled = this.currentTravel} = options;
        // console.log(steps);
        for(let i = 0; i < this.entities.length; i++){
            this.entities[i].update(traveled);
        }
    }

    initEntities(){
        if(!this.entities)
            return false;
        // console.log('Initializing entities');
        for(let i = 0; i < this.entities.length; i++){
            this.entities[i] = new StepEntity(this.entities[i]);
        }
    }

    animationLoop(){
        if(this.endAnimationLoop == true){
            cancelAnimationFrame(this.animationLoop)
            this.endAnimationLoop = false;
            return;
        }
        this.update();
        requestAnimationFrame(this.animationLoop);
    }

    init(){
        if(!this.hasOffsetData())
            return false;

        const _this = this;
        this.initEntities();
        requestAnimationFrame(this.animationLoop);
        // console.log(this);
    }

    stop(){
        this.endAnimationLoop = true;
    }
}
