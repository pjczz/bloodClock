<template>
  <div class="kotak_login">
    <h4 class="tulisan_login">login</h4>
    <form>
      <label>Username</label>
      <input type="text" v-model="form.username" class="form_login" placeholder="Username"
        autocomplete="off" />
      <label>Password</label>
      <input type="password" v-model="form.password" class="form_login" placeholder="Password.." />
      <button type="submit" class="btn btn-primary poll" @click="loginUser()">Login</button>
    </form>
    <p class="f00ter">
      <a href="/register" class="registerdonk">Register</a>
      <span class="notReg">Jika Belum Memiliki Akun</span>
    </p>
  </div>
</template>
<script >
// import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      users: {},
    };
  },
  methods: {
    async getUser() {
      // const user = await axios.get("http://localhost:3000/users");
      // this.users = user.data;
    },
    loginUser() {
      const login = this.users.find(
        (data) =>
          data.username === this.form.username &&
          data.password === this.form.password
      );
      if (login === undefined) {
        alert("Username Or Password Not Found");
      } else {
        var convertToString = JSON.stringify(login);
        localStorage.setItem("USER_DATA", convertToString);
        localStorage.setItem("role", login.role);
        this.$router.push("/");
        window.location.reload();
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>