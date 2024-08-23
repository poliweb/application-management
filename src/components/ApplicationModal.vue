<template>
  <div class="modal">
    <div class="modal-content">
      <h2>{{ application ? `Редактирование заявки №${application.number}` : 'Создание новой заявки' }}</h2>
      <form @submit.prevent="submitForm">
        <input v-model="form.applicant.first_name" placeholder="Имя" required />
        <input v-model="form.applicant.last_name" placeholder="Фамилия" required />
        <input v-model="form.applicant.patronymic_name" placeholder="Отчество" />
        <input v-model="form.applicant.username" placeholder="Телефон" required />
        <textarea v-model="form.description" placeholder="Описание" required></textarea>
        <input v-model="form.due_date" type="datetime-local" placeholder="Срок" required />
        <button type="submit">{{ application ? 'Сохранить' : 'Создать' }}</button>
      </form>
      <button @click="$emit('close')">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    application: Object,
  },
  data() {
    return {
      form: {
        applicant: {
          first_name: '',
          last_name: '',
          patronymic_name: '',
          username: '',
        },
        description: '',
        due_date: '',
      },
    };
  },
  mounted() {
    if (this.application) {
      // Глубокое копирование данных при редактировании заявки
      this.form = {
        applicant: {
          first_name: this.application.applicant.first_name || '',
          last_name: this.application.applicant.last_name || '',
          patronymic_name: this.application.applicant.patronymic_name || '',
          username: this.application.applicant.username || '',
        },
        description: this.application.description || '',
        due_date: this.formatDateForInput(this.application.due_date) || '',
      };
    }
  },
  methods: {
    formatDateForInput(date) {
      // Форматирование даты для input[type="datetime-local"]
      if (!date) return '';
      return new Date(date).toISOString().slice(0, 16);
    },
    submitForm() {
      // Валидация данных перед отправкой
      if (this.isFormValid()) {
        this.$emit('save', this.form);
      } else {
        alert('Пожалуйста, заполните все обязательные поля.');
      }
    },
    isFormValid() {
      return (
        this.form.applicant.first_name &&
        this.form.applicant.last_name &&
        this.form.applicant.username &&
        this.form.description &&
        this.form.due_date
      );
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}
</style>
