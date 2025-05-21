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
            <button class="button" @click="downloadFile(item)">Descargar</button>
            <button class="button" @click="openInEditor(item)">Editar</button>
            <button class="button" @click="deleteFile(item)">Eliminar</button>
          </div>
        </div>
      </li>
    </ul>
    <div style="display: flex;">
      <button class="button" style="margin-left:10px" @click="$refs.fileInput.click()">Subir archivo</button>
      <input type="file" ref="fileInput" @change="uploadFile($event)" style="display: none;">
      <button class="button" @click="goToSugerenciasMultimedia(item)">Pedir consejo</button>
      <button class="button" style="margin-left:auto; margin-right:10px" @click="goToProjectDashboard(item)">Volver atrás</button>
    </div>
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
    goToSugerenciasMultimedia(item) {
      this.$router.push({ name: 'SugerenciasMultimedia' });
    },
    goToProjectDashboard(item) {
      this.$router.push({ name: 'ProjectDashboard' });
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
      var fileType = file.type;
      if (fileType.startsWith('image/')) {
        fileType = 'image';
      } else if (fileType.startsWith('video/')) {
        fileType = 'video';
      }
      const newItem = {
        name: file.name,
        type: fileType,
      };
      this.multimediaItems.push(newItem);
    }
  }
}
</script>

<style scoped>

.list {
  list-style: none;
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

.actions {
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
}
</style>