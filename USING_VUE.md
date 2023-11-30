<img align = "left" height = "64" src = "./public/VUElogo.png">

#  Using VUE.js 

This project uses VUE.js for its frontview setup. If you're looking to help and contribute it may look intimidating if you're not used to it, so be sure to do thorough

A helpful place to start learning about [VUE.js](https://vuejs.org/guide/introduction.html)

# TLDR;

Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces.

### Example

```
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```
```
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

With that in mind, Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways:
Enhancing static HTML without a build step, Embedding as Web Components on any page, Single-Page Application (SPA), etc.

In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called Single-File Component (also known as *.vue files, abbreviated as SFC). 

Vue components can be authored in two different API styles: Options API and Composition API. Both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.

The Options API is centered around the concept of a "component instance", which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. The Composition API is centered around declaring reactive state variables directly in a function scope and composing state from multiple functions together to handle complexity.

For a more in-depth explaination check out the link above. ^