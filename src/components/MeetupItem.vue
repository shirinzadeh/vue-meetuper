<template>
  <!-- use router-link component for navigation. -->
  <!-- specify the link by passing the `to` prop. -->
  <!-- `<router-link>` will be rendered as an `<a>` tag by default -->

  <!-- <router-link :to="'/meetups/' + meetup._id" class="column is-one-third"> -->
  <!-- :to bu formada yazanda, routerda pathi ne vaxtsa deyissek ve ya /:id-den sonra /foo (/meetups/:id/foo) elave etsek meetupdetaile girmeyecek -->

  <!-- params:{id:} -- burdaki id routerda pathde /meetup-dan sonra yazdigimizla eyni olmalidir. 
        yeni orda id yazdigimiz ucun burda da id yaziriq ve id-ni meetupin id-si ile evezleyirik -->
  <div class="column is-one-third">
    <div class="card large">
      <router-link
        :to="{ name: 'PageMeetupDetail', params: { id: meetup._id } }"
        class="card-meetup-link"
      >
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="meetup.image" alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <p class="title">
                    {{ meetup.startDate | formatDate("MMM") }}
                  </p>
                  <p class="title">
                    {{ meetup.startDate | formatDate("D") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="media-content">
              <p class="title is-4 no-padding is-marginless">
                {{ meetup.title }}
              </p>
              <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
              <span class="tag is-success">{{ meetup.category.name }}</span>
              <p class="subtitle is-7">{{ meetup.location }}</p>
            </div>
          </div>
          <div class="content">
            {{ meetup.description }}
            <div class="background-icon">
              <span class="icon-barcode"></span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meetup: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
.card-meetup-link {
  color: black;
}
</style>