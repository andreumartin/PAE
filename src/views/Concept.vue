<template>
  <div class="text-editor">
    <div
      id="editor"
      contenteditable="true"
      class="editor"
      ref="editor"
    >
      <h2>Concepto</h2>
      <p>Conferencia en Barcelona</p>
    </div>
	<div style="margin: 5px;">
		<button class="button" @click="exec('bold')">
			<b>B</b>
		</button>
		<button class="button" @click="exec('italic')">
			<i>I</i>
		</button>
		<button class="button" @click="exec('underline')">
			<u>U</u>
		</button>
		<button class="button" @click="exec('insertUnorderedList')">• Lista</button>
		<button class="button" @click="exec('createLink', prompt('URL del enlace:'))">🔗 Enlace</button>
		<button class="button" @click="exec('formatBlock', 'h1')">H1</button>
		<button class="button" @click="save">💾 Guardar</button>
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