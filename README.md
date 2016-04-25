# Firebase-Test

## Getting Started

* `npm install`
* `bower install`
* `gulp`

Point your browser to `http://localhost:8088`

## Summary

This sample uses a basic firebase collection of widgets.  There are 3 widgets with a name and description.  It uses PSK with page.js routing.

Within the widgets page, it displays the following:
* a dom-repeat of all widgets
* a static reference to widget 1
* a dynamically computed reference based on which widget 'details' button is selected
* a dynamically created dom-repeat of firebase-documents based on which widget 'add' button is selected (this is where the error occurs)

The dynamically created firebase-documents are based on an array `_documents` which is built by pushing an object with a location property and is added as a dom-repeat as seen below:

```
<template is="dom-repeat" items="{{_documents}}" as="document">
  <firebase-document location="{{document.location}}" data="{{document.data}}"></firebase-document>
</template>
```

It uses a modified version of firebase-document.html that simply adds some additional console.logs for debugging.

## Reproduction of Error(s)

When clicking on 'add' for any node, it produces the following error:
`Uncaught Error: Firebase.update failed: First argument  must be an object containing the children to replace.`

When logging the change in the firebase-query-behavior function `_dataChanged`, the change object first reflects the correct object value, but it then immediately receives an undefined object:

`firebase-query-behavior.html:89 firebase-query-behavior _dataChanged:  Object {path: "data", value: Object, base: Object}base: Objectpath: "data"value: Objectdescription: "Super Widget"name: "My Widget 1"__proto__: Object__proto__: Object`

`firebase-query-behavior.html:89 firebase-query-behavior _dataChanged:  Object {path: "data", value: undefined, base: undefined}`

The dom is never updated to reflect the new value.  In fact the dom never even adds the `<firebase-document>` element to begin with.
