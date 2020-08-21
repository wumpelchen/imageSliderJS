class ImageSlider {

    constructor({
        selector        = '.slider',
        imageList       = [],
        slideWidth      = 600,
        slideHeight     = 400,
        autoPlay        = true, 
        interval        = 3000,
        withCursors     = true,
        withIndicators  = true,
        moveDirection   = 'forward',
        fullWidth       = false,
        fullHeight      = false
    } = {}){
        this.slider = document.querySelector(selector);

        this.slider.style.width = `${fullWidth ? this.slider.parentElement.offsetWidth : slideWidth}px`;
        this.slider.style.height = `${fullHeight ? this.slider.parentElement.offsetHeight : slideHeight}px`;

        let div = document.createElement('div');
        div.classList.add('slider__container');
        div.style.height = `${this.slider.height}px`;

        for(let i in imageList){
            let img = document.createElement('div');
            img.style.background = `url(${imageList[i]})`;
            img.style.minWidth =`${this.slider.offsetWidth}px`;
            img.style.minHeight = `${this.slider.offsetHeight}px`;
            img.style.backgroundRepeat = 'no-repeat';
            img.style.backgroundSize = 'cover';
            img.style.display = 'block';
            img.style.backgroundPosition = 'center';
            img.style.objectFit = 'cover';
            
            div.appendChild(img);
        }
        
        this.slider.appendChild(div);

        //------------------------------------------------
        //          create Slide Buttons
        //------------------------------------------------

        if(withCursors){

            let btnBox  = document.createElement('div');
            let btnNext = document.createElement('button');
            let btnPrev = document.createElement('button');

            btnBox.classList.add('slider__buttons');

            btnNext.innerText = '>';
            btnPrev.innerText = '<';

            btnNext.addEventListener('click',()=>this.nextSlide());
            btnPrev.addEventListener('click',()=>this.prevSlide());

            btnBox.appendChild(btnPrev);
            btnBox.appendChild(btnNext);
            
            this.slider.appendChild(btnBox);
        }

        //------------------------------------------------
        //          create Slider indicator
        //------------------------------------------------

        if(withIndicators){

            let slider__indicators = document.createElement('div');
            slider__indicators.classList.add('slider__indicators');

            for(let i=0; i < imageList.length; i++){
                let slider__indicators_dot = document.createElement('div');
                slider__indicators_dot.id = i;
                slider__indicators_dot.classList.add('slider__indicators-dot');
                
                if(i==0) slider__indicators_dot.classList.add('slider__indicators-dot-selected');

                slider__indicators_dot.addEventListener('click', ()=>this.jumpToSlide(slider__indicators_dot.id));

                slider__indicators.appendChild(slider__indicators_dot);
            }
            this.slider.appendChild(slider__indicators);

            this.slider__indicators_dot = document.querySelectorAll('.slider__indicators-dot');
        }

        this.currentSlide   = 0;
        this.slideLength    = imageList.length -1;
        this.slideBox       = div;
        this.interval       = interval;
        this.moveDirection  = moveDirection == 'forward' ? 'next' : 'prev';

        if(autoPlay){
            setInterval(()=>this.moveSlides(), this.interval);
        }

        window.addEventListener('resize', ()=>{

            if(fullWidth || fullHeight) {

                let slides = this.slideBox.querySelectorAll('div');
    
                if(fullWidth){
                    this.slider.style.width = this.slider.parentNode.offsetWidth+'px';
                    slides.forEach(slide =>slide.style.minWidth = this.slider.offsetWidth + 'px');
                }
    
                if(fullHeight){
                    this.slider.style.height = this.slider.parentNode.offsetHeight+'px';
                    slides.forEach(slide =>slide.style.minHeight = this.slider.offsetHeight + 'px');
                }
            }
        })

    }

    moveSlides(direction = this.moveDirection){

        if(direction === 'next'){
            if(this.currentSlide == this.slideLength){
                this.currentSlide = 0;
            }else{
                this.currentSlide++;
            }
        }else{
            if(this.currentSlide == 0 ){
                this.currentSlide = this.slideLength;
            }else{
                this.currentSlide--;
            }
        }

        this.jumpToSlide(this.currentSlide);

    }

    nextSlide() {
        this.moveSlides('next');
    }

    prevSlide() {
        this.moveSlides('prev');
    }

    jumpToSlide(id){

        this.slider__indicators_dot.forEach(dot => dot.classList.remove('slider__indicators-dot-selected'));

        this.currentSlide = id;
        this.slider__indicators_dot[id].classList.add('slider__indicators-dot-selected');
        this.slideBox.style.transform = `translateX(-${this.slider.offsetWidth*this.currentSlide}px)`;
    }

}