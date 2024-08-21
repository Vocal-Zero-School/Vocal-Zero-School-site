document.addEventListener("DOMContentLoaded", () => {
	const retryButton = document.getElementById("retry-button");
	const homeButton = document.getElementById("home-button");

	retryButton.addEventListener("click", () => {
		// Replace the simple 404 page with the complex content
		document.body.innerHTML = `
            <header class="site-header">
                <div class="logo">Vocal-Zero</div>
                <nav class="main-nav glitch-nav">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="bios.html">Bios</a></li>
                        <li><a href="portofolio.html">Portfolio</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                    <div class="hamburger-menu glitch-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </header>

            <section class="page-section">
                <div class="error-container">
                    <div class="gif-overlay left-gif glitch-img">
                        <img src="/images/NMI-2.gif" alt="Corrupted Image" />
                    </div>
                    <div class="main-gif glitch-img">
                        <img src="/images/NMI error-1.gif" alt="Critical Error" />
                    </div>
                    <div class="gif-overlay right-gif glitch-img">
                        <img src="/images/NMI-2.gif" alt="Corrupted Image" />
                    </div>
                    <h1 class="glitch-text" data-text="System Failure">System Failure</h1>
                    <p>
                        Critical Error. <br />
                        Unauthorized access detected.
                    </p>
                </div>
            </section>

            <footer class="site-footer">&copy; 2024 Your Site. All rights reserved.</footer>

            <audio id="background-audio" src="/sounds/error.mp3" autoplay loop></audio>

            <div class="broken-window">
                <div class="glass-piece piece1"></div>
                <div class="glass-piece piece2"></div>
                <div class="glass-piece piece3"></div>
                <div class="glass-piece piece4"></div>
                <div class="glass-piece piece5"></div>
            </div>

            <script src="scripts/script.js"></script>
            <script src="scripts/404.js"></script>
        `;

		// Trigger the extreme effects
		startExtremeEffects();
	});

	homeButton.addEventListener("click", () => {
		// Redirect to home page
		window.location.href = "index.html";
	});

	// Function to start extreme effects
	const startExtremeEffects = () => {
		let effectStage = 0;

		// Create and animate popups
		const createPopup = () => {
			const popup = document.createElement("div");
			popup.className = "popup";
			popup.style.width = `${Math.random() * 300 + 100}px`;
			popup.style.height = `${Math.random() * 300 + 100}px`;
			popup.style.position = "absolute";
			popup.style.backgroundImage = "url('/images/popup.png')";
			popup.style.backgroundSize = "cover";
			popup.style.backgroundPosition = "center";
			popup.style.backgroundRepeat = "no-repeat";
			document.body.appendChild(popup);

			// Random initial position
			const startX = Math.random() * (window.innerWidth - popup.offsetWidth);
			const startY = Math.random() * (window.innerHeight - popup.offsetHeight);
			popup.style.left = `${startX}px`;
			popup.style.top = `${startY}px`;

			// Random speed and direction
			const speedX = (Math.random() - 0.5) * 4;
			const speedY = (Math.random() - 0.5) * 4;

			const movePopup = () => {
				let x = parseFloat(popup.style.left);
				let y = parseFloat(popup.style.top);

				x += speedX;
				y += speedY;

				// Bounce off edges
				if (x < 0 || x > window.innerWidth - popup.offsetWidth) {
					speedX *= -1;
				}
				if (y < 0 || y > window.innerHeight - popup.offsetHeight) {
					speedY *= -1;
				}

				popup.style.left = `${x}px`;
				popup.style.top = `${y}px`;

				requestAnimationFrame(movePopup);
			};

			movePopup();

			// Remove popup after some time
			setTimeout(() => {
				popup.remove();
			}, 15000); // Adjust time as needed
		};

		// Function to add effects
		const addEffects = () => {
			if (effectStage === 0) {
				// Initial stage
				document.querySelectorAll(".glitch-text").forEach((text) => {
					text.style.transition = "transform 1s, opacity 1s";
				});

				document.querySelectorAll(".glitch-img").forEach((img) => {
					img.style.transition = "filter 1s, transform 1s";
				});

				effectStage = 1;
			} else if (effectStage === 1) {
				// Intermediate stage
				setInterval(() => {
					document.querySelectorAll(".glitch-text").forEach((text) => {
						const randomX = Math.random() > 0.5 ? Math.random() * 10 - 5 : 0;
						const randomY = Math.random() > 0.5 ? Math.random() * 10 - 5 : 0;
						text.style.transform = `translate(${randomX}px, ${randomY}px)`;
						text.style.opacity = Math.random() > 0.7 ? 0.5 : 1;
					});
				}, 1500);

				setInterval(() => {
					document.querySelectorAll(".glitch-img").forEach((img) => {
						img.style.filter = `brightness(${Math.random() * 1.5 + 1}) contrast(${Math.random() * 2 + 1}) hue-rotate(${Math.random() * 20 - 10}deg)`;
						img.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
					});
				}, 2000);

				effectStage = 2;
			} else if (effectStage === 2) {
				// Advanced stage
				setInterval(() => {
					document.querySelectorAll(".glitch-nav span").forEach((nav) => {
						const randomX = Math.random() > 0.5 ? Math.random() * 10 - 5 : 0;
						const randomY = Math.random() > 0.5 ? Math.random() * 10 - 5 : 0;
						nav.style.transform = `translate(${randomX}px, ${randomY}px)`;
						nav.style.opacity = Math.random() > 0.7 ? 0.5 : 1;
					});
				}, 2000);

				setInterval(() => {
					document.querySelectorAll(".glitch-menu span").forEach((span) => {
						span.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px) rotate(${Math.random() * 10 - 5}deg)`;
						span.style.opacity = Math.random() > 0.7 ? 0.5 : 1;
					});
				}, 1500);

				effectStage = 3;
			} else if (effectStage === 3) {
				// Final stage
				document.body.innerHTML = `
                    <div id="final-screen">
                        <div class="error-message">Threat: Umbra.OXA found</div>
                    </div>
                `;
				document.body.style.backgroundColor = "red";

				const typeText = () => {
					const finalScreen = document.getElementById("final-screen");
					const errorMessage = finalScreen.querySelector(".error-message");
					const text = errorMessage.textContent;
					let index = 0;
					errorMessage.textContent = "";

					const typeChar = () => {
						if (index < text.length) {
							errorMessage.textContent += text.charAt(index);
							index++;
							setTimeout(typeChar, 50);
						} else {
							// Simulate terminal code
							const terminalCode = `
                                Checking system...
                                Scanning files...
                                Threat detected: Umbra.OXA
                                Removing threat...
                                Rebooting system...
                            `;
							setTimeout(() => {
								finalScreen.innerHTML += `
                                    <pre>${terminalCode}</pre>
                                `;
								setTimeout(() => {
									window.location.href = "index.html";
								}, 3000); // Adjust time as needed
							}, 2000);
						}
					};

					typeChar();
				};

				typeText();
			}
		};

		// Start effects
		let effectInterval = setInterval(() => {
			if (effectStage < 3) {
				addEffects();
				effectStage++;
			} else {
				clearInterval(effectInterval);
			}
		}, 20000); // Adjust time between stages
	};
});
