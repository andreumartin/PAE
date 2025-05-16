<template>
  <div class="text-editor">
    <div class="toolbar">
      <button @click="exec('bold')"><b>B</b></button>
      <button @click="exec('italic')"><i>I</i></button>
      <button @click="exec('underline')"><u>U</u></button>
      <button @click="exec('insertUnorderedList')">• Lista</button>
      <button @click="exec('createLink', prompt('URL del enlace:'))">🔗 Enlace</button>
      <button @click="exec('formatBlock', 'h1')">H1</button>
      <button @click="save">💾 Guardar</button>
    </div>

    <div
      id="editor"
      contenteditable="true"
      class="editor"
      ref="editor"
    >
      <h2>Concepto</h2>
      <p>Conferencia en Barcelona</p>
    </div>
  </div>
</template>

<script setup>
const exec = (command, value = null) => {
  document.execCommand(command, false, value);
};

const save = () => {
  const content = document.getElementById('editor').innerHTML;
  console.log('Contenido guardado:', content);
  // Aquí puedes enviarlo a tu backend, guardarlo en localStorage, etc.
};
</script>

<style scoped>
.text-editor {
  max-width: 800px;
  margin: auto;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 10px;
}

.toolbar button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-size: 14px;
}

.editor {
  min-height: 400px;
  border: 1px solid #ccc;
  padding: 1rem;
  background: #fff;
  border-radius: 5px;
}

.button b {
  font-weight: bold
}
</style>