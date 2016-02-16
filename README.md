# svg.cytoscape.js [![Version](https://img.shields.io/npm/v/svg.cytoscape.js.svg)](https://www.npmjs.com/package/svg.cytoscape.js) [![Downloads](https://img.shields.io/npm/dt/svg.cytoscape.js.svg)](https://www.npmjs.com/package/svg.cytoscape.js)

> Create cytoscape environments in SVG.

## Installation

Check out the [`lib`](/lib) directory to download the needed files and include them on your page.

## Documentation

### `colorLuminance(hex, lum)`
Modifies the color luminance.

#### Params
- **String** `hex`: The color in hex format.
- **Number** `lum`: The luminance value (0 is neutral, greater (less) than 0 is more (less) luminance).

#### Return
- **String** The new color.

### `alpha(color, a)`
Modifies a color alpha value.

#### Params
- **String** `color`: The input color.
- **Number** `a`: The alpha value.

#### Return
- **String** The modified color.

### `updateConLinkColor(elm, color)`
Updates the connection lines of an element.

#### Params
- **Element** `elm`: The element to update connection lines for.
- **String** `color`: The new color for connection lines.

### `SVGGraph(opt_options)`
Creates a new instance of elements graph.

#### Params
- **Object** `opt_options`: An object containing the following fields:
 - `dNodes` (SVG Element): The container where the draggable nodes will be appended.
 - `cNodes` (SVG Element): The container where the connectable nodes will be appended.
 - `lines` (SVG Element): The container where the lines will be appended.
 - `cytoscape` (Cytoscape): The cytoscape instance.

#### Return
- **SVGGraph** The `SVGGraph` instance.

### `add(options, The)`
Adds a new element: Instance, Model or View.

#### Params
- **Object** `options`: An object containing the following fields:
 - `label` (String): The element label.
 - `color` (String): The color that should be used.
 - `domains` (Array): An array with the domains.
 - `icon` (String): The element icon.
- **Object** `The`: raw element data.

#### Return
- **Object** An object containing the following fields:
 - `dRadius` (Number): The circle radius.
 - `setColor` (Function): A function to set the color.
 - `resetColor` (Function): A function to reset the color.
 - `position` (Object): The position object.
 - `cElm` (SVGElement): The connectable SVG element.
 - `subelms` (Array): An array with the subelements.
 - `addSubElm` (Function): A function to add new subelements.
 - `connect` (Function): A function to connect the element with other (sub)element.
 - `raw` (Object) The raw element data.

### `setColor(col)`
Sets the color of the element.

#### Params
- **String** `col`: The color to set.

### `resetColor()`
Resets the line colors.

### `addSubElm(data, The)`
Adds a subelement to the element.

#### Params
- **Object** `data`: The subelement data object:
 - `label` (String): The subelement label.
 - `type` (String): An optional subelement type (`l|m|s`).
 - `icon` (String): An optional icon.
 - `classes` (Array): An array with custom classes added to the circle element.
- **Object** `The`: raw element data.

#### Return
- **Object** The subelement that was added:
 - `resetColor` (Function): A function to reset the color.
 - `text` (SVGElement): The text SVG element.
 - `cElm` (SVGElement): The connectable SVG element.
 - `circle` (SVGElement): The circle element.
 - `connect` (Function): A function to connect the element with other (sub)element.
 - `raw` (Object) The raw element data.

### `resetColor()`
Resets the line colors.

### `connect(options, elm2)`
Connects the **subelement** to another element.

#### Params
- **Object** `options`: An object passed to the connectable plugin.
- **Element** `elm2`: The target element.

### `connect(options, elm2)`
Connects an **element** to another element.

#### Params
- **Object** `options`: An object passed to the connectable plugin.
- **Element** `elm2`: The target element.

### `Cytoscape(selector, options, data)`
Creates a new cytoscape in SVG.

#### Params
- **String|Object** `selector`: The selector or the options object.
- **Object** `options`: An object containing the following fields:
 - `selector` (String): The container selector.
 - `ui` (Object): An object containing:
   - `base` (Object): An object containing:
     - `root` (jQuery): The root element template.
 - `toolbox` (String|jQuery): The toolbox element.
 - `size` (Array): The size value in the `[width, height]` format (default: `["100%", "100%"]`).
 - `position` (Object): A jQuery css object (default `{}`).
 - `panZoomPosition` (Array): The pan-zoom position in the `[x, y, zoom]` format (default: `[0, 0, 1]`).
- **Object** `data`: An optional object containing:

#### Return
- **Cytoscape** The `Cytoscape` instance.

### `on(ev, fn)`
Adds a new listener for some event.

#### Params
- **String** `ev`: The event name.
- **Function** `fn`: The listener function.

#### Return
- **Cytoscape** The `Cytoscape` instance.

### `trigger(ev)`
Triggers an event with data.

Usage: `cyto.trigger("some-event", and, some, args)`

#### Params
- **String** `ev`: The event name.

#### Return
- **Cytoscape** The `Cytoscape` instance.

### `initToolbox()`
This function initializes the toolbox.

### `reset()`
Resets the graph.

### `render(data)`
Renders data in the graph.

#### Params
- **Object** `data`: The data object.

### `connect(source, target, line)`
Connects two elements.

#### Params
- **Object** `source`: The source element.
- **Object** `target`: The target element.
- **Object** `line`: The line element.

### `addSubElement(elm, subelm)`
Adds a subelement.

#### Params
- **Object** `elm`: The parent element.
- **Object** `subelm`: The subelement to be added.

### `addElement(el)`
Adds an element.

#### Params
- **Object** `el`: The element to be added.

#### Return
- **Element** The added element.

### `addDHandler(handler, elm)`
Adds event listeners on elements.

#### Params
- **String** `handler`: The handler name.
- **Object** `elm`: The element object.

### `getById(id)`
Returns the element that has the provided id.

#### Params
- **String** `id`: The element id you want to get.

#### Return
- **CElement|Line|SubElement** The element that has the provided id.

### `CElement(elm)`
Creates a new cytoscape element.

#### Params
- **Object** `elm`: An object containing the following fields:
 - pos (Object): The position object.
 - id (String): An optional id.
 - icon (HTML): The icon.
 - color (String): An optional color.
 - subelms (Object): An object with subelements.

#### Return
- **CElement** The cytoscape element instance.

### `setPosition(x, y)`
Updates the element position.

#### Params
- **Number** `x`: The x coordinate.
- **Number** `y`: The y coordinate.

### Events
#### `self.cytoscape`

 - **elementDragend** (drGroup, ev)
 - **elementMouseEnter** (newElm)
 - **elementMouseLeave** (newElm)
 - **subelementMouseEnter** (data, newElm, this)
 - **subelementMouseLeave** (data, newElm, this)

#### `self`

 - **addElement**
 - **elementClicked** (source, svgLineJs.source)
 - **connectElements** (source, target)

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [jillix][website]

[license]: http://showalicense.com/?fullname=jillix%20%3Ccontact%40jillix.com%3E%20(http%3A%2F%2Fjillix.com)&year=2015#license-mit
[website]: http://jillix.com
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md