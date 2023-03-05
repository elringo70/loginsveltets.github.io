<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	import { Input, Button } from '../../lib/components/index';

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

<section class="vh-100 bg-body-secondary">
	<div class="container h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-lg-10 col-xl-8">
				<div class="bg-white rounded shadow">
					<div class="card-body p-5">
						<div class="row justify-content-center">
							<div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
								<p class="text-center h1 fw-bold mb-5">Registrar</p>

								<form action="?/submit" method="post" use:enhance={submit} autocomplete="off">
									<Input name="name" placeholder="Nombre" required />
									<Input name="email" type="email" placeholder="Correo electrónico" required />
									<Input name="password" type="password" placeholder="Contraseña" required />
									<Input
										name="confirm-password"
										type="password"
										placeholder="Confirmar contraseña"
										required
									/>

									<div class="form-check d-flex justify-content-center mb-5">
										<input class="form-check-input me-2" type="checkbox" name="terms" />
										<label class="form-check-label" for="terms">
											Aceptar <a href="#!">Terminos y condiciones</a>
										</label>
									</div>

									<div class="d-grid mt-4">
										<Button buttonColor="btn-primary" type="submit" {disabled} text="Login" />
									</div>
								</form>
							</div>
							<div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
									class="img-fluid"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
