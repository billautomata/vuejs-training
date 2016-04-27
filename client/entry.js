import Vue from 'vue';
import instances from './instances';

// This is Turbolinks dependent. `page:change` wraps the `DOMContentLoaded` event
document.addEventListener('page:change', (/* event */) => {
  console.log(instances)
  instances.forEach(instance => new Vue(instance))

  new Vue({
    el: '#content'
  });
})
