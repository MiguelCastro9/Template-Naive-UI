<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => { });

</script>

<template>
    <nav class="navbar">
        <div class="navbar-title">
            <span><strong>TEMPLATE 03</strong></span>
        </div>
    </nav>
    <div class="painel-container">
        <h4>Content template 03</h4>
    </div>
</template>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #214b63;
}

.navbar-title {
    text-align: left;
    margin-left: 50px;
    color: #fff;
    font-size: 20px;
}

.painel-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-left: 50px;
}
</style>