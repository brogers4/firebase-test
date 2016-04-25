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

When logging the change in the firebase-query-behavior function `_dataChanged`, the change object first reflects the correct object value, but it then immediately receives an undefined object (which results in the error):

`firebase-query-behavior.html:89 firebase-query-behavior _dataChanged:  Object {path: "data", value: Object, base: Object}base: Objectpath: "data"value: Objectdescription: "Super Widget"name: "My Widget 1"__proto__: Object__proto__: Object`

`firebase-query-behavior.html:89 firebase-query-behavior _dataChanged:  Object {path: "data", value: undefined, base: undefined}`

The dom is never updated to reflect the new value.  In fact the dom never even adds the `<firebase-document>` element to begin with.

Here is the full stack of the error:

```
polymer-mini.html:2061 Uncaught Error: Firebase.update failed: First argument  must be an object containing the children to replace.
jg @ firebase.js:126
X.update @ firebase.js:260
Polymer._updateRemoteDocument @ firebase-document.html:99
Polymer._localDataChanged @ firebase-document.html:73
Polymer.FirebaseQueryBehavior._dataChanged @ firebase-query-behavior.html:101
Polymer.Base.extend._complexObserverEffect @ polymer.html:1573
Polymer.Bind._modelApi._effectEffects @ polymer.html:1402
Polymer.Bind._modelApi._propertySetter @ polymer.html:1386
Polymer.Bind._modelApi.__setProperty @ polymer.html:1395
Polymer.Templatizer.__setPropertyImpl @ polymer.html:3726
Polymer.Base._addFeature._applyEffectValue @ polymer.html:1894
Polymer.Base.extend._annotationEffect @ polymer.html:1546
Polymer.Bind._modelApi._effectEffects @ polymer.html:1402
Polymer.Bind._modelApi._propertySetter @ polymer.html:1386
Polymer.Bind._modelApi.__setProperty @ polymer.html:1395
Polymer.Templatizer.__setPropertyImpl @ polymer.html:3726
Polymer.Base._addFeature._applyConfig @ polymer.html:1997
Polymer.Base._addFeature._afterClientsReady @ polymer.html:1991
Polymer.Base._addFeature._ready @ polymer-mini.html:75
Polymer.Base._addFeature._tryReady @ polymer-mini.html:61
Polymer.Templatizer._constructorImpl @ polymer.html:3884
TemplateInstance @ polymer.html:3688
Polymer.Templatizer.stamp @ polymer.html:3912
Polymer._stampInstance @ polymer.html:4446
Polymer._insertInstance @ polymer.html:4454
Polymer._render @ polymer.html:4270
Debouncer.complete @ polymer-mini.html:2099
boundComplete @ polymer-mini.html:2078
Polymer.Async._atEndOfMicrotask @ polymer-mini.html:2055
window.MutationObserver.observe.characterData @ polymer-mini.html:2070
```
