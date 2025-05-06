<template>
  <div class="container">
    <h1 class="title">Mis Archivos Multimedia</h1>
    <ul class="list">
      <li v-for="item in multimediaItems" :key="item.id">
        <div class="item">
          <div class="icon">
            <span v-if="item.type === 'image'"> 🖼️ </span>
            <span v-else-if="item.type === 'video'"> 🎬 </span>
          </div>
          <div @dblclick="editName(item)" v-text="item.name"></div>
          <div class="actions">
            <button @click="downloadFile(item)">Descargar</button>
            <button @click="openInEditor(item)">Editar</button>
            <button @click="deleteFile(item)">Eliminar</button>
          </div>
        </div>
      </li>
    </ul>
    <button @click="$refs.fileInput.click()">Subir archivo</button>
    <input type="file" ref="fileInput" @change="uploadFile($event)" style="display: none;">
    <button @click="goToOtherScreen(item)">Pedir consejo</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multimediaItems: [
        { id: 1, type: 'image', name: 'folleto-promocional.png', url: 'https://example.com/image1.png' },
        { id: 2, type: 'video', name: 'trailer-video.mp4', url: 'https://example.com/video1.mp4' },
        { id: 3, type: 'image', name: 'cartel-publicitario.png', url: 'https://example.com/image2.png' },
        // ...
      ]
    }
  },
  methods: {
    goToOtherScreen(item) {
      this.$router.push({ name: 'SugerenciasMultimedia' });
    },
    downloadFile(item) {
      const fileUrl = item.url;
      const fileName = item.name;

      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName;
      a.click();
    },
    openInEditor(item) {
      window.open('https://www.canva.com/', '_blank');
    },
    deleteFile(item) {
      const index = this.multimediaItems.indexOf(item);
      if (index !== -1) {
        this.multimediaItems.splice(index, 1);
      }
    },
    editName(item) {
      const newName = prompt('Ingrese el nuevo nombre del archivo:', item.name);
      if (newName) {
        item.name = newName;
      }
    },
    uploadFile(event) {
      const file = event.target.files[0];
      const newItem = {
        name: file.name,
        type: file.type,
        size: file.size
      };
      this.multimediaItems.push(newItem);
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  margin: 5px 0px 5px 0px;
}

.icon {
  font-size: 24px;
  margin-right: 10px;
}

.name {
  font-size: 16px;
  font-weight: bold;
}

.actions {
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
}


button {
  background-color: #4F8EF7;
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0px 10px 0px;
}

button:hover {
  background-color: #3F7CEB;
}
</style>