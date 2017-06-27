<style scoped>
.upload {
	display: inline-block;
}
.chooseBtn {
	display: none;
}
a:hover {
	text-decoration: none
}
</style>
<template lang="html">
	<div class="upload">
		<input type="file" ref="chooseBtn" class="chooseBtn" @change="change" accept="image/*">
		<a class="" @click="chooseFile" ref="upLoadBtn" class="upLoadBtn custom-cursor-pointer">上传</a>
	</div>


</template>
<script >
	export default {
		// 上传组件
		name: 'upload',
		data() {
			return {
				test: ''
			}
		},
		props: ['upLoadUrl'],
		created() {
            console.log('upLoad created: ' + this.$el)
		},
		methods: {
            chooseFile() {
            	this.$refs.chooseBtn.click()
            },
            change() {
            	console.log('this.$refs.chooseBtn '+this.$refs.chooseBtn.files[0])
            	this.upLoad()
            },
            upLoad() {
            	// this 指向问题，会指向XHR
            	let self = this
                let uploadImg = this.$refs.chooseBtn
                let formData = new FormData();
                // 普通上传
                formData.append('action', 'normal');
				formData.append('myfile', uploadImg.files[0])
				// formData.append('type', 'normal')
				let request = new XMLHttpRequest();
				request.open('POST', self.upLoadUrl, true);
				request.onreadystatechange = function(response) {
					if (request.readyState === 4 && request.status === 200 && request.responseText !== '') {
						// emit 文件上传成功
						console.log('upload success')
						self.$emit('upLoadInfo', request.responseText)
					} else {
						console.log('upload failed')
					}
				};
				request.send(formData);
            }
		}
	}
</script>

