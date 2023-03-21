<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';

	import type { ActionResult } from '@sveltejs/kit';
	import { auth } from '../utils/firebase';

	import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
	import Swal from 'sweetalert2/dist/sweetalert2.all.js';

	import { Input, Button } from '../lib/components/index';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let disabled = false;

	const Toast = Swal.mixin({
		toast: true,
		position: 'bottom-start',
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true
	});

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

	/* async function loginWithEmailAndPassword(event: Event) {
		try {
			const formData = new FormData(this);

			const email = formData.get('email') as string;
			const password = formData.get('password') as string;

			await signInWithEmailAndPassword(auth, email, password);

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
		} catch (error: any) {
			const errorCode = error.code;

			switch (errorCode) {
				case 'auth/missing-email':
				case 'auth/wrong-password':
					Toast.fire({
						icon: 'error',
						title: 'Email o contraseña incorrecta'
					});
					break;
				case 'auth/too-many-requests':
					Swal.fire({
						icon: 'error',
						title: 'Cuenta bloqueada',
						text: 'Reinicie la contraseña'
					});
					break;
			}
		}
	} */

	const loginInWithPopUpGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const userCredentials = await signInWithPopup(auth, provider);
		if (userCredentials.user) {
			goto('/profile');
		}
	};

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				goto('/profile');
			}
		});
	});
</script>

<svelte:head>
	<title>Login page</title>
</svelte:head>

<div class="vh-100 bg-body-secondary">
	<div class="container h-100">
		<div class="row justify-content-center h-100 align-items-center">
			<div class="col-5 bg-white p-5 shadow rounded">
				<form method="post" autocomplete="off">
					<Input name="email" label="Login" placeholder="Usuario" required />
					<Input
						name="password"
						type="password"
						label="Contraseña"
						placeholder="Contraseña"
						required
					/>
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

				<div class="d-flex justify-content-center align-items-end" style="height: 35px">
					<p class="text-center align-bottom m-0">Login con</p>

					<button type="button" class="btn" on:click={loginInWithPopUpGoogle}
						><div style="cursor: pointer">
							<img
								src="https://www.pngmart.com/files/16/Google-Logo-PNG-Image.png"
								style="height: 35px"
								alt=""
							/>
						</div></button
					>
				</div>
			</div>
		</div>
	</div>
</div>
