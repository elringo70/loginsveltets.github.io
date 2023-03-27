<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	import {
		GoogleAuthProvider,
		signInWithPopup,
		createUserWithEmailAndPassword,
		sendSignInLinkToEmail
	} from 'firebase/auth';

	import Swal from 'sweetalert2/dist/sweetalert2.all.js';

	import { auth } from '../../utils/firebase';

	import { Input, Button } from '../../lib/components/index';
	import { goto } from '$app/navigation';

	let disabled = false;

	async function createUserWithGoogle() {
		try {
			const formData = new FormData(this);

			const email = formData.get('email') as string;
			const password = formData.get('password') as string;

			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

			if (userCredentials) {
				const token = await auth.currentUser?.getIdToken();

				const data = new FormData();
				if (token) {
					data.append('token', token);
				}

				const response = await fetch('?/loginWithGoogle', {
					method: 'POST',
					body: data
				});

				const result: ActionResult = deserialize(await response.text());

				switch (result.type) {
					case 'failure':
						Swal.fire({
							icon: 'error',
							title: 'Error',
							text: result?.data?.message
						});
						break;
				}
				applyAction(result);
			}
		} catch (error) {
			await Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Error al registrarse'
			});
		}
	}

	let terms: HTMLInputElement;
	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);

		const token = await auth.currentUser?.getIdToken();

		const data = new FormData();
		if (token) {
			data.append('token', token);
		}

		const response = await fetch('?/loginWithGoogle', {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		switch (result.type) {
			case 'failure':
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: result?.data?.message
				});
				break;
		}
		applyAction(result);
	}

	async function createUserWithEmailAndPasswordGoogle() {
		disabled = true;
		const formData = new FormData(this);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm-password') as string;

		try {
			if (password === confirmPassword) {
				const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
				if (userCredentials) {
					this.reset();
					goto('/');
				}
			} else if (!terms.checked) {
				Swal.fire({
					icon: 'warning',
					title: 'Confirme los terminos y condiciones'
				});
			} else {
				Swal.fire({
					icon: 'warning',
					title: 'Las contraseñas no conciden'
				});
			}

			disabled = false;
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Error en el servidor'
			});
		}
	}
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

								<form
									method="post"
									on:submit|preventDefault={createUserWithEmailAndPasswordGoogle}
									autocomplete="off"
								>
									<Input name="email" type="email" placeholder="Correo electrónico" required />
									<Input name="password" type="password" placeholder="Contraseña" required />
									<Input
										name="confirm-password"
										type="password"
										placeholder="Confirmar contraseña"
										required
									/>

									<div class="form-check d-flex justify-content-center">
										<input
											class="form-check-input me-2"
											type="checkbox"
											name="terms"
											required
											bind:this={terms}
										/>
										<label class="form-check-label" for="terms">
											Aceptar <a href="#!">Terminos y condiciones</a>
										</label>
									</div>

									<div class="d-grid mt-4">
										<Button buttonColor="btn-primary" type="submit" {disabled} text="Registrarse" />
									</div>
								</form>

								<div
									class="d-flex justify-content-center align-items-end mt-3"
									style="height: 35px"
								>
									<p class="text-center align-bottom m-0">Registrarse con</p>

									<form method="post" on:submit|preventDefault={loginWithGoogle}>
										<button type="submit" class="btn"
											><div style="cursor: pointer">
												<img src="./Google-Logo-PNG-Image.png" style="height: 35px" alt="" />
											</div></button
										>
									</form>
								</div>
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
