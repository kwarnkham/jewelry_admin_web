<template>
  <div>
    <div class="row" v-if="thumbnails.length>0">
      <div v-for="(thumbnail, key) in thumbnails" :key="key" class="col-12 q-pa-sm">
        <q-img :src="thumbnail.content">
          <div class="absolute-top text-right" style="padding:0px;">
            <q-btn
              icon="close"
              round
              size="10px"
              color="red"
              class="q-ma-xs"
              @click="removeFile(thumbnail)"
            />
          </div>
        </q-img>
      </div>
    </div>
    <q-btn
      label="Choose Picture"
      @click="$refs.fileInput.click()"
      class="q-my-sm bg-secondary text-white"
      style="width:100%"
    />
    <input
      class="hidden"
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      @input="setImage($event)"
    />
  </div>
</template>

<script>
export default {
  name: "FileUploader",
  data() {
    return {
      thumbnails: [],
      files: []
    };
  },
  watch: {
    files(value) {
      if (value != null) {
        this.$emit("updateFiles", value);
        if (value.length > 0) {
          this.thumbnails = [];
          for (let i = 0; i < value.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(value[i]);
            reader.onload = reader =>
              this.thumbnails.push({
                name: value[i].name,
                content: reader.target.result
              });
          }
        }
      }
    }
  },
  methods: {
    setImage(e) {
      this.files = Array.from(e.target.files);
      this.$refs.fileInput.value = "";
    },
    removeFile(file) {
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].name == file.name) {
          this.files.splice(i, 1);
        }
      }
      if (this.files.length < 1) {
        this.thumbnails = [];
      }
    },
    clearFiles() {
      this.files = [];
      this.thumbnails = [];
    }
  },
  created() {
    this.$emit("updateFiles", "value");
  }
};
</script>