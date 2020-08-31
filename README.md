# **stepsAnimation**
A library to make animations with values proportional to the scroll position of the document or an element



# Options

| Parameter       	| Type            	| Default 	| Required                                     	| Description                                                                                                                                                              	|
|-----------------	|-----------------	|---------	|----------------------------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| $elem           	| jQuery          	| null    	| if `initOffset` and `endOffset`  are not set 	| The jQuery object of the element that determinates the animation beggining and end offsets from the `$scrollRelative`                                                    	|
| $scrollRelative 	| jQuery          	| null    	| false                                        	| The `$elem` relative container. Sets the position and scroll to listen to. If not set, it defaults to `window`                                                           	|
| initOffset      	| float           	| null    	| if `$elem` is not set                        	| Offset relative to the `$scrollRelative` scrollY, that marks the beggining of the animation, where `travel == 0`                                                         	|
| endOffset       	| float           	| null    	| if `$elem` is not set                        	| Offset relative to the `$scrollRelative` scrollY, that marks the endpoint of the animation, where `travel == 1`                                                          	|
| startOnView     	| bool            	| false   	| No                                           	| If the animation should start as soon as the `initOffset` comes into view. If `false` the animation starts when the relative scrollY  reaches the `initOffset`           	|
| endsOnView      	| bool            	| true    	| No                                           	| If the animation should end as soon as the `endOffset` comes into view. If `false` the animation ends when the relative scrollY reaches the `endOffset`                  	|
| onEnter         	| function        	| null    	| No                                           	| A function to run when entering the step. A parameter `(bool)` is passed, that indicates if the step is being entered from the top (`true`) or bottom (`false`)          	|
| onExit          	| function        	| null    	| No                                           	| A function to run when exiting the step. A parameter `(bool)` is passed, that indicates if the step is being exited from the top (`true`) or bottom (`false`)            	|
| callback        	| function        	| null    	| No                                           	| A function that runs everytime the animation `travel` changes. Takes  `(float) currentTravel, (stepAnimation) this` as parameters. The `currentTravel` goes from 0 to 1. 	|
| dependencies    	| stepAnimation[] 	| null    	| No                                           	| Animations that needs to finished before this one can start (to be documented)                                                                                           	|
| entities        	| mixed[]         	| null    	| No                                           	| To be documented                                                                                                                                                         	|
