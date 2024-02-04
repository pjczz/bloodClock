<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="用户名">
        <a-input v-decorator="['username']" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input type="password" v-decorator="['password']" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 在这里处理登录逻辑
          console.log(values);
        }
      });
    },
  },
  data: () => {
    return {
      form: {},
    };
  },
};
</script>
