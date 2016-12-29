var spFileUploader = (function (Vue, pnp){
	'use strict';
	Vue.config.devtools = true;
	
	return Vue.component('sp-file-uploader',{
		data: function () {
			return {
				files: [],
				status: null
			};
		},
		props: {
			folderUrl: { type: String, required: true },
			multiple: { type: Boolean, default: false },
			showUploadButton: { type: Boolean, default: false }
		},
		mounted: function () {
			this.loadDropZone();
		},
		methods: {
			loadDropZone: function () {
				var dropZone = document.getElementById('drop-zone');
				dropZone.addEventListener('dragover', this.handleDragOver, false);
				dropZone.addEventListener('drop', this.syncFiles, false);
			},
			handleDragOver: function (e) {
				e.stopPropagation();
				e.preventDefault();
				e.dataTransfer.dropEffect = 'copy';
			},
			syncFiles: function (e) {
				e.stopPropagation();
				e.preventDefault();
				var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
				this.setFiles(files);
			},
			setFiles: function (files) {
				Object.keys(files).forEach(function (file) {
					Vue.set(this.files, file, { data: files[file].slice(), name: files[file].name });					
				}.bind(this));
			},
			upload: function () {
				this.status = 'Carregando arquivo';
				return this.uploadFiles()
					.then(this.applyUpload, this.handleError);
			},
			applyUpload: function (d) {
				this.status = "Upload finalizado!";
				this.$emit('upload-completed', d);
				return d;
			},
			handleError: function (d) {
				this.status = "Erro ao fazer upload!";
				throw "Erro ao fazer upload!";
				console.log(d)
			},
			uploadFiles: function () {
				var requests = this.files.map(function (file) {
					return pnp.sp.web.getFolderByServerRelativeUrl(this.folderUrl)
					 	.files.add(file.name, file.data, true)
					}.bind(this));
					
				return Promise.all(requests);
			}
		},
		template: 
		'<div style="text-align: center;">\
			<div style="margin-bottom:10px;">\
				<input v-on:change="syncFiles" type="file" id="files" :multiple="multiple"/>\
			</div>\
			<strong>OU</strong>\
			<div\
				aria-label="Arraste e solte arquivos aqui"\
				style="margin-top:10px; margin-bottom:10px; border: 2px dashed #bbb;font-size: 18px;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;padding: 25px;text-align: center;"\
				id="drop-zone"\
			>Arraste e solte arquivos aqui</div>\
			<div v-if="status" style="margin-top:10px; margin-bottom:10px; border: 1px solid #bbb;font-size: 18px; padding: 10px;text-align: center;">\
				{{ status }}\
			</div>\
			<ul v-if="files.length" style="margin-bottom:5px; border: 1px solid #bbb; padding: 10px;text-align: center;">\
				<li v-for="file in files"> <input type="text" v-model="file.name" style="min-width:45%"/> </li>\
			</ul>\
			<button v-if="showUploadButton" type="button" aria-label="Fazer upload de arquivo" v-on:click="upload">Upload</button>\
		</div>'
	});
})(Vue, $pnp);