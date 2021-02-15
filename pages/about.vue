<template>
  <div class="mx-5 mx-sm-8 mx-md-16 my-8">
    <div
      class="font-weight-black primary--text text-h6 text-center text-md-h3 text-uppercase"
    >
      About Us
    </div>
    <div class="text-center mt-5 mt-md-7 mb-5">
      <div class="font-weight-bold text-title text-md-h5">How we started</div>
      <div class="text-caption text-md-title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt
        ut urna in faucibus. Quisque eget aliquet metus. Nullam dignissim, nibh
        vitae ultricies ullamcorper, nibh metus volutpat erat, mattis bibendum
        ipsum turpis quis nibh. Sed rutrum, lorem quis vehicula viverra, ante
        dui varius erat, eu cursus purus risus non nulla. Nam at volutpat
        libero. Maecenas non tincidunt ante, vel iaculis odio. Suspendisse orci
        risus, iaculis in ex quis, interdum commodo tellus. Phasellus venenatis
        dapibus neque, ac suscipit odio dapibus in. Praesent dapibus eu nibh vel
        gravida. Duis non arcu vestibulum, ornare elit vitae, porta quam. Fusce
        non viverra diam, at cursus sem. Proin congue dui sed nulla placerat
        facilisis. Vivamus et arcu euismod mauris accumsan tincidunt. Vestibulum
        vulputate feugiat purus sit amet congue.
      </div>
    </div>
    <div
      class="text-center font-weight-bold mt-5 mt-md-10 text-title text-md-h5"
    >
      Creator
    </div>
    <v-row align="center" justify="center" class="mt-3 fill-height">
      <v-col cols="12" md="6">
        <v-card>
          <v-img
            src="/images/thumbnail.jpg"
            lazy-src="/images/thumbnail.jpg"
            :height="creatorImageHeight"
          >
            <template #placeholder>
              <v-row align="center" justify="center" fill-height>
                <v-progress-circular indeterminate />
              </v-row>
            </template>
          </v-img>
          <v-card-text>
            <div class="text-center">
              <span class="font-weight-bold text-md-h6 text-title primary--text"
                >Funmi, Alamu(Mrs)</span
              >
              PhD
            </div>
            <div class="text-caption text-md-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              tincidunt ut urna in faucibus. Quisque eget aliquet metus. Nullam
              dignissim, nibh vitae ultricies ullamcorper, nibh metus volutpat
              erat, mattis bibendum ipsum turpis quis nibh. Sed rutrum, lorem
              quis vehicula viverra, ante dui varius erat, eu cursus purus risus
              non nulla. Nam at volutpat
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'About',
  layout: 'homepage',
  computed: {
    creatorImageHeight() {
      return this.$vuetify.breakpoint.xsOnly
        ? '180px'
        : this.$vuetify.breakpoint.smOnly
        ? '250px'
        : '350px'
    },
  },
  head() {
    return {
      title: 'About Us',
    }
  },
}
</script>

<style scoped></style>
