<script lang="ts">
	import type { PageData } from './$types';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	export let data: PageData;

	import { auth } from '../../utils/firebase';

	import Swal from 'sweetalert2';

	async function logoutFromGoogle() {
		const formData = new FormData();
		formData.append('logout', 'logout');

		const response = await fetch('?/logoutFromGoogle', {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		switch (result.type) {
			case 'redirect':
				try {
					auth.signOut().then(() => {
						localStorage.clear();
						sessionStorage.clear();
					});
				} catch (error) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Error al dar desloguearse'
					});
				}
				break;
			case 'error':
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Error al dar desloguearse'
				});
				break;
		}
		applyAction(result);
	}
</script>

<section style="background-color: #eee;">
	<div class="container py-5">
		<div class="row">
			<div class="col-lg-4">
				<div class="card mb-4">
					<div class="card-body text-center">
						<img
							src={data.user.picture ?? './default_avatar.webp'}
							alt="avatar"
							class="rounded-circle img-fluid"
							style="width: 150px;"
						/>
						<h5 class="my-3">{data.user.name ?? 'No name'}</h5>
						<p class="text-muted mb-1">Full Stack Developer</p>
						<p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
						<div class="d-flex justify-content-around mb-2">
							<button type="button" class="btn btn-primary">Follow</button>
							<button type="button" class="btn btn-outline-primary ms-1">Message</button>
							<form method="post" on:submit|preventDefault={logoutFromGoogle}>
								<button type="submit" class="btn btn-secondary">Logout</button>
							</form>
						</div>
					</div>
				</div>
				<div class="card mb-4 mb-lg-0">
					<div class="card-body p-0">
						<ul class="list-group list-group-flush rounded-3">
							<li class="list-group-item d-flex justify-content-between align-items-center p-3">
								<i class="fas fa-globe fa-lg text-warning" />
								<p class="mb-0">https://mdbootstrap.com</p>
							</li>
							<li class="list-group-item d-flex justify-content-between align-items-center p-3">
								<i class="fab fa-github fa-lg" style="color: #333333;" />
								<p class="mb-0">mdbootstrap</p>
							</li>
							<li class="list-group-item d-flex justify-content-between align-items-center p-3">
								<i class="fab fa-twitter fa-lg" style="color: #55acee;" />
								<p class="mb-0">@mdbootstrap</p>
							</li>
							<li class="list-group-item d-flex justify-content-between align-items-center p-3">
								<i class="fab fa-instagram fa-lg" style="color: #ac2bac;" />
								<p class="mb-0">mdbootstrap</p>
							</li>
							<li class="list-group-item d-flex justify-content-between align-items-center p-3">
								<i class="fab fa-facebook-f fa-lg" style="color: #3b5998;" />
								<p class="mb-0">mdbootstrap</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-lg-8">
				<div class="card mb-4">
					<div class="card-body">
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Full Name</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{data.user.name ?? 'No name'}</p>
							</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Email</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{data.user.email ?? 'No email'}</p>
							</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Phone</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{data.user.phone ?? 'No phone'}</p>
							</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Mobile</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{data.user.mobile ?? 'No mobile'}</p>
							</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<p class="mb-0">Address</p>
							</div>
							<div class="col-sm-9">
								<p class="text-muted mb-0">{data.user.address ?? 'No address'}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="card mb-4 mb-md-0">
							<div class="card-body">
								<p class="mb-4">
									<span class="text-primary font-italic me-1">assigment</span> Project Status
								</p>
								<p class="mb-1" style="font-size: .77rem;">Web Design</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 80%"
										aria-valuenow={80}
										aria-valuemin={0}
										aria-valuemax={100}
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 72%"
										aria-valuenow="72"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 89%"
										aria-valuenow="89"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 55%"
										aria-valuenow="55"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
								<div class="progress rounded mb-2" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 66%"
										aria-valuenow="66"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="card mb-4 mb-md-0">
							<div class="card-body">
								<p class="mb-4">
									<span class="text-primary font-italic me-1">assigment</span> Project Status
								</p>
								<p class="mb-1" style="font-size: .77rem;">Web Design</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 80%"
										aria-valuenow="80"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 72%"
										aria-valuenow="72"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 89%"
										aria-valuenow="89"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
								<div class="progress rounded" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 55%"
										aria-valuenow="55"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p class="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
								<div class="progress rounded mb-2" style="height: 5px;">
									<div
										class="progress-bar"
										role="progressbar"
										style="width: 66%"
										aria-valuenow="66"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
