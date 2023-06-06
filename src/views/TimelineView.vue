<template>
  <div class="timeline-view">
    <ul class="timeline-content">
      <TimelineItem
        v-for="sp in this.$store.state.stayPoints"
        :key="sp.id"
        :stayPoint="sp"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TimelineItem from "@/components/TimelineItem";

export default {
  name: "TimelineView",
  components: { TimelineItem },
  data() {
    return {
      showSidebar: false,
    };
  },
  computed: {
    ...mapGetters(["filteredLocationHistory"]),
  },
  mounted() {
    this.$root.$on("toggle-timeline", this.toggleTimeline);
    this.updateTimelineData();
  },
  methods: {
    ...mapActions("stayPoints", ["getStayPoints"]),
    toggleTimeline() {
      this.showSidebar = !this.showSidebar;
    },
    updateTimelineData() {
      const timeThres = 15 * 60; // tst is in seconds
      const distThres = 100; //distance in meters
      const gpsPoints = this.filteredLocationHistory;
      this.$store.dispatch("getStayPoints", {
        gpsPoints,
        distThres,
        timeThres,
      });
    },
  },
};
</script>

<style scoped>
.timeline-view {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  display: flex;
  z-index: 9999;
  justify-content: flex-end;
  background-color: white;
  overflow-y: auto;
  padding: 10px;
  display: inline-block;
}

.timeline-view ul.timeline-content {
  margin: 20px 0;
  padding: 0;
  display: inline-block;
}
</style>
