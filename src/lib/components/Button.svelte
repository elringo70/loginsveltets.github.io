<script lang="ts">
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

	export let text: string = 'Guardar';
	export let type: ButtonTypes;
	export let buttonColor: ButtonColor = 'btn-primary';
	export let disabled: boolean = false;

	export let onClick = () => {};
</script>

<button {type} class="btn {buttonColor}" {disabled} on:click={onClick}>{text}</button>
