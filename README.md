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
		<sp-file-uploader>\
			v-ref="fileUploader"\
			v-on:upload-completed="doSomething"\
			:showUploadButton="true"\
			:folder-url="folderUrl">\
		</sp-file-uploader>\
	</div>'
});

```

## Parameters
```javascript
 /**
  * Indicates the target upload folder
  * @type {String}
  */
folderUrl: { 
	type: String, required: true 
},

/**
  * Hide/show the upload button
  * @type {Boolear}
  */
showUploadButton: { type: Boolean, default: false }
		
```

## Hacks
There are some usefull hacks that you can use:

###Use the ref to access directly the component data:
```javascript
new Vue({
	el: '#app',
	data: {
		folderUrl: '/documents',
		fileList: []
	},
	methods: {
		doSomething: function (uploadResult) {
			console.log('Upload completed! Result:', uploadResult)
		}
	},
	template: 
	'<div>\
		<sp-file-uploader>\
			v-ref="fileUploader"\
			v-on:upload-completed="doSomething"\
			:showUploadButton="true"\
			:folder-url="folderUrl">\
		</sp-file-uploader>\
		<ul>\
			<li v-for="file in fileList"> {{ file.name }} </li>\
		</ul>\
	</div>'
});		
```


###Use the ref to access directly the component methods:
```javascript
new Vue({
	el: '#app',
	data: {
		folderUrl: '/documents',
		fileList: []
	},
	methods: {
		customUploadFunc: function () {
			alert('File is going to be uploaded....');
			// using a sp-file-uploader method
			// the reference 'file' was declareted at the line 107	
			// the upload method returns a Promise
			this.$refs.fileUploader.upload()
				.then(function () { alert('Upload done!'); });
		}
	},
	template: 
	'<div>\
		<sp-file-uploader \
			v-ref="fileUploader"\
			:folder-url="folderUrl">\
		</sp-file-uploader>\
		<button type-"button" v-on:click="customUploadFunc">My button</button>\
	</div>'
});		
```
