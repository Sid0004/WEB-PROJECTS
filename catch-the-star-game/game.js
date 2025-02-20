const gameContainer = document.getElementById('gameContainer');
        const star = document.getElementById('star');
        const scoreDisplay = document.getElementById('score');
        const timerDisplay = document.getElementById('timer');
        
        let score = 0;
        let timeLeft = 30;
        let gameActive = true;

        // Move star to random position
        function moveStar() {
            if (!gameActive) return;
            
            const maxX = gameContainer.offsetWidth - star.offsetWidth;
            const maxY = gameContainer.offsetHeight - star.offsetHeight;
            
            const newX = Math.floor(Math.random() * maxX);
            const newY = Math.floor(Math.random() * maxY);
            
            star.style.left = newX + 'px';
            star.style.top = newY + 'px';
        }

        // Create particle effects
        function createParticles(x, y) {
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 50;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                
                gameContainer.appendChild(particle);
                
                setTimeout(() => {
                    particle.style.transform = `translate(${dx}px, ${dy}px)`;
                    particle.style.animation = 'sparkle 0.5s ease forwards';
                }, 10);
                
                setTimeout(() => particle.remove(), 500);
            }
        }

        // Handle star click
        star.addEventListener('click', () => {
            if (!gameActive) return;
            
            score += 1;
            scoreDisplay.textContent = `Score: ${score}`;
            
            // Create particle effect at star's position
            const starRect = star.getBoundingClientRect();
            const containerRect = gameContainer.getBoundingClientRect();
            const x = starRect.left - containerRect.left + star.offsetWidth/2;
            const y = starRect.top - containerRect.top + star.offsetHeight/2;
            createParticles(x, y);
            
            // Make star bigger briefly
            star.style.transform = 'scale(1.5)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
                moveStar();
            }, 100);
        });

        // Timer
        const timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                gameActive = false;
                star.style.display = 'none';
                alert(`Game Over! Final Score: ${score}`);
            }
        }, 1000);

        // Initial star position and periodic movement
        moveStar();
        setInterval(() => {
            if (gameActive) moveStar();
        }, 2000);