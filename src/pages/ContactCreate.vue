<template>
    <div class="form-container">
        <h2 style="padding-bottom: 10px;">Add New Contact</h2>
        <el-form :model="entry" :rules="rules" ref="entryForm" label-width="120px">
            <el-form-item label="First Name" prop="firstName">
                <el-input v-model="entry.firstName" />
            </el-form-item>

            <el-form-item label="Last Name" prop="lastName">
                <el-input v-model="entry.lastName" />
            </el-form-item>

            <el-form-item label="Phone" prop="phone">
                <el-input v-model="entry.phone" placeholder="10 digits" />
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="entry.email" />
            </el-form-item>

            <!-- Country Field -->
            <el-form-item label="Country" prop="country">
                <el-input v-model="entry.country" />
            </el-form-item>

            <!-- State Field -->
            <el-form-item label="State" prop="state">
                <el-input v-model="entry.state" />
            </el-form-item>

            <el-form-item label="Gender" prop="gender">
                <el-radio-group v-model="entry.gender">
                    <el-radio label="male">Male</el-radio>
                    <el-radio label="female">Female</el-radio>
                    <el-radio label="other">Other</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSaveEntry">Save Contact</el-button>
                <el-button icon="ArrowLeft" @click="handleGoBack">Back</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const entryForm = ref(null);

const entry = ref({
    id: Date.now(),
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    gender: 'male',
});

const rules = {
    firstName: [
        { required: true, message: 'First name is required', trigger: 'blur' },
        { min: 2, message: 'First name must be at least 2 characters', trigger: 'blur' },
    ],
    lastName: [
        { required: true, message: 'Last name is required', trigger: 'blur' },
        { min: 2, message: 'Last name must be at least 2 characters', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: 'Phone is required', trigger: 'blur' },
        { pattern: /^[0-9]{10}$/, message: 'Phone must be 10 digits', trigger: 'blur' },
    ],
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Enter a valid email', trigger: 'blur' },
    ],
    country: [
        { required: true, message: 'Country is required', trigger: 'blur' },
        { min: 2, message: 'Country name must be at least 2 characters', trigger: 'blur' },
    ],
    state: [
        { required: true, message: 'State is required', trigger: 'blur' },
        { min: 2, message: 'State name must be at least 2 characters', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: 'Gender is required', trigger: 'change' },
    ],
};

const handleSaveEntry = () => {
    entryForm.value.validate((valid) => {
        if (valid) {
            const entries = JSON.parse(localStorage.getItem('entries') || '[]');
            entries.push(entry.value);
            localStorage.setItem('entries', JSON.stringify(entries));
            router.push({ name: 'ViewEntry', params: { contactId: entry.value.id } });
        }
    });
};
const handleGoBack = () => {
    router.back();
};
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
