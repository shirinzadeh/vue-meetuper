<template>
  <!-- <textarea v-with-warning:red.prevent="'what a nice day'" class="post-create"></textarea> -->
  <form class="post-create">
    <div class="field">
      <textarea
        v-auto-expand
        v-model="text"
        class="textarea textarea-post"
        placeholder="Write a post"
        rows="1"
      ></textarea>
      <button
        :disabled="!text"
        @click.prevent="sendPost"
        class="button is-primary m-t-sm"
      >
        Send
      </button>
    </div>
  </form>
</template>

<script>
import withWarning from "@/directives/withWarning";
import autoExpand from "@/directives/autoExpand";

export default {
  directives: { autoExpand },
  props: {
    threadId: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      text: null,
    };
  },
  methods: {
    sendPost() {
      this.$store
        .dispatch("threads/sendPost", {
          text: this.text,
          threadId: this.threadId,
        })
        /**then() elave olunmayanda yazilan postu bir nece defe gonderir */
        .then((createdPost) => {
          this.$root.socket.emit("meetup/postSave", createdPost);
          this.text = "";
        });
    },
  },
};
</script>

<style scoped lang="scss">
.textarea-post {
  padding-bottom: 30px;
}
.post-create {
  margin-bottom: 15px;
}
</style>