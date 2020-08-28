import 'bootstrap/dist/css/bootstrap.min.css';
import { StepAnimation } from './js/stepsAnimation.js'
import './styles/index.scss'
import $ from 'jquery'

$(document).ready(function(){
    const firstTextStep = new StepAnimation({
        $elem: $('#first-text-step'),
        startsOnView: true,
        endsOnView: true,
        callback: function(travel){
            const initialLeft = -$('#text-demo .texts div:nth-child(1) p').width();
            const finalLeft = window.innerWidth / 5 + (-initialLeft);
            const currentLeft = initialLeft + (finalLeft * travel);
            $('#text-demo .texts div:nth-child(1) p').css({
                left: `${currentLeft}px`
            })
        },
    });

    const secondTextStep = new StepAnimation({
        $elem: $('#second-text-step'),
        startsOnView: true,
        endsOnView: true,
        callback: function(travel){
            const initialLeft = -$('#text-demo .texts div:nth-child(2) p').width();
            const finalLeft = window.innerWidth / 5 + (-initialLeft);
            const currentLeft = initialLeft + (finalLeft * travel);
            $('#text-demo .texts div:nth-child(2) p').css({
                left: `${currentLeft}px`
            })
        },
    });

    const thirdTextStep = new StepAnimation({
        $elem: $('#third-text-step'),
        startsOnView: true,
        endsOnView: true,
        callback: function(travel){
            const initialLeft = -$('#text-demo .texts div:nth-child(3) p').width();
            const finalLeft = window.innerWidth / 5 + (-initialLeft);
            const currentLeft = initialLeft + (finalLeft * travel);
            $('#text-demo .texts div:nth-child(3) p').css({
                left: `${currentLeft}px`
            })
        },
    });

    const forthTextStep = new StepAnimation({
        $elem: $('#forth-text-step'),
        startsOnView: true,
        endsOnView: true,
        callback: function(travel){
            $('#text-demo .texts div:nth-child(4) p').css('transform', `scale(${1 * travel})`)
            const rgb = 255 * travel;
            const reverseRGB = 255 - rgb;
            console.log(travel);
            $('body').css('background-color', `rgb(${reverseRGB},${reverseRGB},${reverseRGB})`);
            $('#text-demo .texts p').css('color', `rgb(${rgb},${rgb},${rgb})`);
        },
    });

    // const secondText = new StepAnimation({
    //     $elem: $('#text-demo'),
    //     startsOnView: true,
    //     endsOnView: true,
    //     callback: function(travel){
    //         console.log($('#text-demo .texts p:nth-child(4)'));
    //         $('#text-demo .texts p:nth-child(4)').css('transform', `scale(${1 * travel})`)
    //     },
    // });
});
