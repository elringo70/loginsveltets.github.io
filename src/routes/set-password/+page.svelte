<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { Input, Button } from '../../lib/components';

	const updatePassword: SubmitFunction = () => {
		return async ({ result, update }) => {};
	};
</script>

<div class="vh-100 bg-body-secondary">
	<div class="container h-100">
		<div class="row justify-content-center h-100 align-items-center">
			<div class="col-5 bg-white p-5 shadow rounded">
				<form method="post" autocomplete="off" use:enhance={updatePassword}>
					<Input name="email" label="Nueva contraseña" placeholder="Contraseña" required />
					<Input
						name="password"
						type="password"
						label="Confirme contraseña"
						placeholder="Confirme contraseña"
						required
					/>
					<div class="d-grid mt-4">
						<Button buttonColor="btn-primary" type="submit" text="Guardar" />
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
