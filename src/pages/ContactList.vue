<template>
    <div class="container">
        <el-row justify="space-between" style="margin-bottom: 20px;">
            <el-col :span="12">
                <el-input v-model="search" placeholder="Search contacts" prefix-icon="el-icon-search" clearable />
            </el-col>
        </el-row>

        <el-table :data="handleSearch" border style="width: 100%">
            <el-table-column prop="firstName" label="First Name" />
            <el-table-column prop="lastName" label="Last Name" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="phone" label="Phone" />
            <el-table-column width="180" label="Options">
                <template #default="scope">
                    <el-button size="medium" @click="handleViewContact(scope.row.id)" circle icon="view" />
                    <el-button size="medium" type="primary" @click="handleEditContact(scope.row.id)" icon="edit"
                        circle />
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-if="handleSearch.length === 0" description="No contacts found." class="mt-8" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const entries = ref([]);
const search = ref('');

onMounted(() => {
    const stored = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.value = stored;
});

const handleSearch = computed(() => {
    return entries.value
        .filter(entry =>
            `${entry.firstName} ${entry.lastName}`.toLowerCase().includes(search.value.toLowerCase())
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
});

const handleEditContact = (id) => {
    router.push({ name: 'ModifyEntry', params: { contactId: id } });
};

const handleViewContact = (id) => {
    router.push({ name: 'ViewEntry', params: { contactId: id } });
};
</script>

<style scoped>
.container {
    padding: 40px 20px;
}

.mb-4 {
    margin-bottom: 20px;
}

.mt-8 {
    margin-top: 80px;
}
</style>
