<template>
    <div class="view-container" v-if="entry">
        <h2 style="padding-bottom: 10px;">Contact Info</h2>
        <el-descriptions border column="1">
            <el-descriptions-item label="Full Name">
                {{ entry.firstName }} {{ entry.lastName }}
            </el-descriptions-item>
            <el-descriptions-item label="Phone">
                {{ entry.phone }}
            </el-descriptions-item>
            <el-descriptions-item label="Email">
                {{ entry.email }}
            </el-descriptions-item>
            <el-descriptions-item label="Gender">
                {{ entry.gender }}
            </el-descriptions-item>
            <el-descriptions-item label="Country">
                {{ entry.country }}
            </el-descriptions-item>
            <el-descriptions-item label="State">
                {{ entry.state }}
            </el-descriptions-item>
        </el-descriptions>

        <div class="button-group">
            <el-button type="primary" icon="Edit" @click="handleEditEntry">Edit</el-button>
            <el-button type="danger" icon="Delete" @click="handleRemoveEntry">Delete</el-button>
            <el-button icon="House" @click="handleHome">Home</el-button>
        </div>
    </div>

    <div v-else class="not-found">
        <el-empty description="Contact not found" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox, ElMessage, ElEmpty } from 'element-plus';

const route = useRoute();
const router = useRouter();

const entry = ref(null);

onMounted(() => {
    const all = JSON.parse(localStorage.getItem('entries') || '[]');
    entry.value = all.find(e => e.id === Number(route.params.contactId));
});

const handleEditEntry = () => {
    if (entry.value) {
        router.push({ name: 'ModifyEntry', params: { contactId: entry.value.id } });
    }
};

const handleRemoveEntry = () => {
    ElMessageBox.confirm('Do you want to delete this contact?', 'Warning', {
        type: 'warning',
    }).then(() => {
        const updated = JSON.parse(localStorage.getItem('entries') || '[]').filter(
            e => e.id !== entry.value.id
        );
        localStorage.setItem('entries', JSON.stringify(updated));
        ElMessage.success('Contact deleted');
        router.push({ name: 'HomePage' });
    });
};

const handleHome = () => {
    router.push({ name: 'HomePage' });
};
</script>

<style scoped>
.view-container {
    max-width: 700px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.button-group {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.not-found {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>
