<script lang="ts">
	export let name: string;
	export let label: string | undefined = undefined;
	export let type: string = 'text';
	export let placeholder: string = '';
	export let value: string = '';

	export let disabled: boolean = false;
	export let required: boolean = false;

	export let onChange: any = () => {};
</script>

<div class="mb-3">
	{#if label}
		<label for={name} class="form-label">{label}</label>
	{/if}
	<input
		{type}
		{value}
		class="form-control"
		id={name}
		{name}
		{disabled}
		{required}
		{placeholder}
		on:change={onChange}
	/>
</div>
