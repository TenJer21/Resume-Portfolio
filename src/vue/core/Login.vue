<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input class="input-field" v-model="username" placeholder="Username" />
            <input class="input-field" v-model="password" type="password" placeholder="Password" />
            <button class="login-button" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            // Replace this with actual authentication logic
            if (this.username === 'user' && this.password === 'pass') {
                const token = 'exampleToken'; // Replace with actual token from server
                const expiresIn = 0.1; // Set expiration time in days

                // Store token in a cookie with expiration
                Cookies.set('authToken', token, { expires: expiresIn });

                this.$router.push('/'); // Redirect to home
            } else {
                alert('Invalid credentials')
            }
        }
    }
}
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #f9f9f9;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
    color: #333;
    font-family: Arial, sans-serif;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.input-field:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
}

.login-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #0056b3;
}
</style>
