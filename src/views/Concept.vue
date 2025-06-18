<template>
  <div class="text-editor">
    <div
      id="editor"
      contenteditable="true"
      class="editor"
      ref="editor"
    >
      <h2>Concepto</h2>
      <p>UWS Video Part Festival 2025 presented by Dissidence</p>
      <p>El mayor festival de cine de deportes urbanos de Europa nace en Barcelona de la mano de la asociación creada por Barcelona Street Jam y Urban World Series. Un nuevo concepto de evento cinematográfico donde el Scootering será el protagonista.</p>
      <p>Algunos de los mejores riders y grandes marcas del sector presentarán sus nuevos proyectos en un evento que tendrá una duración de 120 minutos y que congregará hasta 450 asistentes.</p>
      <p>Entradas anticipadas con descuento especial.</p>
      <p>Official Sponsors:</p>
      <p>Dissidence / Ethic / Jarritos / Blunt / Skatepro / Native / Tilt / Northpoint / Chilli Scooters / Prime / Gizmania / Aztek</p>
      <p>Organiza: Sevenmila</p>
      <p>¡Te esperamos!</p>
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