# Simple ImageSliderJS

## Usage

including the files into the html project

```html
<link rel="stylesheet" href="src/imageSlider.css">
<script src="src/imageSlider.js" defer></script>

<div class="slider"></div>
```

Minimum settings for the javascript part

```javascript

const slider = new ImageSlider({
    selector    : '.slider',
    imageList   : [
                    'https://source.unsplash.com/1600x900/?beach',
                    'https://source.unsplash.com/1600x900/?nature'
                  ]
});
```

options for configurations and default settings

property | value | description | defalut 
|---|---|---|---|
selector | string | Selector for the div container |
imageList | array | List of the links to the images |
slideWidth | number | pixel width of the slider | 600
slideHeight | number | pixel height of the slider | 400
autoPlay | boolean | automatically slide moving | true
interval | number | invervall for the autoPlay in milliseconds | 3000
withCursors | boolean | switch for the navigation for netxt and preview | true
withIndicators | boolean | switch for the indicators in the bottom of the slider | true
moveDirection | string | the direction in which the slider moves (forward, backward) | forward

have fun with it!
