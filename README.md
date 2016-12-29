# vue-sp-file-uploader
A Vue.js/PnP.js based SharePoint file uploader component.

## Usage
#### Browser Globals

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sp-pnp-js/1.0.6/pnp.min.js"></script>
<script src="/scripts/vue-sp-file-uploader.js"></script>
```
Then use the component in your javascript:

```js
  new Vue({
		el: '#app',
		data: {
			folderUrl: '/documents'
		},
		methods: {
			doSomething: function (uploadResult) {
				console.log('Upload completed! Result:', uploadResult)
			}
		},
		template: 
		'<div>\
			<sp-file-uploader v-on:upload-completed="doSomething" :folder-url="folderUrl"/>\
		</div>'
	});

```
