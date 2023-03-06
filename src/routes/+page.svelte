<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	import { Input, Button } from '../lib/components/index';

	let disabled = false;

	const submit: SubmitFunction = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'failure':
					break;
			}
		};
	};
</script>

<svelte:head>
	<title>Login page</title>
</svelte:head>

<div class="vh-100 bg-body-secondary">
	<div class="container h-100">
		<div class="row justify-content-center h-100 align-items-center">
			<div class="col-5 bg-white p-5 shadow rounded">
				<form action="?/submit" method="post" use:enhance={submit} autocomplete="off">
					<Input name="login" label="Login" placeholder="Usuario" required />
					<Input name="password" label="Contraseña" placeholder="Contraseña" required />
					<div class="row mt-3">
						<span class="text-center">
							<a href="/forgot">¿Olvido su contraseña?</a>
						</span>
					</div>
					<div class="d-grid mt-4">
						<Button buttonColor="btn-primary" type="submit" {disabled} text="Login" />
					</div>
				</form>
				<div class="row mt-3">
					<p class="text-center">
						¿No estas registrado? <span><a href="/register">Registrarse</a></span>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
