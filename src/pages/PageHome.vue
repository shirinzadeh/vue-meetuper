<template>
  <div>
    <AppHero />
    <div class="container">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline">Featured Meetups in "Location"</h1>
          <AppDropdown />
          <button class="button is-primary is-pulled-right m-r-sm">
            Create Meetups
          </button>
          <router-link
            :to="{ name: 'PageMeetupFind' }"
            class="button is-primary is-pulled-right m-r-sm"
            >All</router-link
          >
        </div>
        <div class="row columns is-multiline">
          <MeetupItem
            v-for="meetup in meetups"
            :key="meetup._id"
            :meetup="meetup"
          />
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem
              v-for="category in categories"
              :key="category._id"
              :category="category"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/**axios is js package that sending request very simple. axios is promise based. this, we receive promise */
import axios from "axios";
import MeetupItem from "@/components/MeetupItem";
import CategoryItem from "@/components/CategoryItem";

export default {
  components: {
    MeetupItem,
    CategoryItem,
  },
  /**datalari vuexde yerlesdirenden ssonra burdan silirik, yerine computed property yazilir. we assign data differently */
  // data() {
  //   return {
  //     meetups: [],
  //     categories: [],
  //   };
  // },
  computed: {
    meetups() {
      //we need to acces getters in [ ]. getters is object
      return this.$store.getters["meetups"];
    },
    categories() {
      return this.$store.getters["categories"];
    },
  },
  created() {
    /**db-daki datani bu sekilde alaraq, categories arrayine beraber edirik
     *url http://localhost:8080/api/v1/categories olacaq. ancaq PORTu 3001 verdiyimize gore, localhostu deyisib 3001 etmeliyik.
       Buna gore vue.config.js faylini yaradiriq
     */

    /**!!!!!!!!!!!! axios.get() meetup ve categories burdan cut edib, vuex-de paste edildi
     * Ve vuex-deki action-u burda cagiririq
     */

    //to call the action we use dispatch function in $store
    this.$store.dispatch("fetchMeetups");
    this.$store.dispatch("fetchCategories");
  },
};
</script>

<style scoped>
</style>
