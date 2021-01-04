<template>
  <!-- <textarea v-with-warning:red.prevent="'what a nice day'" class="post-create"></textarea> -->
  <form class="post-create">
    <div class="field">
      <textarea
        v-auto-expand
        class="textarea textarea-post"
        placeholder="Write a post"
        rows="1"
      ></textarea>
      <button :disabled="true" class="button is-primary m-t-sm">Send</button>
    </div>
  </form>
</template>

<script>
import withWarning from "@/directives/withWarning";
import autoExpand from "@/directives/autoExpand";

export default {
  directives: { autoExpand },
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