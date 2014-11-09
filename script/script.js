(function() {
    var carousel = {
        wrapper: null,
        panelContainer: null,
        panels: null,

        wrapperWidth: window.innerWidth,
        wrapperHeight: window.innerHeight,
        panelWidth: window.innerWidth,
        panelHeight: window.innerHeight,

        startX: 0,
        distanceX: 0,
        currentDistanceX: 0,       
        maxDistanceX: 0,

        directionX: '',

        timer: null,
        timerCounter: 0,

        isTouchStart: false,
        stickySwipe: true,

        loop: true,
        transitionSpeed: 300,

        intervalObj: null,

        __initCarousel: function(){
            //scroll the window up to hide the address bar of the browser.
            window.setTimeout(function() { window.scrollTo(0, 1); }, 100);

            carousel.wrapper = document.getElementById('wrapper');
            carousel.panelContainer = document.getElementById('panel-container');
            carousel.panels = carousel.panelContainer.getElementsByTagName('li');

            carousel.wrapper.style.width = carousel.wrapperWidth + 'px';
            carousel.wrapper.style.height = carousel.wrapperHeight + 'px';

            carousel.panelContainer.style.width = carousel.panelsX * carousel.panelWidth + 'px';
            carousel.panelContainer.style.height = carousel.panelsY + 'px';

            for (var i = 0; i < carousel.panels.length; i++){
                carousel.panels[i].style.width = carousel.panelWidth + 'px';
                carousel.panels[i].style.height = carousel.panelHeight + 'px';
            }

            carousel.maxDistanceX = ((carousel.panelsX - (carousel.wrapperWidth / carousel.panelWidth)) + 1) * carousel.panelWidth;

            this.__initEvents();
        },

        __initEvents: function(){
            carousel.wrapper.addEventListener('touchstart', this.startHandler.bind(this), false);
            carousel.wrapper.addEventListener('touchmove', this.moveHandler.bind(this), false);
            carousel.wrapper.addEventListener('touchend', this.endHandler.bind(this), false);

            if (carousel.loop){
                carousel.panelContainer.addEventListener('webkitTransitionEnd', this.handleTransitionEnd.bind(this), false);
                this.handleTransitionEnd();
            }
        },

        startHandler: function(event){
            carousel.startX = event.touches[0].pageX;
            carousel.timer = setInterval(function() { carousel.timerCounter++; }.bind(this), 10);
            carousel.isTouchStart = true;

            event.preventDefault();
            
            this.panelStartX = carousel.distanceX + carousel.currentDistanceX;
        },

        moveHandler: function(event){
            if (carousel.isTouchStart){
                carousel.panelContainer.style.webkitTransitionDuration = '0';

                carousel.distanceX = event.touches[0].pageX - carousel.startX;

                if (carousel.stickySwipe == true){
                    carousel.panelContainer.style.webkitTransform = 'translate3d(' + (carousel.distanceX + carousel.currentDistanceX) + 'px, 0px, 0px)';
                }

                event.preventDefault();
            }
        },

        endHandler: function(event){
            clearInterval(carousel.timer);

            if (carousel.distanceX > 0) { carousel.directionX = 'right'; }
            if (carousel.distanceX < 0) { carousel.directionX = 'left';  }

            if ((carousel.directionX == 'right' && carousel.currentDistanceX == 0) || (carousel.directionX == 'left' && carousel.currentDistanceX == -(carousel.maxDistanceX - carousel.panelWidth))){
                this.comeBack();
            }

            else if (carousel.timerCounter < 30 && carousel.distanceX > 10){
                this.moveRight();
            }

            else if (carousel.timerCounter < 30 && carousel.distanceX < -10){
                this.moveLeft();
            }

            else if (carousel.distanceX <= -(carousel.panelWidth / 2)){
                this.moveLeft();
            }

            else if (carousel.distanceX >= (carousel.panelWidth / 2)){
                this.moveRight();
            }

            else{
                this.comeBack();
            }

            if(Math.abs(carousel.distanceX) < 10 || Math.abs(carousel.distanceY) < 10) {
                var elementId = event.target.getAttribute('id');
            }

            carousel.timerCounter = 0;
            carousel.isTouchStart = false;
            carousel.distanceX = 0;
        },

        handleTransitionEnd:function(){
            if (carousel.currentDistanceX === -(carousel.maxDistanceX - carousel.panelWidth)) {
                carousel.panelContainer.appendChild(carousel.panels[0]);
                carousel.panelContainer.style.webkitTransitionDuration = '0';
                carousel.panelContainer.style.webkitTransform = 'translateX(-' + (carousel.maxDistanceX - 2*carousel.panelWidth) + 'px)';
                carousel.currentDistanceX = -(carousel.maxDistanceX - 2*carousel.panelWidth);
            }

            if (carousel.currentDistanceX === 0) {
                carousel.panelContainer.insertBefore(carousel.panels[carousel.panels.length - 1],carousel.panels[0]);
                carousel.panelContainer.style.webkitTransitionDuration = '0';
                carousel.panelContainer.style.webkitTransform = 'translateX(-' + carousel.panelWidth + 'px)';
                carousel.currentDistanceX = -carousel.panelWidth;
            }
        },

        moveLeft: function () {
            carousel.currentDistanceX += -carousel.panelWidth;
            carousel.panelContainer.style.webkitTransitionDuration = carousel.transitionSpeed + 'ms';
            carousel.panelContainer.style.webkitTransform = 'translate3d(' + carousel.currentDistanceX + 'px, 0,0)';
        },

        moveRight: function () {
            carousel.currentDistanceX += carousel.panelWidth;
            carousel.panelContainer.style.webkitTransitionDuration =  carousel.transitionSpeed + 'ms';
            carousel.panelContainer.style.webkitTransform = 'translate3d(' + carousel.currentDistanceX + 'px, 0,0)';
        },

        comeBack: function(){
            carousel.panelContainer.style.webkitTransitionDuration = 250 + 'ms';
            carousel.panelContainer.style.webkitTransitionTimingFunction = 'ease-out';
            carousel.panelContainer.style.webkitTransform = 'translate3d(' + carousel.currentDistanceX + 'px, 0,0)';
        },
    };
    window.carousel = carousel;
})();

carousel.__initCarousel();