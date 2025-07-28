/* 
  Fichier de connexion : écoute le formulaire, envoie la requête, stocke le token et redirige
*/

document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById('login-form');

  if (loginForm) {
 
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Empêche le rechargement de la page

      // Récupération des valeurs tapées par l'utilisateur
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      console.log('Email:', email);
      console.log('Password:', password);

      // Envoi de la requête à l'API de login
      fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      // att la reponse du serveur 
        .then(response => {
          if (!response.ok) {
            // Si le statut n'est pas 200, on déclenche une erreur
            throw new Error('Login failed');
          }
          return response.json(); // On lit la réponse JSON
        })
        .then(data => {
          console.log('Login success', data);

          //on utilise les backticks et le bon nom de clé (access_token)
          document.cookie = `token=${data.access_token}; path=/`;

          // Redirection vers la page principale si succès
          window.location.href = 'index.html';
        })
        .catch(error => {
          // En cas d’erreur (mauvais login, problème serveur)
          console.error('Error during login:', error);
          alert('Login failed: ' + error.message);
        });
    });
  }
});
