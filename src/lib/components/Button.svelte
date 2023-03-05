<script lang="ts" context="module">
	type ButtonTypes = 'submit' | 'button' | 'reset' | null | undefined;
	type ButtonColor =
		| 'btn-primary'
		| 'btn-secondary'
		| 'btn-success'
		| 'btn-danger'
		| 'btn-warning'
		| 'btn-info'
		| 'btn-light'
		| 'btn-dark'
		| 'btn-link';
</script>

<script lang="ts">
	export let text: string = 'Guardar';
	export let type: ButtonTypes;
	export let buttonColor: ButtonColor = 'btn-primary';
	export let disabled: boolean = false;
</script>

<button {type} class="btn {buttonColor}" {disabled}>{text}</button>
