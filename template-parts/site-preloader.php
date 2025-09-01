<style>
	:root {
		color-scheme: light;
		--preloader-bg: #fff;
	}

	:root[data-theme="dark"] {
		color-scheme: dark;
		--preloader-bg: hsl(240, 20%, 13%);
	}

	.SitePreloader {
		z-index: 1100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		height: 100dvh;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: var(--preloader-bg);
		transition: opacity 0.4s cubic-bezier(.5,0,.4,1) 0.1s;
		opacity: 1;
	}

	.SitePreloader.is-animated {
		opacity: 0;
	}

	.SitePreloader.is-hidden {
		pointer-events: none;
	}

	.SitePreloader .SiteLogo {
		width: 100px;
		/* filter: drop-shadow(2px 2px 2px rgba(0,0,0,.25)); */
	}

	.SitePreloader__brand {
		transition:
			transform 0.6s cubic-bezier(.5,0,.4,1) 0.1s,
			opacity 0.1s cubic-bezier(.5,0,.4,1);
		animation: logoPulsation 1.2s infinite cubic-bezier(.5,0,.4,1);
		will-change: transform, opacity;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.SitePreloader__subtitle {
		font-size: 14px;
		line-height: 1.2;
		color: #fafbff;
		letter-spacing: 6px;
		text-transform: uppercase;
	}

	.SitePreloader.is-animated .SitePreloader__brand {
		/* transform: scale(10); */
		/* opacity: 0 !important; */
	}

	@keyframes logoPulsation {
		0% {
			opacity: .15
		}
		40% {
			opacity: 1
		}
		50% {
			opacity: 1
		}
		60% {
			opacity: 1
		}
		100% {
			opacity: .15
		}
	}
</style>

<div class="SitePreloader">
	<div class="SitePreloader__brand">

		<!-- webza -->

	</div>
</div>

<script>
	window.addEventListener('DOMContentLoaded', () => {
		setTimeout(() => {
			let $intro = document.querySelector('.SitePreloader')

			setTimeout(() => {
				$intro.classList.add('is-animated')
				setTimeout(() => {
					$intro.classList.add('is-hidden')
				}, 15)
			}, 15)

		}, 15)
	})
</script>
