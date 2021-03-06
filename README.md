# **stepsAnimation**
A library to make animations with values proportional to the scroll position of the document or an element

-   [What does it do?](#what-does-it-do)
-   [How to use it](#how-to-use)
    -   [Most important options](#most-important-options)
    -   [Complete Example](#complete-example)
-   [Options](#options)

# What does it do

It calls user defined callbacks when the scrollY of an element or the window **travels through** an space defined by the `initialOffset` and `endOffset`, which works as the beginning and end of the step animation respectively. This offsets can be set automatically by defining an `$elem` whose top and bottom works as `initialOffset` and `endOffset`.

When the `scrollY` reaches the `initialOffset`, the `travel == 0`

When the `scrollY` reaches the `endOffset`, the `travel == 1`

In between the beginning and the end of the animation, the `travel` takes a value proportional to the amount of space traveled. So if the `scrollY` is in the middle of the animation space, the `travel == 0.5`. Other than lineal **easings** can be applied directly from the callbacks.

![documentation image](/img/stepsAnimation.png)

# How to use

The best way to use it is by creating an `html elem` that will define the animation space.

Once we have that `$elem`, we can do anything with the callbacks passed to `stepAnimation`

## Most important options
- The `callback` option lets us pass a piece of code that runs every time we scroll across the space of the `$elem`. It takes a parameter, `(float) travel`, that indicates how much distance has been traveled, going from 0 (initOffset), to 1 (endOffset).

- We can pass `onEnter` and `onExit` callbacks that runs when we scroll into or out of the space defined by the offsets.

- We can set options to make the animation start (`startOnView`) or end (`endsOnView`) as soon as the animation space comes into view. This would actually make the animation space bigger.

![Starts On View - How does it works](/img/startsOnView.png)

-----------

## Complete Example

A cool animation can be archived by setting an sticky `<div>` inside the `$elem` and
animating its content with the stepAnimation `callback`

view.html
````html
<!-- $elem -->
<section id="testStep" class="step sticky-step">
    <!--
        The step-content will be sticky to the screen and will take 100vh
        The idea is to have animated element inside this div
    -->
    <div class="step-content">
        <p class="test-text">TEST</p>
    </div>
    <!--
        This element defines how big the sticky-step is, thus defining the
        animation length
    -->
    <div class="scroll-height">
    </div>
</section>
<!-- $elem end -->
````

<br></br>
style.css
````css
/****** GENERAL CSS for any sticky step *********/
.sticky-step {
    position: relative;
    top: 0;
    height: auto;
    overflow: initial;
}

.sticky-step > .step-content{
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
}

.sticky-step > .scroll-height {
    height: 200vh; /*Animation length*/
    position: relative;
    margin-top: -100vh; /* negative margin to take the space of the sticky step-content*/
}

/****** SPECIFIC CSS for this test ************/
#testStep .test-text{
    transform: rotate(0);
        font-size: 9rem;
}

#testStep .step-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
````
<br></br>
index.js
````js
const textRotationStep = new StepAnimation({
    $elem: $('#testStep'),
    callback: function(travel){
        //Set a rotation up to 360deg
        $('#testStep .test-text').css('transform', `rotate(${travel * 360}deg)`);
    },
});
````



# Options

| Parameter       	| Type            	| Default 	| Required                                     	| Description                                                                                                                                                              	|
|-----------------	|-----------------	|---------	|----------------------------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| $elem           	| jQuery          	| null    	| if `initOffset` and `endOffset`  are not set 	| The jQuery object of the element that determinates the animation beggining and end offsets from the `$scrollRelative`                                                    	|
| $scrollRelative 	| jQuery          	| null    	| false                                        	| The `$elem` relative container. Sets the position and scroll to listen to. If not set, it defaults to `window`                                                           	|
| initOffset      	| float           	| null    	| if `$elem` is not set                        	| Offset relative to the `$scrollRelative` scrollY, that marks the beginning of the animation, where `travel == 0`                                                         	|
| endOffset       	| float           	| null    	| if `$elem` is not set                        	| Offset relative to the `$scrollRelative` scrollY, that marks the endpoint of the animation, where `travel == 1`                                                          	|
| startOnView     	| bool            	| false   	| No                                           	| If the animation should start as soon as the `initOffset` comes into view. If `false` the animation starts when the relative scrollY  reaches the `initOffset`           	|
| endsOnView      	| bool            	| true    	| No                                           	| If the animation should end as soon as the `endOffset` comes into view. If `false` the animation ends when the relative scrollY reaches the `endOffset`                  	|
| onEnter         	| function        	| null    	| No                                           	| A function to run when entering the step. A parameter `(bool)` is passed, that indicates if the step is being entered from the top (`true`) or bottom (`false`)          	|
| onExit          	| function        	| null    	| No                                           	| A function to run when exiting the step. A parameter `(bool)` is passed, that indicates if the step is being exited from the top (`true`) or bottom (`false`)            	|
| callback        	| function        	| null    	| No                                           	| A function that runs everytime the animation `travel` changes. Takes  `(float) currentTravel, (stepAnimation) this` as parameters. The `currentTravel` goes from 0 to 1. 	|
| dependencies    	| stepAnimation[] 	| null    	| No                                           	| Animations that needs to finished before this one can start (to be documented)                                                                                           	|
| entities        	| mixed[]         	| null    	| No                                           	| To be documented                                                                                                                                                         	|
