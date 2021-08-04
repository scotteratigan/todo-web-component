# ToDo List using Web Component

A demonstration of a web component that implements the common todo list. Todos can be toggled, added and removed. Single source of truth is the DOM.

To use, first include the `todo.js` script.
```html
<script src="./todo.js"></script>
```

Then, add the element to the dom:
```html
<to-dos></to-dos>
```

You can specify a custom title:
```html
<to-dos data-title="My Tasks"></to-dos>
```

## Styling
Shadow DOM elements don't inherit the global css style sheets, but they do have access to CSS custom properties. So you can create a template that will allow styling. Source https://css-tricks.com/styling-a-web-component/

To define colors for the list:
```html
  <style>
    to-dos {
      --background: rgb(49, 40, 42);
      --color: pink;
    }
  </style>
```

Another option would be to define params via data- attributes on the web component and then pass that into the style tag inside the shadow root. I may explore that in the future.