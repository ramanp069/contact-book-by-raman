<template>
    <div class="edit-container" v-if="entry">
        <h2 style="padding-bottom: 10px;">Edit Contact</h2>

        <el-form :model="entry" :rules="rules" ref="entryForm" label-width="100px" class="edit-form">
            <el-form-item label="First Name" prop="firstName">
                <el-input v-model="entry.firstName" placeholder="First Name" />
            </el-form-item>

            <el-form-item label="Last Name" prop="lastName">
                <el-input v-model="entry.lastName" placeholder="Last Name" />
            </el-form-item>

            <el-form-item label="Phone" prop="phone">
                <el-input v-model="entry.phone" placeholder="Phone Number" />
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="entry.email" placeholder="Email Address" />
            </el-form-item>

            <el-form-item label="Country" prop="country">
                <el-input v-model="entry.country" placeholder="Country" />
            </el-form-item>

            <el-form-item label="State" prop="state">
                <el-input v-model="entry.state" placeholder="State" />
            </el-form-item>

            <el-form-item label="Gender" prop="gender">
                <el-radio-group v-model="entry.gender">
                    <el-radio label="male">Male</el-radio>
                    <el-radio label="female">Female</el-radio>
                    <el-radio label="other">Other</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="Check" @click="handleUpdateEntry">Update</el-button>
                <el-button icon="ArrowLeft" @click="handleGoBack">Back</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div v-else class="not-found">
        <el-empty description="Contact not found" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const entry = ref({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    gender: ''
});  // Initialize with empty fields to prevent null issues

const entryForm = ref(null);

const rules = {
    firstName: [{ required: true, message: 'First name is required', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
    phone: [{ required: true, message: 'Phone is required', trigger: 'blur' }],
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Invalid email format', trigger: 'blur' }
    ],
    country: [{ required: true, message: 'Country is required', trigger: 'blur' }],
    state: [{ required: true, message: 'State is required', trigger: 'blur' }],
    gender: [{ required: true, message: 'Gender is required', trigger: 'change' }]
};

onMounted(() => {
    const stored = JSON.parse(localStorage.getItem('entries') || '[]');
    const found = stored.find(e => e.id === Number(route.params.contactId));
    if (found) entry.value = { ...found };
});

const handleUpdateEntry = () => {
    entryForm.value.validate((valid) => {
        if (valid) {
            const stored = JSON.parse(localStorage.getItem('entries') || '[]');
            const updated = stored.map(e => e.id === entry.value.id ? entry.value : e);
            localStorage.setItem('entries', JSON.stringify(updated));
            ElMessage.success('Contact updated successfully!');
            router.push({ name: 'ViewEntry', params: { contactId: entry.value.id } });
        }
    });
};

const handleGoBack = () => {
    router.back();
};
</script>
