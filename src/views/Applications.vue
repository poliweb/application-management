<template>
  <div>
    <h1>Список заявок</h1>
    <button @click="openModal()">Создать заявку</button>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Создана</th>
          <th>Адрес</th>
          <th>Заявитель</th>
          <th>Описание</th>
          <th>Срок</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in applications" :key="application.number" @click="openModal(application)">
          <td>{{ application.number }}</td>
          <td>{{ application.created_at }}</td>
          <td>{{ application.premise + ' ' + application.apartment }}</td>
          <td>{{ application.applicant }}</td>
          <td>{{ application.description }}</td>
          <td>{{ application.due_date }}</td>
          <td>{{ application.status }}</td>
        </tr>
      </tbody>
    </table>

    <ApplicationModal v-if="showModal" :application="selectedApplication" @close="closeModal" @save="handleSave" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ApplicationModal from '@/components/ApplicationModal.vue';

export default {
  components: { ApplicationModal },
  data() {
    return {
      showModal: false,
      selectedApplication: null,
    };
  },
  computed: {
    ...mapGetters(['applications']),
  },
  methods: {
    openModal(application = null) {
      this.selectedApplication = application;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedApplication = null;
    },
    async handleSave(applicationData) {
      if (this.selectedApplication) {
        await this.$store.dispatch('updateApplication', { id: this.selectedApplication.id, application: applicationData });
      } else {
        await this.$store.dispatch('createApplication', applicationData);
      }
      this.closeModal();
      this.$store.dispatch('fetchApplications');
    },
  },
  created() {
    this.$store.dispatch('fetchApplications');
  },
};
</script>

<style scoped lang="scss">
/* Добавьте стили для страницы */
</style>
