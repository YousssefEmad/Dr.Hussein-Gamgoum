(function ($) {
    "use strict";
    var windowOn = $(window);
   var triggerScrollHeight = 300; // Adjust this value as needed
// Function to check the scroll position and add a class to trigger the animation
function checkScrollPosition() {
	var scrollY = $(window).scrollTop();

	if (scrollY >= triggerScrollHeight) {
		$('.media-social').addClass('show-icons');
	} else {
		$('.media-social').removeClass('show-icons');
	}
}
    $("[data-background]").each(function() {
        $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
        );
    });

    $("[data-width]").each(function() {
        $(this).css("width", $(this).attr("data-width"));
    });

    class GSAPAnimation {
        static Init() {
            /*title-animation*/
            $('.title-animation').length && this.sectionTitleAnimation('.title-animation'); 
        }
        
        static sectionTitleAnimation(activeClass) {
            let sectionTitleLines = gsap.utils.toArray(activeClass);

            sectionTitleLines.forEach(sectionTextLine => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionTextLine,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });

                const itemSplitted = new SplitText(sectionTextLine, { type: "chars, words" });
                gsap.set(sectionTextLine, { perspective: 100 });
                itemSplitted.split({ type: "words" })
                tl.from(itemSplitted.words, {
                    opacity: 0, 
                    autoAlpha: 0, 
                    transformOrigin: "top center -50",
                    y: "10px",
                    duration: 0.9,
                    stagger: 0.1,
                    ease: "power2.out",
                });
            });
        }
    }

    class RRDEVS {
        static LoadedAfter() {
            $('#preloader').delay(1).fadeOut(0);

            $(".odometer").waypoint(
                function () {
                    var odo = $(".odometer");
                    odo.each(function () {
                        var countNumber = $(this).attr("data-count");
                        var element = $(this);
                        setTimeout(function() {
                            element.html(countNumber);
                        }, 1000); // 1000 milliseconds delay (1 second)
                    });
                },
                {
                    offset: "80%",
                    triggerOnce: true,
                }
            );

            /*Wow Js*/
            if ($('.wow').length) {
                var wow = new WOW({
                    boxClass: 'wow',
                    animateClass: 'animated',
                    offset: 0,
                    mobile: false,
                    live: true
                });
                wow.init();
            }

            /*GSAPAnimation*/
            GSAPAnimation.Init();
        }
    }
    /*circleAnimation*/
    const circleAnimation = document.querySelector(".text");
    if (circleAnimation) {
        circleAnimation.innerHTML = [...circleAnimation.innerText]
            .map((char, i) => `<span style="transform:rotate(${i * 14.5}deg)">${char}</span>`)
            .join("");
    }

})(jQuery);

