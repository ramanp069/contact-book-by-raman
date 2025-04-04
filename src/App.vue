<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <el-row justify="space-between" align="middle" class="header-row">
        <div class="app-title" @click="handleAddContactList">Raman - Contact Book</div>
        <el-button type="info" @click="handleAddEntry" round icon="plus">
          Add New Contact
        </el-button>
      </el-row>
    </el-header>
    <el-main class="app-main">
      <router-view />
    </el-main>

    <el-footer class="app-footer">
      Contact Book &copy; 2025 — Built by Raman
    </el-footer>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleAddEntry = () => {
  router.push({ name: 'CreateEntry' });
};

const handleAddContactList = () => {
  router.push({ name: 'HomePage' });
}

</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #409eff;
  color: #fff;
  padding: 0 30px;
  display: flex;
  align-items: center;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.app-main {
  flex: 1;
  padding: 30px 20px;
  background-color: #f5f7fa;
}

.app-footer {
  background-color: #fff;
  text-align: center;
  padding: 12px 20px;
  font-size: 14px;
  color: #999;
  border-top: 1px solid #ebeef5;
}
</style>
