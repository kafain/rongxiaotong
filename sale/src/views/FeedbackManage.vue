<template>
  <div class="feedbackManage">
    <table>
      <thead>
        <tr>
          <th>用户</th>
          <th>反馈信息</th>
          <th>手机号</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback in feedbacks" :key="feedback.id">
          <td>{{ feedback.userName }}</td>
          <td>{{ feedback.advice}}</td>
          <td>{{ feedback.phonenumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {selectAllFeedback} from "../api/feedback"
export default {
  data() {
    return {
      feedbacks: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(){
        this.$store.commit("updateUserActiveIndex", "5");
        selectAllFeedback({
        }).then(response => {
        this.feedbacks = response.data;
        })
        .catch(error => {
        console.log(error);
        });
    }
  }
};
</script>

<style>
.feedbackManage{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
table {
  width: 1000px;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>